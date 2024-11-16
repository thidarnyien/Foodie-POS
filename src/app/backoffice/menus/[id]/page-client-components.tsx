
"use client";
import MultiSelect from "@/components/MultiSelect";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from "@mui/material";
import { MenuCategories, Menus } from "@prisma/client";
import { useEffect, useState } from "react";
import { getMenu, updateMenu } from "../actions";
import { getCompanyMenuCategories } from "@/libs/actions";

interface props{
  params: {id:string}
}

export default function MenuUpdatePage({params}:props) {
  const [menu, setMenu] = useState<Menus>();
  const [selected, setSelected] = useState<number[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const {id} = params;

  useEffect(()=>{
    // handleGetMenu();
    handleGetMenuCategories();
  },[])

//   const handleGetMenu =async ()=>{
//     const menu = await getMenu(Number(id));
//     const selected = menu.menuCateogries.map(item => item.menuCategoryId);
//     setSelected(selected);
//     setMenu(menu);
//   }

  const handleGetMenuCategories =async ( ) => {
    const menuCategories = await getCompanyMenuCategories();
    setMenuCategories(menuCategories);
  }
  if(!menu) return null;
  return (

    <>
      <h3>Update Menu</h3>
      <Box
      action={updateMenu}
      component={"form"} 
       sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          defaultValue={menu.name}
          variant="outlined"
          name="updatedMenuName"
          
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="number"
          defaultValue={menu.price}
          name="updatedMenuPrice"
          variant="outlined"
         
        ></TextField>
        <input
        type="hidden"
        name="updatedMenuId"
        value={menu.id}
         />
        <MultiSelect title="Menu Category" items={menuCategories} selected={selected}  setSelected={setSelected}
        ></MultiSelect>
       {/*  <FormControlLabel
          control={<Checkbox checked={menu.isAvailable ? true : false} />}
          label="Available"
        /> */}
        <FormControlLabel
          control={
            <Checkbox
       
              value={menu?.isAvailable}
              onChange={(evt, value) =>
                setMenu({ ...menu, isAvailable: value? true : false })
              }
            />
          }
          label="Avaiable"
        />
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          type="submit"
        >
          Update
        </Button>
      </Box>
    </>
  );
}
