"use client";
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { createMenuCategory } from "../actions";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuCategoryPage() {
  // const newMenuCategory = await prisma.menuCategories.create()
  const [loading, setLoading] = useState(false)

  const handleCreateMenuCategory = async (formData: FormData) =>{
      try {
        setLoading(true);
        const response = await createMenuCategory(formData);
        if(response.errors){
          setLoading(false)
          response.errors.forEach(err => toast.error(err.message))
        }else{
          setLoading(false)
          toast.success("Menu Category created successfully!")
        }
      } catch (error) {
        setLoading(false)
      }
  }

  return (
    <>
      <h3>New Menu Category</h3>
      <Box
      component={"form"}
      action={handleCreateMenuCategory}
       sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Name"
          name="newMenuCategoryName"
          label="Name"
          variant="outlined"
         
        ></TextField>
      <FormControlLabel
          control={<Checkbox defaultChecked name="isAvailable" />}
          label="Available"
          
        />
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          type="submit"
        >
          {loading ? "Loading..." : "Create"}
        
        </Button>
      </Box>
    </>
  );
}
