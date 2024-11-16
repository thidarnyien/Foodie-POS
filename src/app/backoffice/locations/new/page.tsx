// "use client";
"use server"
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { createLocation } from "../actions";
import { prisma } from "@/libs/prisma";


export default async function NewLocationPage() {
    const companies = await prisma.company.findMany();
  // const newMenuCategory = await prisma.menuCategories.create()

  return (
    <>
      <h3>New Location</h3>
      <Box
      component={"form"}
      action={createLocation}
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
          Create
        </Button>
      </Box>
    </>
  );
}