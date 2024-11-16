import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { deleteMenuCategory, updateMenuCategory } from "../actions";
import { getCompanyId } from "@/libs/actions";

interface Props {
  params: {
    id: string;
  };
}
export default async function MenuUpdatePage({ params }: Props) {
  const { id } = params;
  const companyId = await getCompanyId();
  const menuCategory = await prisma.menuCategories.findFirst({
    where: { id: Number(id) }, include: {DisabledLocationsMenuCategories: true}
  });

  const isAvailable = menuCategory?.DisabledLocationsMenuCategories.length ? false : true; // length 0 ဆိုရင် false so yin 

  return (
    // console.log("hello update page")
    <>
      <h3>Update Menu</h3>
      <Box
        action={updateMenuCategory}
        component={"form"}
        sx={{ my: 2, display: "flex", flexDirection: "column" }}
      >
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          defaultValue={menuCategory?.name}
          name="menuCategoryName"
          variant="outlined"
          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></TextField>

        <input
          type="hidden"
          defaultValue={menuCategory?.id}
          name="menuCategoryId"
          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></input>

        <input type="hidden" defaultValue={companyId} name= "companyId"></input>

        <FormControlLabel
          control={
            <Checkbox defaultChecked={isAvailable} name="isAvailable" />
          }
          label="Available"
        />
  
        <Box>
          <Button
            type="submit"
            sx={{ mr: 2, width: "fit-content" }}
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Box>

      <Box
        action={deleteMenuCategory}
        component={"form"}

      >
        <input
          type="hidden"
          value={menuCategory?.id}
          name="menuCategoryId"

          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></input>
      

          
          <Button
            type="submit"
            sx={{ mr: 2, width: "fit-content" }}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
 
      </Box>
    </>
  );
}
