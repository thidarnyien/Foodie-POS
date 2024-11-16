"use server";
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { createAddonCategory } from "../actions";
import { getCompanyMenus } from "@/libs/actions";

export default async function NewAddonCategoryPage() {
  const menus = await getCompanyMenus();

  return (
    <>
      <h3>New Addon Category</h3>
      <Box
      component={"form"}
      action={createAddonCategory}
       sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Name"
          name="name"
          label="Name"
          variant="outlined"
         
        ></TextField>
         <Box sx={{py: 2}}>
        <h4>Choose Menus</h4>
        <Box sx={{display: "flex"}}> 
          {menus.map((menu)=> (
            <FormControlLabel 
            key={menu.id}
            control={<Checkbox  name="menuId" value={menu.id}/>}
            label= {menu.name}
            />
          ))}
        </Box>
        </Box>
      <FormControlLabel
          control={<Checkbox defaultChecked/>}
          label="isRequired"
          name="isRequired"
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
