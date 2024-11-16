"use client"
import { Box, TextField, FormControlLabel, Checkbox, Button, CircularProgress } from "@mui/material";
import { createNewMenu } from "../actions";
import { AddonCategories, MenuCategories } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { upload } from "@vercel/blob/client";


interface Props{
    menuCategories: MenuCategories[]
}
export default function NewMenuForm({menuCategories} : Props){

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreateClientUpload =async (formData: FormData) => {
      // console.log(formData)
      try {
      
        setLoading(true);
        const file = formData.get("file") as File;
        if(file.size){
          const {url} = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/upload"
          });
          formData.set("imageUrl", url);
        }

        const response = await createNewMenu(formData);
        if(response?.errors){
          response.errors.forEach(error => toast.error(error.message));
        }else{
          toast.success("Menu Create Successfully.");
          router.push("/backoffice/menus");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false)
      }
    }
    const handleCreateServerUpload =async (formData: FormData)=>{
      try {
        
        setLoading(true);
        const response = await createNewMenu(formData);
        if(response?.errors){
          response.errors.forEach(error => toast.error(error.message));
        }else{
          toast.success("Menu Create Successfully.");
          router.push("/backoffice/menus");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false)
      }
    }

    return(
        <>
        <Box component={"form"} 
        action = {handleCreateClientUpload}
       /*  action={async (formData: FormData)=> {

            setLoading(true);
            const response = await createNewMenu(formData);
            if(response.error){
                toast.error(response.error)
            }else{
                setTimeout(()=>{
                    toast.success("Create menu successfully.")
                },2000)

            }
            console.log(loading)
            setLoading(false);
            router.push("/backoffice/menus");
        }}  */
            sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          placeholder="Name"
          label="Name"
          name="newMenuName"
          variant="outlined"
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="number"
          placeholder="Price"
          label="Price"
          name="newMenuPrice"
          variant="outlined"
          
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="file"
          // placeholder="Upload Menu Image"  
        //   label="Upload Menu Image"
          name="file"
          variant="outlined"
          
        ></TextField>
        <Box sx={{py: 2}}>
        <h4>Choose Menu Category</h4>
        <Box sx={{display: "flex"}}> 
          {menuCategories.map((menuCategory)=> (

            <FormControlLabel 
            key={menuCategory.id}
            control={<Checkbox  name="menuCategoryId" value={menuCategory.id}/>}
            label= {menuCategory.name}
            />
          ))}
        </Box>
        </Box>
        
        <Box sx={{pb: 2}}>
        <h4>Condition</h4>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              name="isAvailable"
            />
          }

          label="Avaiable"
        />
        </Box>
        {/* <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Available"
          onChange={(evt, value) =>
            setNewMenu({ ...newMenu, isAvailable: value })
          }
        /> */}
        
        <Button
        type="submit"
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
        >
          {loading? <CircularProgress/>: "Create" }
          
        </Button> 
      </Box>
        </>
    )
}