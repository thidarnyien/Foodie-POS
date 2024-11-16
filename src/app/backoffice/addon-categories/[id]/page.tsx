import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { deleteAddonCategory, getAddonCategory, updateAddonCategory } from "../actions";
import { getCompanyMenus } from "@/libs/actions";

interface Props {
  params: {
    id: string;
  };
}
export default async function AddonCategoryUpdatePage({ params }: Props) {
  const {id} = params;
  const addonCategory = await getAddonCategory(Number(id));
  const menus = await getCompanyMenus();
  const selected = addonCategory?.menusAddonCategories.map(item=> item.menuId);

  return (
    // console.log("hello update page")
    <>
      <h3>Update Addon Category</h3>
      <Box
        action={updateAddonCategory}
        component={"form"}
        sx={{ my: 2, display: "flex", flexDirection: "column" }}
      >
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          defaultValue={addonCategory?.name}
          name="name"
          variant="outlined"
          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></TextField>
        <input
          type="hidden"
          value={addonCategory?.id}
          name="id"

          // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
        ></input>
         <Box sx={{py: 2}}>
        <h4>Choose Menus</h4>
        <Box sx={{display: "flex"}}> 
          {menus.map((menu)=> (
            <FormControlLabel 
            key={menu.id}
            control={<Checkbox defaultChecked= {selected?.includes(menu.id)}  name="menuId" value={menu.id}/>}
            label= {menu.name}
            />
          ))}
        </Box>
        
        </Box>
        <FormControlLabel
          control={
            <Checkbox name="isRequired" defaultChecked={addonCategory?.isRequired ? true : false} />
          }
          label="Required"
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
        action={deleteAddonCategory}
        component={"form"}
       
      >
        <input
          type="hidden"
          value={addonCategory?.id}
          name="id"

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
