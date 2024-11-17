import { OrderCard } from "@/components/OrderCard";
import { getSelctedLocationTables } from "@/libs/actions";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { ORDERSTATUS, Prisma } from "@prisma/client";
import Link from "next/link";

interface Props{
    params:{
        status: ORDERSTATUS
    }
}

export type OrderTypeWithMenusTablesOrderAddons = Prisma.OrdersGetPayload<{
    include: {
        menu: true, OrderAddons: true, table: true
    }
}>
export type AddonsTypeWithAddonCategory = Prisma.AddonsGetPayload<{
    include: {addonCategory: true}
}>
export default async function OrderPage({params}: Props){
    const status = params.status.toUpperCase();
    const tables = await getSelctedLocationTables();
    const tableIds = tables.map(item => item.id);
    const orders : OrderTypeWithMenusTablesOrderAddons[] = await prisma.orders.findMany({
        where: {
            tableId: {in: tableIds},
            status: status as keyof typeof ORDERSTATUS
        }, include: {
            menu: true, OrderAddons: true, table: true
        }
    })

    /* const addonIds = orders.map(order => order.OrderAddons).flat().map(addon => addon.addonId);

    const addons : AddonsTypeWithAddonCategory[] = await prisma.addons.findMany({
        where:{id: {in: addonIds}}, include: {addonCategory: true}
    }); */
    // console.log("#####", orders);

    return(
        <Box>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems:"center"}}>
            <Typography variant="h6">Orders Page</Typography>
            <ButtonGroup variant="outlined" sx={{display: "flex", justifyContent: "flex-end"}}>
                <Link href= {`/backoffice/orders/pending`}>
                    <Button variant={`${status === ORDERSTATUS.PENDING ? "contained" : "outlined" }`}>PENDING</Button>
                </Link>
                <Link href= {`/backoffice/orders/cooking`}>
                    <Button variant={`${status === ORDERSTATUS.COOKING ? "contained" : "outlined" }`}>COOKING</Button>
                </Link>
                <Link href= {`/backoffice/orders/complete`}>
                    <Button variant={`${status === ORDERSTATUS.COMPLETE ? "contained" : "outlined" }`}>COMPLETE</Button>
                </Link>
            </ButtonGroup>
            
            </Box>
            <Box sx={{my:1, display: "flex", flexWrap: "wrap"}}>
            {orders.map( async order => {
                const addonIds = order.OrderAddons.map(item => item.addonId);
                const addons : AddonsTypeWithAddonCategory[] = await prisma.addons.findMany({
                    where: {
                        id: {in : addonIds}
                    },include: {addonCategory: true}
                })
                return (
                    <OrderCard key={order.id} order={order} addons={addons} isAdmin/>
                )})
                }
            </Box>
        </Box>
    )
}