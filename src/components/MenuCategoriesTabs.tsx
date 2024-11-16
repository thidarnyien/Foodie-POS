"use client"

import { MenuCategoriesType } from "@/app/order/page";
import { Box, Tabs, Tab } from "@mui/material";
import { Menus } from "@prisma/client";
import { useEffect, useState } from "react";
import { MenuCard } from "./MenuCard";
import Link from "next/link";

interface Props {
    menuCategories: MenuCategoriesType[];
    menus : Menus[];
    tableId: number
  }
  
  export function MenuCategoriesTabs({ menuCategories, menus, tableId}: Props) {
    const [menusToShow, setMenusToShow] = useState<Menus[]>();
    const [value, setValue] = useState(0);
    const [selectedMenuCategory, setSelectedMenuCategory] = useState<MenuCategoriesType>(menuCategories[0]);
    
    useEffect(()=>{
      const menuIds = selectedMenuCategory.menuCategoriesMenus.map(item => item.menuId);
      const menusToShow= menus.filter((menu)=> menuIds.includes(menu.id));
      setMenusToShow(menusToShow);
      // console.log(menusToShow);
    },[selectedMenuCategory])

    return (
      <Box
        sx={{
          position: "relative",
          top: { md: -10, lg: -110 },
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Tabs
          TabIndicatorProps={{
            style: { background: "#2A9D8F" },
          }}
          value={value}
          onChange={(_, value) => setValue(value)}
          sx={{
            pb: 1,
            "& .MuiTab-root.Mui-selected": {
              color: "#2A9D8F",
              fontWeight: "bold",
            },
          }}
        >
          {menuCategories.map((item) => (
            <Tab
              key={item.id}
              label={item.name}
              onClick={() => setSelectedMenuCategory(item)}
            />
          ))}
        </Tabs>
        <Box sx={{mt: 2, display:"flex", flexWrap: "wrap"}}>
                
                  {menusToShow?.map(menu=> {
                  const {id,name,price,imageUrl} = menu;
                      return(
                        <Link style={{textDecoration: "none"}} href= {`order/menus/${id}?tableId=${tableId}`}>
                          <MenuCard id={id} name={name} price={price} imageUrl= {imageUrl as string} />
                        </Link>
                      )}
                  )}
              
            </Box>
      </Box>
    );
  }
  