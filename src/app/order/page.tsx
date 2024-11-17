import { MenuCard } from "@/components/MenuCard";
import { MenuCategoriesTabs } from "@/components/MenuCategoriesTabs";
import OrderAppHeader from "@/components/OrderAppHeader";
import { getCompanyByTableId, getCompanyId, getMenuCategoriesByTableId, getMenusByMenuCategoryIds } from "@/libs/actions";
import { prisma } from "@/libs/prisma";
import { Key } from "@mui/icons-material";
import { Box } from "@mui/material";
import { DisabledLocationsMenus, Prisma } from "@prisma/client";

interface Props{
    searchParams: {
        tableId: string
    }
}

export type MenuCategoriesType = Prisma.MenuCategoriesGetPayload<{
    include: {menuCategoriesMenus: true}
}>


export default async function OrderApp({searchParams}: Props){

    const tableId = Number(searchParams.tableId);
    const company = await getCompanyByTableId(tableId);
    const menuCategories: MenuCategoriesType[] = await getMenuCategoriesByTableId(tableId);
    const menuCategoryIds = menuCategories.map(item => item.id);
    const menus= await getMenusByMenuCategoryIds(menuCategoryIds);

    // console.log(company);
    
    // console.log(menus);
    if(!company) return null;

    return(
        <Box>
            <OrderAppHeader company={company} tableId={tableId} headerMenuImageUrl={null}/>
            <MenuCategoriesTabs menuCategories={menuCategories} menus={menus} tableId={tableId}/>
         </Box>
    )

    
}