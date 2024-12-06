"use client"

import { Box, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { updateMenuCategory, deleteMenuCategory } from "../actions";
import toast from "react-hot-toast";
import { useState } from "react";
import { MenuCategoryType } from "./page";

interface Props{
    menuCategory : MenuCategoryType | null ;
    companyId : number;
    isAvailable: boolean

}
export default function UpdateMenuCategoryForm({menuCategory,companyId, isAvailable}: Props){
    const [loading, setLoading] = useState(false);

    const handleUpdateMenuCategory = async(formData: FormData)=>{
        try {
            setLoading(true)
            const response = await updateMenuCategory(formData);
            if(response.errors){
                setLoading(false)
                response.errors.forEach(err => toast.error(err.message));
            }else{
                setLoading(false)
                toast.success("Menu category updated successfully!")
            }
        } catch (error) {
            setLoading(false)
        }   
    }
    return(
        <>
      <h3>Update Menu Category</h3>
      <Box
        action={handleUpdateMenuCategory}
        component={"form"}
        sx={{ my: 2, display: "flex", flexDirection: "column" }}
      >
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          defaultValue={menuCategory?.name}
          name="menuCategoryName"
          variant="outlined"
          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></TextField>

        <input
          type="hidden"
          defaultValue={menuCategory?.id}
          name="menuCategoryId"
          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></input>

        <input type="hidden" defaultValue={companyId} name= "companyId"></input>

        <FormControlLabel
          control={
            <Checkbox defaultChecked={isAvailable} name="isAvailable" />
          }
          label="Available"
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
        action={deleteMenuCategory}
        component={"form"}

      >
        <input
          type="hidden"
          value={menuCategory?.id}
          name="menuCategoryId"

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