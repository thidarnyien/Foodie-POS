// "use client";
"use client"
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { createLocation } from "../actions";

import { useState } from "react";
import toast from "react-hot-toast";


export default function NewLocationPage(){
  const [loading, setLoading] = useState(false);

  const handleCreateLocation = async (formData : FormData) =>{
      try {
          setLoading(true);
          const response = await createLocation(formData);
          if(response.errors){
              setLoading(false)
              response.errors.forEach(err => toast.error(err.message));
          }else{
              setLoading(false);
              toast.success("Location created successfully!")
          }
      } catch (error) {
          setLoading(false);
      }

      
  }
  return(
      <>
    <h3>New Location</h3>
    <Box
    component={"form"}
    action={handleCreateLocation}
     sx={{ my: 2, display: "flex", flexDirection: "column" }}>
     
      <TextField
        sx={{ my: 2, width: "350px" }}
        type="text"
        placeholder="Name"
        name="name"
        label="Name"
        variant="outlined"
      ></TextField>

       <TextField
        sx={{ my: 2, width: "350px" }}
        type="text"
        placeholder="Address"
        name="address"
        label="Address"
        variant="outlined"
      ></TextField>

       <TextField
        sx={{ my: 2, width: "350px" }}
        type="number"
        placeholder="Phone"
        name="phone"
        label="Phone"
        variant="outlined"
      ></TextField>
      <Button
        sx={{ my: 2, width: "fit-content" }}
        variant="contained"
        type="submit"
      >
       {loading ? "Loading..." : "Create"}
      </Button>
    </Box>
  </>
  )
}