"use server"

import { Orders, ORDERSTATUS, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OrderTypeWithMenusTablesOrderAddons } from "../backoffice/orders/[status]/page";

interface CreateCartOrder{
    menuId: number;
    tableId: number;
    addonIds: number[];
    quantity: number;
    orderId ?: number;
    
}

export async function getTotalPriceByOrderId( orderId : number){
   
    const order = await prisma.orders.findFirst({where: {id: orderId}, include: {menu: true,OrderAddons: true }})
    if (!order) return 0;

    let totalPrice = order.menu.price || 0;
    const orderAddons = order.OrderAddons;
    if(orderAddons){
        const addonIds = orderAddons.map(item => item.addonId);
        const addons = await prisma.addons.findMany({where: {id: {in: addonIds}}});
        for(const addon of addons){
            totalPrice += addon.price
        }
    }
    return totalPrice;
}

export async function createCartOrder(payload: CreateCartOrder){
    const {menuId,tableId,addonIds,quantity, orderId} = payload;
    let order: Orders;
    if(orderId){
        let orderAddons = await prisma.orderAddons.findMany({
            where: {
                orderId
            }
        });
        if(orderAddons.length){
            await prisma.orderAddons.deleteMany({
                where: {
                    orderId
                }
            })
        }
        order = await prisma.orders.update({
            data: {
                quantity
            }, where: {
                id: orderId
            }
        })
    }else {
        order = await prisma.orders.create({
            data: {
                menuId,
                tableId,
                quantity
            }
        });
    }
    
    if(addonIds.length){
        for(const addonId of addonIds){
            await prisma.orderAddons.create({
                data:{
                    addonId: addonId,
                    orderId: order.id,
                    quantity
                }
            })
        }
    }
    redirect(`/order?tableId=${tableId}`);
}


export async function getTableTotalPrice( tableId : number, status?: ORDERSTATUS){
    let cartOrders = [];
    if(status){
        cartOrders = await prisma.orders.findMany({
            where: {
                tableId, status : ORDERSTATUS.CART
            },
            include: {menu: true, OrderAddons: true}
        });
    }else{
        cartOrders = await prisma.orders.findMany({
            where: {
                tableId, NOT:{status : ORDERSTATUS.CART}
            },
            include: {menu: true, OrderAddons: true}
        });
    }
    

    let totalPrice = 0 ;

    for(const cartOrder of cartOrders){
        let orderPrice = cartOrder.menu.price || 0;
        const orderAddons = cartOrder.OrderAddons;
        for(const orderAddon of orderAddons){
            const addonId = orderAddon.addonId;
            const addon = await prisma.addons.findFirst({
                where: {
                    id: addonId
                }
            });
           if(addon){
            orderPrice += addon?.price 
           }
        }
        totalPrice += orderPrice * cartOrder.quantity;
    }
    return totalPrice;
}

export async function deleteCartOrder(formData: FormData){
    const id = formData.get("id");
    if(!id) return;
    // const tableId = Number(formData.get("tableId")); 
    const orderAddons = await prisma.orderAddons.findMany({
        where: {
            orderId: Number(id)
        }
    })
    
   if(orderAddons.length){
    await prisma.orderAddons.deleteMany({
        where: {
            orderId: Number(id)
        }
    })
    /* const orderAddonIds = orderAddons.map(item => item.id);
    orderAddonIds.map(async (id) => {
        await prisma.orderAddons.delete({
            where: {
                id
            }
        })
    }) */
   }
   await prisma.orders.delete({
    where:{
        id: Number(id)
    }
})
revalidatePath(`/backoffice/order/cart`);

}

export async function confirmCartOrder(formData:FormData) {
    const tableId = Number(formData.get("tableId"));
    if(!tableId) return;
    const orders = await prisma.orders.findMany({
        where: {
            tableId, status: ORDERSTATUS.CART
        }
    });

    for(const order of orders){
        await prisma.orders.update({
            data: { status: ORDERSTATUS.PENDING },
            where: { id: order.id },
          });
    }

    revalidatePath("/order/cart");
    revalidatePath("/backoffice/orders/pending");
    redirect(`/order/active-order?tableId=${tableId}`);
}

export async function updateOrderStatus(orderId: number, status: ORDERSTATUS){
    await prisma.orders.update({data: {status}, where: {id: orderId}})
}