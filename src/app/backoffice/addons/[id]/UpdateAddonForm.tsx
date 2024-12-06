"use client"
import { Box, TextField, FormControlLabel, Checkbox, Button, useScrollTrigger } from "@mui/material";
import { updateAddon, deleteAddon } from "../actions";
import { AddonCategories, Addons } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";


interface Props{
    addon: Addons;
    addonCategories: AddonCategories[];
}
export default function UpdateAddonForm({addon, addonCategories} : Props){

    const [loading, setLoading] = useState(false);

    const handleUpdateAddon = async (formData : FormData) =>{
        try {
            setLoading(true);
            const response = await updateAddon(formData);
        if(response.errors){
            setLoading(false);
            response.errors.forEach(err => toast.error(err.message));
        }else{
            setLoading(false);

            toast.success("Update addon successfully!")
        }
        } catch (error) {
            setLoading(false)
            
        }
    }
    return (
        <>
        <h3>Update Addon</h3>
        <Box
        action={handleUpdateAddon}
        component={"form"} 
         sx={{ my: 2, display: "flex", flexDirection: "column" }}>
          <input
            type="hidden"
            defaultValue={addon.id}
            
            name="id"
            
          />
          <TextField
            sx={{ my: 2, width: "350px" }}
            type="text"
            defaultValue={addon.name}
            variant="outlined"
            name="name"
            
          ></TextField>
          <TextField
            sx={{ my: 2, width: "350px" }}
            type="number"
            defaultValue={addon.price}
            name="price"
            variant="outlined"
           
          ></TextField>
          <input
          type="hidden"
          name="id"
          value={addon.id}
           />
          <Box sx={{py: 2}}>
          <h4>Choose Menu Category</h4>
          <Box sx={{display: "flex"}}> 
            {addonCategories.map((addonCategory)=> (
  
              <FormControlLabel 
              key={addonCategory.id}
              control={<Checkbox
                defaultChecked={addonCategory.id === addon.addonCategoryId}
                name="addonCategoryId"
                value={addonCategory.id}
              />}
              label= {addonCategory.name}
              />
            ))}
          </Box>
          </Box>
          <Box sx={{pb: 2}}>
          <h4>Condition</h4>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked = {addon.isAvailable? true : false}
                name="isAvailable"
              />
            }
  
            label="Avaiable"
          />
          </Box>
          <Button
            sx={{ my: 2, width: "fit-content" }}
            variant="contained"
            type="submit"
          >
            {loading? "loading..." : "Update"}
          </Button>
        </Box>
        <Box component={"form"} action={deleteAddon}>
        <input
            type="hidden"
            defaultValue={addon.id}
            name="id"
            
          />      
          <Button
              sx={{ my: 2, width: "fit-content" }}
              variant="contained"
              color="error"
              type="submit"
            >
             {loading? "Loading..." : "Delete"}
            </Button>
        </Box>
      </>
    )
}