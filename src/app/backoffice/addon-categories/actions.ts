"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function getAddonCategory(id: number){
    return await prisma.addonCategories.findFirst({where: {id: Number(id)}, include: { menusAddonCategories: true }})
}

export async function createAddonCategory(formData: FormData){
    const name = formData.get("name") as string;
    const isRequired = formData.get("isRequired")? true : false;
    const menuIds = formData.getAll("menuId").map((item)=> Number(item));
    const addonCategory = await prisma.addonCategories.create({data: {
        name,
        isRequired,
    }});
    const data = menuIds.map((menuId)=>({menuId, addonCategoryId: addonCategory.id}))
    await prisma.menusAddonCategories.createMany({data})
    redirect("/backoffice/addon-categories");
}

export async function updateAddonCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const id = formData.get("id");
  const isRequired = formData.get("isRequired")? true : false;
  const menuIds = formData.getAll("menuId").map((item)=> Number(item));
  
  await prisma.addonCategories.update({
    data: { name , isRequired},
    where: { id: Number(id) },
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
  redirect("/backoffice/addon-categories");
}

export async function deleteAddonCategory(formData:any){
    const id = formData.get("id");
    await prisma.menusAddonCategories.deleteMany({
        where: {addonCategoryId: Number(id)}
    })
    await prisma.addonCategories.update({
      data: {isArchived: true},
        where: {id: Number(id)}
    })
    redirect("/backoffice/addon-categories");
}