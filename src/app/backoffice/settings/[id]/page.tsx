import { Box, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { deleteMenuCategory } from "../../menu-categories/actions";
import { getCompany, updateCompany } from "../actions";


interface Props{
    id: number
}
export default async function UpdateCompanyPage({id}: Props){

    const company = await getCompany(id);
    return(
        
            // console.log("hello update page")
            <>
              <h3>Update Company</h3>
              <Box
                action={updateCompany}
                component={"form"}
                sx={{ my: 2, display: "flex", flexDirection: "column" }}
              >
                <TextField
                  sx={{ my: 2, width: "350px" }}
                  type="text"
                  defaultValue={company?.name}
                  name="name"
                  variant="outlined"
                  // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
                ></TextField>
                <TextField
                  sx={{ my: 2, width: "350px" }}
                  type="text"
                  defaultValue={company?.phoneNumber}
                  name="phoneNumber"
                  variant="outlined"
                  // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
                ></TextField>
                <TextField
                  sx={{ my: 2, width: "350px" }}
                  type="text"
                  defaultValue={company?.address}
                  name="address"
                  variant="outlined"
                  // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
                ></TextField>
        
                <input
                  type="hidden"
                  defaultValue={company?.id}
                  name="id"
                  // onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
                ></input>
          
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
              </Box>
            </>
    )
}