"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import {z} from "zod";

const FormSchema = z.object({
  id: z.number(),
  name : z.string().min(3, {message: "Name must be at least 3 characters."}),
  isRequired : z.boolean()
})
const createAddonCategoryValidate = FormSchema.omit({
  id: true
})

const updateAddonCategoryValidate = FormSchema.omit({
  isRequired: true
})
const deleteAddonCategoryValidate = FormSchema.pick({
  id: true
})

export async function getAddonCategory(id: number){
    return await prisma.addonCategories.findFirst({where: {id: Number(id)}, include: { menusAddonCategories: true }})
}

export async function createAddonCategory(formData: FormData){

    try {
      const {name, isRequired} = createAddonCategoryValidate.parse({
        name : formData.get("name") as string,
        isRequired : formData.get("isRequired")? true : false
     })
   
       
       const menuIds = formData.getAll("menuId").map((item)=> Number(item));
       const addonCategory = await prisma.addonCategories.create({data: {
           name,
           isRequired,
       }});
       const data = menuIds.map((menuId)=>({menuId, addonCategoryId: addonCategory.id}))
       await prisma.menusAddonCategories.createMany({data})
    } catch (error) {
      if(error instanceof z.ZodError){
        return {errors: error.errors}
      }else{
        return {errors : [{message: "Something went wrong. Please contact our support"}]}
      }
    }
    redirect("/backoffice/addon-categories");
}

export async function updateAddonCategory(formData: FormData) {
  try {
    const {id,name} = updateAddonCategoryValidate.parse({
      name : formData.get("name") as string,
      id : Number(formData.get("id"))
   })
   
   const isRequired = formData.get("isRequired")? true : false;
   const menuIds = formData.getAll("menuId").map((item)=> Number(item));
   
   await prisma.addonCategories.update({
     data: { name , isRequired},
     where: { id },
   });
   const menuAddonCategories = await prisma.menusAddonCategories.findMany({where:{addonCategoryId: Number(id)}});
     const existingMenuIds  = menuAddonCategories.map(
         (item) => item.menuId
       );
 
     const isSame =
     existingMenuIds.length === menuIds.length &&
     menuIds.every((itemId: number) =>
         existingMenuIds.includes(itemId)
     );
   if (!isSame) {
     await prisma.menusAddonCategories.deleteMany({
       where: { addonCategoryId: Number(id) },
     });
     const data = menuIds.map((menuId) => ({
       menuId,
       addonCategoryId : Number(id)
     }));
     await prisma.menusAddonCategories.createMany({ data });
   }
  } catch (error) {
    if(error instanceof z.ZodError){
      return {errors: error.errors}
    }else{
      return {errors: [{message: "Something went wrong. Please contact our support"}]}
    }
  }
  redirect("/backoffice/addon-categories");
}

export async function deleteAddonCategory(formData:any){
    try {
      const {id} = deleteAddonCategoryValidate.parse({
        id : formData.get("id")
      })
     
      await prisma.menusAddonCategories.deleteMany({
          where: {addonCategoryId: Number(id)}
      })
      await prisma.addonCategories.update({
        data: {isArchived: true},
          where: {id: Number(id)}
      })
    } catch (error) {
      if(error instanceof z.ZodError){
        return {errors: error.errors}
      }else{
        return {errors: [{message: "Something went wrong. Please contact our support."}]}
      }
    }
    redirect("/backoffice/addon-categories");
}