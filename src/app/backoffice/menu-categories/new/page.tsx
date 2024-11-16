// "use client";
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { createMenuCategory } from "../actions";

export default async function NewMenuCategoryPage() {
  // const newMenuCategory = await prisma.menuCategories.create()

  return (
    <>
      <h3>New Menu Category</h3>
      <Box
      component={"form"}
      action={createMenuCategory}
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
          Create
        </Button>
      </Box>
    </>
  );
}
