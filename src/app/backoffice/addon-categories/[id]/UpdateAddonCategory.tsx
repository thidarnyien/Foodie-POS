"use client"

import { Box, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { updateAddonCategory, deleteAddonCategory } from "../actions";
import toast from "react-hot-toast";
import { useState } from "react";
import { AddonCategories, Menus } from "@prisma/client";

interface Props{
    addonCategory : AddonCategories | null;
    selected : number[] | undefined;
    menus : Menus[] | null;
}
export default function UpdateAddonCategoryForm({addonCategory,selected,menus}: Props){
    const [loading, setLoading] = useState(false);
    const handleUpdateAddonCategory = async (formData : FormData) =>{
        
        try {
            setLoading(true);
            const response = await updateAddonCategory(formData);
            if(response.errors){
                setLoading(false)
                response.errors.forEach(err => toast.error(err.message));
            }else{
                setLoading(false);
                toast.success("Addon Category updated successfully!")
            }

        } catch (error) {
            setLoading(false)
        }
        
    }
    return (
        <>
      <h3>Update Addon Category</h3>
      <Box
        action={handleUpdateAddonCategory}
        component={"form"}
        sx={{ my: 2, display: "flex", flexDirection: "column" }}
      >
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          defaultValue={addonCategory?.name}
          name="name"
          variant="outlined"
          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></TextField>
        <input
          type="hidden"
          value={addonCategory?.id}
          name="id"

          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></input>
         <Box sx={{py: 2}}>
        <h4>Choose Menus</h4>
        <Box sx={{display: "flex"}}> 
          {menus?.map((menu)=> (
            <FormControlLabel 
            key={menu.id}
            control={<Checkbox defaultChecked= {selected?.includes(menu.id)}  name="menuId" value={menu.id}/>}
            label= {menu.name}
            />
          ))}
        </Box>
        
        </Box>
        <FormControlLabel
          control={
            <Checkbox name="isRequired" defaultChecked={addonCategory?.isRequired ? true : false} />
          }
          label="Required"
        />

        <Box>
          
          <Button
            type="submit"
            sx={{ mr: 2, width: "fit-content" }}
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Box>
      <Box
        action={deleteAddonCategory}
        component={"form"}
       
      >
        <input
          type="hidden"
          value={addonCategory?.id}
          name="id"

          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></input>
      

          
          <Button
            type="submit"
            sx={{ mr: 2, width: "fit-content" }}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
 
      </Box>
    </>
    )
}