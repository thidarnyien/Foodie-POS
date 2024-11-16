
import { getMenu } from "@/app/backoffice/menus/actions";
import MenuOptions from "@/components/MenuOptions";
import OrderAppHeader from "@/components/OrderAppHeader";
import { getCompanyByTableId } from "@/libs/actions";
import { prisma } from "@/libs/prisma";
import { Box } from "@mui/material";
import { Prisma } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    tableId: string,
    orderId: string
  };
}

export type OrderType = Prisma.OrdersGetPayload<{
  include: {OrderAddons: true}
}>


export default async function MenuDetailsPage({ params, searchParams }: Props) {
  const orderId = Number(searchParams.orderId);
  console.log("orderId", orderId)
  const tableId = Number(searchParams.tableId);
  const company = await getCompanyByTableId(tableId);
  const menuId = Number(params.id);
  const menu = await getMenu(menuId);
  const addonCategoryIds = menu.menusAddonCategories.map(item => item.addonCategoryId);
  const addonCategories = await prisma.addonCategories.findMany({where: {id: {in: addonCategoryIds}}});
  const addons = await prisma.addons.findMany({where: {addonCategoryId: {in: addonCategoryIds}}});
  let order: OrderType | null = null;
  if(orderId){
    order = await prisma.orders.findFirst({
      where: {
        id: orderId
      },
      include: {OrderAddons : true}

    })
  }
  // console.log("order", order)
  /* console.log("############",menu);
  console.log("############",addonCategories);
  console.log("############",addons); */
  if(!company) return null;

  return (
    <Box>
        <OrderAppHeader company={company} tableId={tableId} headerMenuImageUrl = {menu.imageUrl}/>
        <MenuOptions
         addonCategories={addonCategories} addons={addons} menu={menu} tableId={tableId} order={order}
         />
    </Box>
  )
}
