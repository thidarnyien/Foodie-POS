"use server";
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { getLocation, updateLocation } from "../actions";
import { getSelectedLocation } from "@/libs/actions";

interface props{
  params: {id:string}
}
export default async function UpdateLocationPage({params}: props) {
  const id = params.id;
  const location = await getLocation(Number(id));
  const selectedLocation = await getSelectedLocation();
  const isSelected = Number(id) === selectedLocation?.locationId;

  return (
    <>
      <h3>Update Location</h3>

      <Box
      component={"form"}
      action={updateLocation}
       sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <input type="hidden" name="id" value={location.id}></input>

        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Name"
          defaultValue={location.name}
          name="name"
          label="Name"
          variant="outlined"
        ></TextField>

         <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          defaultValue={location.address}
          name="address"
          label="Address"
          variant="outlined"
        ></TextField>

         <TextField
          sx={{ my: 2, width: "350px" }}
          type="number"
          defaultValue={location.phoneNumber}
          name="phone"
          label="Phone"
          variant="outlined"
        ></TextField>

    <FormControlLabel 
      control={<Checkbox
        defaultChecked = {isSelected}
        name = "selected"
        value={isSelected? true : false}
      />}
      label= "Current Location"
      />
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          type="submit"
        >
          Update
        </Button> 
      </Box>
    </>
  );
}