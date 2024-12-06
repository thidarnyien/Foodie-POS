"use client"

import { Box, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { createAddonCategory } from "../actions";
import toast from "react-hot-toast";
import { useState } from "react";
import { Menus } from "@prisma/client";

interface Props{
    menus : Menus[];
}
export default function NewAddonCategoryForm({menus} : Props){
    const [loading, setLoading] = useState(false);
    
    const handleCreateAddonCategory =async (formData: FormData)=>{
        
        try {
            setLoading(true);
            const response = await createAddonCategory(formData);

                if(response.errors){
                    setLoading(false)
                    response.errors.forEach(err => toast.error(err.message));
                }else{
                    setLoading(false)
                    toast.success("Addon Category update successfully!")
                }
        } catch (error) {
            setLoading(false)
        }
    }

    return(
        <>
      <h3>New Addon Category</h3>
      <Box
      component={"form"}
      action={handleCreateAddonCategory}
       sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Name"
          name="name"
          label="Name"
          variant="outlined"
         
        ></TextField>
         <Box sx={{py: 2}}>
        <h4>Choose Menus</h4>
        <Box sx={{display: "flex"}}> 
          {menus.map((menu)=> (
            <FormControlLabel 
            key={menu.id}
            control={<Checkbox  name="menuId" value={menu.id}/>}
            label= {menu.name}
            />
          ))}
        </Box>
        </Box>
      <FormControlLabel
          control={<Checkbox defaultChecked/>}
          label="isRequired"
          name="isRequired"
        />
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          type="submit"
        >
          Create
        </Button>
      </Box>
    </>
    )
}