import { Box, boxClasses, Button, Divider, Typography } from "@mui/material";
import { ORDERSTATUS, Prisma } from "@prisma/client";
import { Cardo } from "next/font/google";
import { confirmCartOrder, deleteCartOrder, getTableTotalPrice } from "../actions";
import Link from "next/link";
import { prisma } from "@/libs/prisma";

interface Props{
    searchParams:{
        tableId: number
    }
}


export default async function Cart({searchParams}: Props){
    const tableId = Number(searchParams.tableId);
    const cardOrders = await prisma.orders.findMany({
        where:{
            tableId, status : ORDERSTATUS.CART
        },
        include: {OrderAddons: true, menu: true}
    })

    
    if(!cardOrders) return (
        <Box sx={{width: "100vw", height: "100vh", margin: "0 auto", display: "fles", justifyContent: "center", alignItems: "center"}}>
            <Typography sx={{mb: 3}}>Empty Cart. Go to get tasty menus.</Typography>
            <Link href={`/order/menus`}>
                <Button variant="contained">Go to home</Button>
            </Link>
        </Box>
    );

    return(
        <Box sx={{p: 4}}>
            
            <Box sx={{maxWidth: "800px", margin: "0 auto", pb:4}}>
                <Box sx={{display: "flex" , justifyContent: "space-between", alignItems: "center", my: 3}}>
                    <h4>Your Cart</h4>
                    <h4>Table No - {tableId}</h4>
                </Box>
                <Divider sx={{height: 2, mb: 2}}/>
                {cardOrders.map((cardOrder)=>{
                    const {menu, quantity, id, OrderAddons} = cardOrder;
                    return(
                        <Box key={cardOrder.id} sx={{mb: 2}}>
                            {/* <Box sx={{mb: 2}}>
                                <Typography>Order ID - {id}</Typography>
                            </Box> */}
                            <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                    <Typography variant="h6" sx={{width:"20px",height:"20px", background: "green", borderRadius: "50%", display: "flex" , justifyContent: "center", alignItems: "center", color : "white",mr: 2}}>{quantity}</Typography>
                                    <Typography>{menu.name}</Typography>
                                </Box>
                                <Box>
                                    <Typography>{menu.price}</Typography>
                                </Box>
                            </Box>

                            <Box>
                                {/* <Typography>Addons</Typography> */}
                                {OrderAddons.map(async (orderAddon)=> {
                                    const {addonId, quantity} = orderAddon;
                                    const addon = await prisma.addons.findFirst({where: {id: addonId}});
                                    return(
                                        <Box key={orderAddon.id} sx={{display: "flex", justifyContent: "space-between", mb: 2, ml: 6 }}>
                                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                                {/* <Typography variant="h5" sx={{width:"30px",height:"30px", background: "green", borderRadius: "50%", display: "flex" , justifyContent: "center", alignItems: "center", color : "white",mr: 2}}>{quantity}</Typography> */}
                                                <Typography fontStyle={"italic"}>{addon?.name}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography>{addon?.price}</Typography>
                                            </Box>
                                        </Box>
                                        
                                    )
                                })}
                            </Box>
                            <Box display={"flex"}  justifyContent={"end"}>
                                <Box component={"form"} action={deleteCartOrder}>
                                    <input name="id" hidden defaultValue={cardOrder.id} />
                                    {/* <input name="tableid" hidden defaultValue={tableId} /> */}
                                    <Button type="submit"  variant="outlined" color="warning"  sx={{mr: 2}}>Delete</Button>
                                </Box>
                                <Link href={`/order/menus/${cardOrder.menuId}?tableId=${tableId}&orderId=${cardOrder.id}`}>
                                    <Button variant="contained" color="primary">Edit</Button>
                                </Link>
                                
                            </Box>
                        </Box>
                    )
                    
                })}
                <Divider sx={{height: 2}}/>
                <Box sx={{display: "flex" , justifyContent: "end", my: 3}}>

                    <h4>Total Amount - {getTableTotalPrice(tableId,ORDERSTATUS.CART)} Ks</h4>
                </Box>
                <Box component={"form"} action={confirmCartOrder} sx={{display: "flex", justifyContent: "flex-end"}}>
                    <input name="tableId" hidden defaultValue={tableId} />
                    <Link href={`/order/active-order?tableId=${tableId}`}>
                        <Button variant="contained" type="submit">Confirm Order</Button>
                    </Link>
                </Box>
             </Box>
             
        </Box>
    )
}