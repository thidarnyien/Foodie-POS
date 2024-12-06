"use client"

// import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CategoryIcon from '@mui/icons-material/Category';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SettingsIcon from '@mui/icons-material/Settings';
import TableBarIcon from '@mui/icons-material/TableBar';

import { Box, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Urbanist } from "next/font/google";
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const urbanist = Urbanist({ subsets: ["latin"] });

interface SiderbarItem{
    id : number;
    label : string;
    icon : ReactNode;
    route : string;
    pathName : string
}

const sidebarItem : SiderbarItem[] = [
    {id: 1, label : "Orders", icon:  <LocalMallIcon/>, route: "/backoffice/orders/pending", pathName: "orders"},
    {id: 3, label : "Menu Categories", icon:  <CategoryIcon/>, route: "/backoffice/menu-categories", pathName : "menu-categories"},
    {id: 2, label : "Menus", icon:  <MenuBookIcon/>, route: "/backoffice/menus", pathName : "menus"},
    {id: 4, label : "Tables", icon:  <TableBarIcon/>, route: "/backoffice/tables", pathName : "tables"},
    {id: 5, label : "Addons", icon:  <AddCircleIcon/>, route: "/backoffice/addons", pathName : "addons"},

    {id: 6, label : "Addons Categories", icon:  <RestaurantMenuIcon/>, route: "/backoffice/addon-categories", pathName : "addon-categories"},
    {id: 7, label : "Locations", icon:  <FmdGoodIcon/>, route: "/backoffice/locations", pathName : "locations"},
    {id: 8, label : "Settings", icon:  <SettingsIcon/>, route: "/backoffice/settings", pathName: "settings"},
]


export function Sidebar(){
    const pathName = usePathname();

    return(
        <Box sx={{width:"260px", backgroundColor:"#18385c", minHeight:"100vh", position: "sticky"}} >
            <List sx={{padding:"0px"}}>
            {sidebarItem.map((item)=> 
            <Link key={item.id} href = {item.route} style={{textDecoration:"none", cursor:"pointer"}}>
                
                <ListItem disablePadding sx={{
                    backgroundColor : pathName.includes(item.pathName) ? "#457B9D" : null,
                    ":hover": {backgroundColor : "#457B9D"}}}>
                <ListItemButton>
                    <ListItemIcon sx={{color:"#E8F6EF"}}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary = {item.label} sx={{color:"#E8F6EF"}}/>
             
              </ListItemButton>
            </ListItem>
               
            </Link>
             )}
            </List>
        </Box>
    )
}