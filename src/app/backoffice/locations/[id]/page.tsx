"use server";
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { getLocation, updateLocation } from "../actions";
import { getSelectedLocation } from "@/libs/actions";
import UpdateLocationForm from "./UpdateLocationForm";

interface props{
  params: {id:string}
}
export default async function UpdateLocationPage({params}: props) {
  const id = params.id;
  const location = await getLocation(Number(id));
  const selectedLocation = await getSelectedLocation();
  const isSelected = Number(id) === selectedLocation?.locationId;

  return <UpdateLocationForm isSelected= {isSelected} location={location}/>
}