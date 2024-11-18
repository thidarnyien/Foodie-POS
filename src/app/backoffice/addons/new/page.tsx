import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
  } from "@mui/material";
  import {createNewAddon, updateAddon } from "../actions";
import { getCompanyAddonCategories } from "@/libs/actions";

  
  export default async function NewAddonPage() {
    
    const addonCategories = await getCompanyAddonCategories();
  
    return (
      <>
        <h4>New Addon</h4>
        <Box
          component={"form"}
          action={createNewAddon}
          sx={{ mt: 2, display: "flex", flexDirection: "column" , width: "300px"}}
        >
          
          <TextField label="Name" name="name" />
          <TextField
            
            sx={{ my: 2 }}
            label="Price"
            name="price"
          />
          <Box>
            <Typography>Addon categories</Typography>
            <Box
              sx={{
                border: "1px solid lightgray",
                px: 1.2,
                py: 1,
                borderRadius: 1,
              }}
            >
              {addonCategories.map((addonCategory) => (
                <FormControlLabel
                  key={addonCategory.id}
                  control={
                    <Checkbox
                      name="addonCategoryId"
                      value={addonCategory.id}
                     
                    />
                  }
                  label={addonCategory.name}
                />
              ))}
            </Box>
          </Box>
          <FormControlLabel
            control={
              <Checkbox defaultChecked name="isAvailable" />
            }
            label="Available"
          />
  
          <Button
            variant="contained"
            sx={{ width: "fit-content", mt: 3 }}
            type="submit"
          >
            Create
          </Button>
        </Box>
      </>
    );
  }
  