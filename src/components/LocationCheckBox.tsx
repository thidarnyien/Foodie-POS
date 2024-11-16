"use client";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Locations } from "@prisma/client";
import React from "react";

interface Props{
    id: string,
    locations: Locations[]
}
export default function LocationCheckBox({id, locations}: Props){

    
    
    return(
        <FormControlLabel 
      
        control={<Checkbox
          defaultChecked ={id === localStorage.getItem("currentLocationId")}
          onChange={(_, checked) => {
            if(checked){
                localStorage.setItem("currentLocationId", id)
            }else{
                localStorage.setItem("currentLocationId", String(locations[0].id))
            }
          }}
        />}
        label= "Current Location"
        />
    )
}