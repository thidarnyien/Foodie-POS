import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField
  } from "@mui/material";
  import {  deleteTable, getTable, updateTable } from "../actions";
import { prisma } from "@/libs/prisma";
import QrImage from "@/components/QrImage";
  
  interface props{
    params: {id:string}
  }
  
  export default async function TableUpdatePage({params}:props) {
    
    const {id} = params;
  
    const table = await getTable(Number(id));
  
    return (
      <>
        <h3>Update Table</h3>
        <Box
        action={updateTable}
        component={"form"} 
         sx={{ my: 2, display: "flex", flexDirection: "column" }}>
          <QrImage qrImageUrl= {table.qrCodeImageUrl}/>

          <input
            type="hidden"
            defaultValue={table.id}
            name="id"
            
          />
          <input
            type="hidden"
            defaultValue={table.locationId}
            name="locationId"
            
          />      
          <TextField
            sx={{ my: 2, width: "350px" }}
            type="text"
            defaultValue={table.tableNo}
            variant="outlined"
            name="tableNo"
            
          ></TextField>
          
          <Button
            sx={{ my: 2, width: "fit-content" }}
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </Box>
        <Box component={"form"} action={deleteTable}>

          <input
            type="hidden"
            defaultValue={table.id}
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