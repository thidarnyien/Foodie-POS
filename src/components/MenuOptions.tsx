"use client"

import { Box, Button, Typography } from "@mui/material"
import AddonCategoriesAndAddons from "./AddonCategoriesAndAddons"
import { AddonCategories, Addons, Menus, Orders } from "@prisma/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import QuantitySelector from "./QuantitySelector"
import { createCartOrder } from "@/app/order/actions"
import { OrderType } from "@/app/order/menus/[id]/page"

interface Props{
    menu: Menus
    addonCategories: AddonCategories[],
    addons: Addons[],
    tableId: number,
    order: OrderType | null;
}


export default function MenuOptions({tableId,menu,addonCategories,addons, order}: Props){
  // console.log("########",order);
    const [selectedAddons, setSelectedAddons] = useState<Addons[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [isDisabled, setIsDisabled] = useState(true);
    // const router =useRouter()

    useEffect(() => {
        const requiredAddonCategories = addonCategories.filter(
          (item) => item.isRequired
        );
        const selectedRequiredAddons = selectedAddons.filter((selectedAddon) => {
          const addonCategory = addonCategories.find(
            (item) => item.id === selectedAddon.addonCategoryId
          );
          return addonCategory?.isRequired ? true : false;
        });
        
        const isDisabled =
          requiredAddonCategories.length !== selectedRequiredAddons.length;
          console.log("#########", isDisabled)
        setIsDisabled(isDisabled);
      }, [selectedAddons, addonCategories]);
    
    useEffect(()=>{
      if(order){
        const {quantity,OrderAddons} = order;
        setQuantity(quantity);
        const addonIds = OrderAddons.map(item => item.addonId);
        const selectedAddons = addons.filter(addon => addonIds.includes(addon.id));
        setSelectedAddons(selectedAddons);
      }
      
    },[order])
    const handleQuantityDecrease = ()=>{
        const newValue = quantity-1 === 0 ? 1: quantity -1 ;
        setQuantity(newValue);
    }
    const handleQuantityIncrease = () =>{
        const newValue = quantity + 1;
        setQuantity(newValue);
    }
    const handleCreateCartOrder= async () =>{
        await createCartOrder({
            menuId: menu.id,
            tableId,
            addonIds: selectedAddons.map(item => item.id),
            quantity,
            orderId: order?.id
           
        })
    }

    return(
        <Box sx={{
            
            maxWidth: 400,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pb: 10,
            px: 2,
            position: "relative",
            marginTop: { xs: 25, md: -5, lg: -10 },
          }}>
            <Typography variant="h5" mb={2}>{menu.name}</Typography>
            <AddonCategoriesAndAddons addonCategories={addonCategories} addons={addons} selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons}/>
            <QuantitySelector value={quantity} onDecrease={handleQuantityDecrease} onIncrease={handleQuantityIncrease} />
            <Button
            variant="contained"
            sx={{mt:1}}
            disabled= {isDisabled}
            onClick={handleCreateCartOrder}
            >{ order? "Update" : "Add to Cart"}</Button>
        </Box>

    )
}