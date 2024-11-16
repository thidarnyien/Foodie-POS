"use server";
import { getServerSession, User } from "next-auth";
import { prisma } from "./prisma";
import { getQrCodeImageUrl } from "@/app/backoffice/tables/actions";

export async function getUser(email : string){
   return await prisma.users.findFirst({where: {email}});
}

export async function createDefaultData(nextUser: User){
   const {name , email} = nextUser;
   
   const company = await prisma.company.create({
      data: { name: "Default company", address: "Address", phoneNumber: "09123456789" },

    });

    const user = await prisma.users.create({
      data: {name: String(name), email: String(email), companyId: company.id}
    });

    const menuCategory = await prisma.menuCategories.create({data:{
      name: "Default Menu Category",
      companyId: company.id
    }})

    const menu = await prisma.menus.create({data:{
      name: "Default Menu", price: 0
    }});

    await prisma.menuCategoriesMenus.create({data: {
      menuId: menu.id, menuCategoryId: menuCategory.id
    }});

    const addonCategory = await prisma.addonCategories.create({data:{
      name: "Default Addon Category", isRequired: false
    }});

   await prisma.menusAddonCategories.create({data:{
      addonCategoryId: addonCategory.id,
      menuId: menu.id
    }});

    const addonNames =["Default Addon One", "Default Addon Two", "Default Addon Three"];
    const data = addonNames.map((addonName)=>( {
      name : addonName,
      addonCategoryId: addonCategory.id,
      price: 0
    }));

   await prisma.addons.createMany({data});

    const location = await prisma.locations.create({data:{
      name: "Default Location",
      address: "Address",
      phoneNumber: "09123456789",
      companyId: company.id as number
    }})

    await prisma.selectedLocations.create({data:{
      locationId: location.id,
      userId: user.id
   }})

    const table = await prisma.tables.create({
      data: {
         tableNo: "Table No 1",
         locationId: location.id,
         qrCodeImageUrl: ""
      }
    })
    const qrCodeImageUrl = await getQrCodeImageUrl(table);
    await prisma.tables.update({
       data: { ...table, qrCodeImageUrl },
       where: {id: table.id}
    })
}

export async function getSelectedLocation(){
   return await prisma.selectedLocations.findFirst({where: {
      userId: await getDbUserId()
   },
   include: {location: true}
})
   
}

export async function getDbUserId(){
   const session = await getServerSession();
   const dbUser = await prisma?.users?.findFirst({where:{
      email: session?.user?.email || ""
   }});
   
   return dbUser?.id;
}
export async function getCompanyId(){
   const session = await getServerSession();
   const dbUser = await prisma?.users?.findFirst({where:{
      email: session?.user?.email || ""
   }});
   const company = await prisma.company.findFirst({where:{
      id: dbUser?.companyId
   }});
   return (company?.id) as number;
}

export async function getCompanyMenuCategories(){
   const companyId = await getCompanyId();
   return await prisma.menuCategories.findMany({where: {companyId, isArchived: false}, include: {DisabledLocationsMenuCategories: true}});
}

export async function getCompanyMenus(){
   const menuCategories = await getCompanyMenuCategories();
   const menuCategoryIds = menuCategories.map((item)=> item.id);
   const menuCategoriesMenus = await prisma.menuCategoriesMenus.findMany({where: {menuCategoryId: {in: menuCategoryIds}}});
   const menuIds = menuCategoriesMenus.map((item)=> item.menuId);
   // const selectedLocationId = await getSelectedLocation();
   return await prisma.menus.findMany({where: {id:{in:menuIds}, isArchived: false},include: {DisabledLocationsMenus: true}})
}

export async function getCompanyAddonCategories(){
   const menus = await getCompanyMenus();
   const menuIds = menus.map((item)=> item.id);
   const menusAddonCatgories = await prisma.menusAddonCategories.findMany({where: {menuId: {in: menuIds}}});
   const addonCategoryId = menusAddonCatgories.map((item)=> item.addonCategoryId);
   return await prisma.addonCategories.findMany({where: {id: {in: addonCategoryId}, isArchived: false}});
}

export async function getCompanyAddons(){
   const addonCategories = await getCompanyAddonCategories();
   const addonCategoryIds = addonCategories.map((item)=> item.id);
   return await prisma.addons.findMany({where: {addonCategoryId: {in: addonCategoryIds}, isArchived: false}})
}

export async function getCompanyLocations(){
   
   const companyId = await getCompanyId();
   return await prisma.locations.findMany({
      orderBy: {id: "asc"},
      where: {companyId, isArchived: false}})
}

export async function getLocationTables(locationId: number){

   return await prisma.tables.findMany({where: {locationId}})
   
}

export async function getCompanyTables(){
   const locations = await getCompanyLocations();
   const locationIds = locations.map((item)=> item.id);

   return await prisma.tables.findMany({where: {locationId: {in: locationIds}, isArchived: false}});
}

export async function getSelctedLocationTables(){
   const locationId = (await getSelectedLocation())?.locationId;
   return await prisma.tables.findMany({where: {locationId, isArchived: false}})
}

export async function getCompanyByTableId(tableId : number){
   // console.log(tableId)
   // return;
   const table = await prisma.tables.findFirst({where: {id: tableId}});
   const location = await prisma.locations.findFirst({
      where: {id: table?.locationId}
   });

   return prisma.company.findFirst({
      where: {id: location?.companyId}
   })
}

export async function getMenuCategoriesByTableId(tableId: number){
   const company = await getCompanyByTableId(Number(tableId));
   const menuCategories = await prisma.menuCategories.findMany({
      where: {
         companyId: company?.id,
         isArchived: false
      } ,
      include: {
         menuCategoriesMenus: true
      }
   })
   const table = await prisma.tables.findFirst({
      where: {id: Number(tableId)}
   })
   const location = await prisma.locations.findFirst({
      where: {
         id: table?.locationId
      }
   })
   const disabledLocationsMenuCategories = await prisma.disabledLocationsMenuCategories.findMany({
      where:{
         locationId: location?.id
      }
   });
   const disabledMenuCategoryIds = disabledLocationsMenuCategories.map(item => item.menuCategoryId);

   return menuCategories.filter(item => !disabledMenuCategoryIds.includes(item.id))
}

export async function getMenusByMenuCategoryIds(menuCategoryIds : number[]){
   
   const menuCategoriesMenus = await prisma.menuCategoriesMenus.findMany({
      where: {
         menuCategoryId: {in: menuCategoryIds}
      }
   })

   const menuIds = menuCategoriesMenus.map(item => item.menuId);

   const menus = await prisma.menus.findMany({
      where: {
         id: {in: menuIds}, isArchived: false 
      }, include: {menusAddonCategories: true}
   })

   const disabledLocationsMenus = await prisma.disabledLocationsMenus.findMany({
      where: {
         menuId: {in: menuIds}
      }
   })

   const disabledMenuIds = disabledLocationsMenus.map(item => item.menuId);

   return menus.filter(item => !disabledMenuIds.includes(item.id));
}