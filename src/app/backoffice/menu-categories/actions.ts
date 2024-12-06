"use server";

import { getCompanyId, getSelectedLocation } from "@/libs/actions";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import {z} from "zod";

const FormSchema = z.object({
    id: z.number(),
    name: z.string().min(3, {message: "Menu Category Name must be at least 3 characters long."}),
    isAvailable : z.boolean()

})

const createMenuCategoryValidate = FormSchema.omit({id: true});
const updateMenuCategoryValidate = FormSchema.omit({isAvailable: true})

export async function createMenuCategory(formData: FormData){

    try {
        const {name, isAvailable} = createMenuCategoryValidate.parse({
            name : formData.get("newMenuCategoryName"),
            isAvailable :formData.get("isAvailable") ? true : false
        })
        
        // const isAvailable = Boolean(formData.get("isAvailable"))
        
        const menuCateogry = await prisma.menuCategories.create({data: {
            name,
            companyId: (await getCompanyId()) as number
        }});
    
        if(!isAvailable){
            await prisma.disabledLocationsMenuCategories.create({data: {
                menuCategoryId: menuCateogry.id,
                locationId: (await getSelectedLocation())?.id as number
            }})
        }
    } catch (error) {
        if(error instanceof z.ZodError){
            return {errors: error.errors}
        }else{
            return {errors: [{message: "Something went wrong! Please contact our support"}]}
        }
    }

    redirect("/backoffice/menu-categories");
}

export async function updateMenuCategory(formData: FormData) {

    try {
        const {id,name} = updateMenuCategoryValidate.parse({
            name : formData.get("menuCategoryName"),
            id : Number(formData.get("menuCategoryId")),
            price : formData.get("menuCategoryPrice")
        })
      
        const companyId = Number(formData.get("companyId"));
        const isAvailable = formData.get("isAvailable") ? true : false;
        const selectedLocationId = (await getSelectedLocation())?.location.id;
    //   console.log("############", formData);
    
      await prisma.menuCategories.update({
        data: { name, companyId },
        where: { id },
      });
    
      if(!isAvailable){
        await prisma.disabledLocationsMenuCategories.create({data: {
            menuCategoryId: Number(id),
            locationId: Number(selectedLocationId)
        }})
      }else{
        const disabledLocationsMenuCategories = await prisma.disabledLocationsMenuCategories.findFirst({where: {
            menuCategoryId: Number(id)
        }})
        if(disabledLocationsMenuCategories){
            await prisma.disabledLocationsMenuCategories.delete({where: {
                id: disabledLocationsMenuCategories?.id
            }})
        }
      }
    } catch (error) {
        if(error instanceof z.ZodError){
            return {errors: error.errors}
        }else{
            return {errors: [{message: "Something went wrong! Please contact our support"}]}
        }
    }
  redirect("/backoffice/menu-categories");
}

export async function deleteMenuCategory(formData:any){
    const menuCategoryId = formData.get("menuCategoryId");
    await prisma.menuCategoriesMenus.deleteMany({
        where: {menuCategoryId: Number(menuCategoryId)}
    })
    await prisma.menuCategories.update({
        data: {isArchived: true},
        where: {id: Number(menuCategoryId)}
    })
    redirect("/backoffice/menu-categories");
}