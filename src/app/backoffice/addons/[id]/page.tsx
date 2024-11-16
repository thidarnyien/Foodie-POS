
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from "@mui/material";
import { deleteAddon, getAddon, updateAddon } from "../actions";
import { getCompanyAddonCategories } from "@/libs/actions";

interface props{
  params: {id:string}
}

export default async function AddonUpdatePage({params}:props) {
  
  const {id} = params;

  const addon = await getAddon(Number(id));
  const addonCategories = await getCompanyAddonCategories();

  return (
    <>
      <h3>Update Addon</h3>
      <Box
      action={updateAddon}
      component={"form"} 
       sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <input
          type="hidden"
          defaultValue={addon.id}
          
          name="id"
          
        />
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          defaultValue={addon.name}
          variant="outlined"
          name="name"
          
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="number"
          defaultValue={addon.price}
          name="price"
          variant="outlined"
         
        ></TextField>
        <input
        type="hidden"
        name="id"
        value={addon.id}
         />
        <Box sx={{py: 2}}>
        <h4>Choose Menu Category</h4>
        <Box sx={{display: "flex"}}> 
          {addonCategories.map((addonCategory)=> (

            <FormControlLabel 
            key={addonCategory.id}
            control={<Checkbox
              defaultChecked={addonCategory.id === addon.addonCategoryId}
              name="addonCategoryId"
              value={addonCategory.id}
            />}
            label= {addonCategory.name}
            />
          ))}
        </Box>
        </Box>
        <Box sx={{pb: 2}}>
        <h4>Condition</h4>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked = {addon.isAvailable? true : false}
              name="isAvailable"
            />
          }

          label="Avaiable"
        />
        </Box>
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          type="submit"
        >
          Update
        </Button>
      </Box>
      <Box component={"form"} action={deleteAddon}>
      <input
          type="hidden"
          defaultValue={addon.id}
          name="id"
          
        />      
        <Button
            sx={{ my: 2, width: "fit-content" }}
            variant="contained"
            color="error"
            type="submit"
          >
            Delete
          </Button>
      </Box>
    </>
  );
}