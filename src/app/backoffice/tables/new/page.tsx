"use client"
import { Box, Button, TextField } from "@mui/material";

import { useRef } from "react";
import { createNewTable } from "../actions";


export default function NewTableCreatePage() {

  return (
    <Box action={createNewTable} component={"form"} sx={{ my: 2, display: "flex", flexDirection: "column" }}>
      <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Table No"
          name="tableNo"
          label="Table No"
          variant="outlined"
         
        ></TextField>
        <Button type="submit" sx={{ my: 2, width: "fit-content" }} variant = "contained">Create</Button>
    </Box>
  )
/* 
  const ref = useRef<HTMLFormElement>();

  const handleCreateTable = ()=>{
    const fd = new FormData(ref.current);
    const locationId = localStorage.getItem("currentLocationId") as string;
    fd.set("locationId", locationId);
    createNewTable(fd);
  }


  return (
    <>
      <h3>New Table</h3>
      <Box
      ref= {ref}
      component={"form"}
    
       sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="number"
          placeholder="Table No"
          name="tableNo"
          label="Table No"
          variant="outlined"
         
        ></TextField>
        
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          onClick={handleCreateTable}
        >
          Create
        </Button>
      </Box>
    </>
  ); */
}