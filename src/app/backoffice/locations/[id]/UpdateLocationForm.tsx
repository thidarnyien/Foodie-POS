"use client"
import { Box, TextField, FormControlLabel, Checkbox, Button, useScrollTrigger } from "@mui/material";
import { updateLocation } from "../actions";
import { Locations } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";


interface Props{
    location : Locations;
    isSelected : boolean;
}

export default function UpdateLocationForm({location,isSelected}: Props){
    const [loading, setLoading] = useState(false);
    
    const handleUpdateLocation = async (formData : FormData)=>{
        try {
            setLoading(true);
            const response = await updateLocation(formData);
            if(response.errors){
                setLoading(false)
                response.errors.forEach(err => toast.error(err.message));
            }else{
                setLoading(false)
                toast.success("Location updated successfully!")
            }
        } catch (error) {
            setLoading(false)
        }
        
    }
    return (
        <>
        <h3>Update Location</h3>
  
        <Box
        component={"form"}
        action={handleUpdateLocation}
         sx={{ my: 2, display: "flex", flexDirection: "column" }}>
          <input type="hidden" name="id" value={location.id}></input>
  
          <TextField
            sx={{ my: 2, width: "350px" }}
            type="text"
            placeholder="Name"
            defaultValue={location.name}
            name="name"
            label="Name"
            variant="outlined"
          ></TextField>
  
           <TextField
            sx={{ my: 2, width: "350px" }}
            type="text"
            defaultValue={location.address}
            name="address"
            label="Address"
            variant="outlined"
          ></TextField>
  
           <TextField
            sx={{ my: 2, width: "350px" }}
            type="number"
            defaultValue={location.phoneNumber}
            name="phone"
            label="Phone"
            variant="outlined"
          ></TextField>
  
      <FormControlLabel 
        control={<Checkbox
          defaultChecked = {isSelected}
          name = "selected"
          value={isSelected? true : false}
        />}
        label= "Current Location"
        />
          <Button
            sx={{ my: 2, width: "fit-content" }}
            variant="contained"
            type="submit"
          >
            { loading ? "Loading..." : "Update"}
          </Button> 
        </Box>
      </>
    )
}