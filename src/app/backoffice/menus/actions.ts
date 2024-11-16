"use server"
import { getSelectedLocation } from "@/libs/actions";
import { prisma } from "@/libs/prisma";
import { Troubleshoot } from "@mui/icons-material";
import { put } from "@vercel/blob";
import { access } from "fs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number(),
  name: z.string().min(5,{message: "Menu Name must be at least 5 characters long"}),
  price: z.number({message: "Price must be a number"}).gt(0, {message: "Id cannot be 0"}),
  isAvailable: z.boolean(),
  imageUrl: z.string(),
  menuCategoryIds: z.array(z.number()).min(1, {message: "Required menu category id is missing."})
})


const CreateMenuValidate = FormSchema.omit({id: true, imageUrl: true});
const DeleteMenuValidate = FormSchema.pick({id: true});
const UpdateMenuValidate = FormSchema.omit({isAvailable: true, imageUrl: true, menuCategoryIds: true})


export async function getMenu(id: number){
    const menu = await prisma.menus.findFirst({where: {id}, include:{menuCategoriesMenus : true, DisabledLocationsMenus: true, menusAddonCategories: true}});
    if(!menu) return redirect("/backoffice/menus");
    return menu;
}


export async function createNewMenu(formData: FormData){
  // console.log(formData);
    try{
      const {name,isAvailable, price, menuCategoryIds} = CreateMenuValidate.parse({
        name: formData.get("newMenuName"),
        price: Number(formData.get("newMenuPrice")),
        isAvailable: formData.get("isAvailable")? true : false,
        menuCategoryIds: formData.getAll("menuCategoryId").map(item=> Number(item))
      })
     const imageUrl= formData.get("imageUrl") as string;
      // const file = formData.get("file") as File;
      
      // return console.log("######" , file);
      
      const menu = await prisma.menus.create({data: {
          name,
          price,
          imageUrl : imageUrl? imageUrl : "https://oa5d0eeygx02lr5f.public.blob.vercel-storage.com/menu-N3pWH2DQCaNqUSR6xMjNJJ9bhrtbw1.png",
          isArchived: false
      }})
      
      const data = menuCategoryIds.map((menuCategoryId)=> ({menuId: menu.id, menuCategoryId}))
      await prisma.menuCategoriesMenus.createMany({data});
  
      if(!isAvailable){
        await prisma.disabledLocationsMenus.create({data: {
          menuId: menu.id,
          locationId: (await getSelectedLocation())?.locationId as number
        }})
      }
  
      /* if(file.size){ // file.name ka string ဖြစ်နေလို့
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const {url } = await put(`foodie-pos/menus/${new Date().getTime()}-${file.name}`,buffer, {access: "public"});
  
        await prisma.menus.update({data: {
          ...menu, imageUrl: url 
        }, where: {id: menu.id}})
      } */
  
    } catch (error) {
      if(error instanceof z.ZodError){
        // const errorMessages = error.errors.map(item => item.message).join(",");
        return {errors: error.errors};
      }
     
      return {errors: [{message: "Something went wrong. Please contact our support."}]}
    }
    
    // return {error: null}; 
    
}

export async function updateMenu(formData: FormData){
  // console.log(formData)

  try {
    const {id,name, price} = UpdateMenuValidate.parse({
      id: Number(formData.get("id")),
      name: formData.get("updatedMenuName"),
      price: Number(formData.get("updatedMenuPrice"))
   })

   
     // console.log(formData);
     const imageUrl = formData.get("imageUrl") as string;
     const isAvailable = formData.get("isAvailable")? true:false;
     const menuCategoryIds = formData.getAll("menuCategoryId").map(item => Number(item));
     const addonCategoryIds = formData.getAll("addonCategoryId").map(item => Number(item));
     // console.log(menuCategoryIds); 
     const menu = await prisma.menus.findFirst({ where: { id } });  



     await prisma.menus.update({
         data: {
             name,
             price,
             imageUrl: imageUrl ? imageUrl : menu?.imageUrl,
         },
         where: {id :id}
     })

     //menuCategories
     const menuCategoriesMenus = await prisma.menuCategoriesMenus.findMany({where:{menuId: Number(id)}});
     const existingMenuCategoryIds = menuCategoriesMenus.map(
         (item) => item.menuCategoryId
       );
 
     const isSame =
     menuCategoryIds.length === existingMenuCategoryIds.length &&
     menuCategoryIds.every((itemId: number) =>
      existingMenuCategoryIds.includes(itemId)
     );

   if (!isSame) {
     await prisma.menuCategoriesMenus.deleteMany({
       where: { menuId: Number(id) },
     });
     const data = menuCategoryIds.map((menuCategoryId) => ({
       menuId: Number(id),
       menuCategoryId,
     }));
     await prisma.menuCategoriesMenus.createMany({ data });
   }
   //AddonCategories

   const menusAddonCategories = await prisma.menusAddonCategories.findMany({where: {menuId: Number(id)}});
   const existingAddonCatgoryIds = menusAddonCategories.map(
    (item) => item.addonCategoryId
   );

   const isSameAddonCategory = addonCategoryIds.length === existingAddonCatgoryIds.length && 
   addonCategoryIds.every((itemId: number)=> existingAddonCatgoryIds.includes(itemId));

   if(!isSameAddonCategory){
    await prisma.menusAddonCategories.deleteMany({
      where: { menuId: Number(id) },
    });
    const data = addonCategoryIds.map((addonCategoryId) => ({
      menuId: Number(id),
      addonCategoryId,
    }));
    await prisma.menusAddonCategories.createMany({ data });
   }

   const selectedLocationId = (await getSelectedLocation())?.locationId;
 
   if(!isAvailable){
     await prisma.disabledLocationsMenus.create({data:{
       menuId: Number(id),
       locationId: Number(selectedLocationId) // ! must be sure
     }})
   }else{
     const disabledLocationsMenus = await prisma.disabledLocationsMenus.findFirst({where: {menuId: Number(id)}});
     if(disabledLocationsMenus){
       await prisma.disabledLocationsMenus.delete({where: {id: disabledLocationsMenus?.id}});
     }
   }
  } catch (error) {
    if(error instanceof z.ZodError){
      // const errorMessages = error.errors.map(item => item.message).join(",");
        return {errors: error.errors};
    }else{
      return {errors: [{ message: "Something went wrong. Please contact our support."}]}
    }
  }
  // return {error: null}; 
  revalidatePath("/backoffice/menus");
    // redirect("/backoffice/menus");
}

export async function deleteMenu(formData: FormData) {
  try{
    const {id} = DeleteMenuValidate.parse({
      id: Number(formData.get("id"))
    })
    // console.log("this is ",id)
    /* await prisma.menuCategoriesMenus.deleteMany({ where: { menuId: id } });
    await prisma.menusAddonCategories.deleteMany({
      where: { menuId: id },
    }); */
    await prisma.disabledLocationsMenus.deleteMany({where: {menuId: id}})
    await prisma.menus.update({
      data: {isArchived: true},
      where: { id },
    });
  }catch(error){
    if(error instanceof z.ZodError){
      return {error: "Require missing fields"}
    }
    return { error: "Something went wrong. Please contact our support."}
  }
   
    redirect("/backoffice/menus");
  }
  