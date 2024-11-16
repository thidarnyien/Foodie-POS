"use server";

import { getCompanyId, getSelectedLocation } from "@/libs/actions";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function createMenuCategory(formData: FormData){
    const newMenuCategoryName = formData.get("newMenuCategoryName") as string;
    const isAvailable = Boolean(formData.get("isAvailable"));
    
    const menuCateogry = await prisma.menuCategories.create({data: {
        name: newMenuCategoryName,
        companyId: (await getCompanyId()) as number
    }});

    if(!isAvailable){
        await prisma.disabledLocationsMenuCategories.create({data: {
            menuCategoryId: menuCateogry.id,
            locationId: (await getSelectedLocation())?.id as number
        }})
    }

    redirect("/backoffice/menu-categories");
}

export async function updateMenuCategory(formData: FormData) {
  const updatedMenuCategoryName = formData.get("menuCategoryName") as string;
  const updatedMenuCategoryId = formData.get("menuCategoryId");
  const companyId = formData.get("companyId");
  const isAvailable = formData.get("isAvailable") ? true : false;
  const selectedLocationId = (await getSelectedLocation())?.location.id;
//   console.log("############", formData);

  await prisma.menuCategories.update({
    data: { name: updatedMenuCategoryName, companyId: Number(companyId) },
    where: { id: Number(updatedMenuCategoryId) },
  });

  if(!isAvailable){
    await prisma.disabledLocationsMenuCategories.create({data: {
        menuCategoryId: Number(updatedMenuCategoryId),
        locationId: Number(selectedLocationId)
    }})
  }else{
    const disabledLocationsMenuCategories = await prisma.disabledLocationsMenuCategories.findFirst({where: {
        menuCategoryId: Number(updatedMenuCategoryId)
    }})
    if(disabledLocationsMenuCategories){
        await prisma.disabledLocationsMenuCategories.delete({where: {
            id: disabledLocationsMenuCategories?.id
        }})
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