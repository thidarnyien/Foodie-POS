import { AddonsTypeWithAddonCategory, OrderTypeWithMenusTablesOrderAddons } from "@/app/backoffice/orders/[status]/page";
import { Box, Card, Divider, Typography } from "@mui/material";
import { Orders } from "@prisma/client";
import { OrderStatusUpdate } from "./OrderStatusUpdate";
import { getTableTotalPrice, getTotalPriceByOrderId } from "@/app/order/actions";

interface Props{
    order: OrderTypeWithMenusTablesOrderAddons,
    addons: AddonsTypeWithAddonCategory[],
    isAdmin?: boolean
}
export async function OrderCard({order, addons, isAdmin}: Props){
    
    return(
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            width: 270,
            height: 330,
            mt: 3,
            mr: 3,
          }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#457B9D",
                color: "white",
                px: 1,
                py: 1,
                }}>
                
                <Typography>Vr No - {order.id}</Typography>
                <Typography>{isAdmin ? `Table No - ${order.tableId}` : `Total - ${ await getTotalPriceByOrderId(order.id)}`}</Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent: "space-between", alignItems: "center",px: 2,
                py: 1,}}>
                <Typography variant="h6">{order.menu.name}</Typography>
                <Typography variant="h6">{order.quantity}</Typography>
            </Box>
            <Box sx={{ px: 2, pt: 1 }}>
                <Box sx={{ height: 260 * 0.7, overflow: "scroll" }}>
                {order.OrderAddons.length > 0 ? (
                    order.OrderAddons.map(async (orderAddon) => {
                    const addon = addons.find(
                        (addon) => addon.id === orderAddon.addonId
                    );
                    return (
                        <Box key={orderAddon.id} sx={{ mb: 2 }}>
                        <Typography sx={{fontSize: "12px", fontStyle: "italic"}}>{addon?.addonCategory.name}</Typography>
                        <Box sx={{display: "flex" , justifyContent: "space-between"}}>
                            <Typography
                                key={addon?.id}
                                sx={{
                                fontSize: 15,
                                ml: 2,
                                fontWeight: "bold",
                                }}
                            >
                                {addon?.name}
                            </Typography>
                            <Box sx={{display: "flex", justifyContent: "space-between", width: "35%"}}>
                                <Typography sx={{fontSize: 15}}>
                                    {orderAddon.quantity}  x
                                </Typography>
                                <Typography sx={{fontSize: 15}}>
                                    {addon?.price}
                                </Typography>
                            </Box>
                        </Box>
                        </Box>
                    );
                    })
                ) : (
                    <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                    >
                    <Typography>No addon</Typography>
                    </Box>
                )}
                </Box>
            </Box>
            <Divider/>
            <OrderStatusUpdate order={order} isAdmin = {isAdmin}/>
        </Card>
        
    )
}