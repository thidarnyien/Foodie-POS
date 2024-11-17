import { Box, boxClasses, Button, Divider, Typography } from "@mui/material";

import Link from "next/link";
import { getTableTotalPrice } from "../actions";
import { ORDERSTATUS } from "@prisma/client";
import { OrderCard } from "@/components/OrderCard";
import { AddonsTypeWithAddonCategory, OrderTypeWithMenusTablesOrderAddons } from "@/app/backoffice/orders/[status]/page";

interface Props{
    searchParams:{
        tableId: number
    }
}


export default async function ActiveOrderPage({searchParams}: Props){
    const tableId = Number(searchParams.tableId);
    const orders : OrderTypeWithMenusTablesOrderAddons[] = await prisma.orders.findMany({
        where:{
            tableId, NOT: {status: ORDERSTATUS.CART}
        },
        include: {OrderAddons: true, menu: true, table: true}
    })

    
    if(!orders) return (
        <Box sx={{width: "100vw", height: "100vh", margin: "0 auto", display: "fles", justifyContent: "center", alignItems: "center"}}>
            <Typography sx={{mb: 3}}>You don&apos;t have any active Orders</Typography>
            <Link href={`/order/menus`}>
                <Button variant="contained">Go to home page</Button>
            </Link>
        </Box>
    );

    return(
        <Box sx={{pt: 4}}>
            
            <Box sx={{maxWidth: "1200px", margin: "0 auto"}}>
                
                <Box sx={{display: "flex" , justifyContent: "space-between", my: 3}}>
                    <h4>Active Orders</h4>
                    <h4>Table No - {tableId}</h4>
                   

                    <h4>Total Amount - {getTableTotalPrice(tableId)} Ks</h4>
                    
                </Box>
                <Divider sx={{height: 2, mb: 2}}/>
               
                <Box sx={{display: "flex", flexWrap: "wrap"}}>
                    {orders.map(async(order)=>{
                        const {menu, quantity, id, OrderAddons} = order;
                        const addonIds = OrderAddons.map(item => item.addonId);
                        const addons: AddonsTypeWithAddonCategory[] = await prisma.addons.findMany({where: {
                            id: {in: addonIds}
                        },include: {addonCategory: true} })
                        return(
                            <OrderCard key={order.id} order={order} addons={addons} isAdmin={false}/>
                        )
                        // return(
                        //     <Box sx={{mb: 2}}>
                        //         {/* <Box sx={{mb: 2}}>
                        //             <Typography>Order ID - {id}</Typography>
                        //         </Box> */}
                        //         <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                        //             <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        //                 <Typography variant="h6" sx={{width:"20px",height:"20px", background: "green", borderRadius: "50%", display: "flex" , justifyContent: "center", alignItems: "center", color : "white",mr: 2}}>{quantity}</Typography>
                        //                 <Typography>{menu.name}</Typography>
                        //             </Box>
                        //             <Box>
                        //                 <Typography>{menu.price}</Typography>
                        //             </Box>
                        //         </Box>

                        //         <Box>
                        //             {/* <Typography>Addons</Typography> */}
                        //             {OrderAddons.map(async (orderAddon)=> {
                        //                 const {addonId, quantity} = orderAddon;
                        //                 const addon = await prisma.addons.findFirst({where: {id: addonId}});
                        //                 return(
                        //                     <Box key={orderAddon.id} sx={{display: "flex", justifyContent: "space-between", mb: 2, ml: 6 }}>
                        //                         <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        //                             {/* <Typography variant="h5" sx={{width:"30px",height:"30px", background: "green", borderRadius: "50%", display: "flex" , justifyContent: "center", alignItems: "center", color : "white",mr: 2}}>{quantity}</Typography> */}
                        //                             <Typography fontStyle={"italic"}>{addon?.name}</Typography>
                        //                         </Box>
                        //                         <Box>
                        //                             <Typography>{addon?.price}</Typography>
                        //                         </Box>
                        //                     </Box>
                                            
                        //                 )
                        //             })}
                        //         </Box>
                            
                        //     </Box>
                        // )
                        
                    })}
                </Box>
                
                
                
             </Box>
        </Box>
    )
}