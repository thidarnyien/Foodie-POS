"use client";

import { Box, TextField, Typography, FormControlLabel, Checkbox, Button } from "@mui/material";
import { AddonCategories, MenuCategories } from "@prisma/client"
import { createNewAddon } from "../actions";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props{
    addonCategories: AddonCategories[];
}
export default function NewAddonForm({addonCategories}: Props){
    const [loading, setLoading] = useState(false);

    const handleCreateAddon = async (formData : FormData) =>{
        try {
            setLoading(true);
            const response = await createNewAddon( formData);
            if(response.errors){
                response.errors.forEach(err => {
                    toast.error(err.message)
                });
            }else{
                toast.success("Addon created successfully.")
            }
            setLoading(false);
        } catch (error) {
            setLoading(false)
        }
    }
    return(
        <>
        <h4>New Addon</h4>
        <Box
          component={"form"}
          action={handleCreateAddon}
          sx={{ mt: 2, display: "flex", flexDirection: "column" , width: "300px"}}
        >
          
          <TextField label="Name" name="name" />
          <TextField
            type="number"
            sx={{ my: 2 }}
            label="Price"
            name="price"
          />
          <Box>
            <Typography>Addon categories</Typography>
            <Box
              sx={{
                border: "1px solid lightgray",
                px: 1.2,
                py: 1,
                borderRadius: 1,
              }}
            >
              {addonCategories.map((addonCategory) => (
                <FormControlLabel
                  key={addonCategory.id}
                  control={
                    <Checkbox
                      name="addonCategoryId"
                      value={addonCategory.id}
                     
                    />
                  }
                  label={addonCategory.name}
                />
              ))}
            </Box>
          </Box>
          <FormControlLabel
            control={
              <Checkbox defaultChecked name="isAvailable" />
            }
            label="Available"
          />
  
          <Button
            variant="contained"
            sx={{ width: "fit-content", mt: 3 }}
            type="submit"
          >
            Create
          </Button>
        </Box>
      </>
    )
}