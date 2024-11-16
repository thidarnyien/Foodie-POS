"use client"

import { Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField } from "@mui/material";
import { AddonCategories, MenuCategories, Menus } from "@prisma/client";
import { updateMenu, deleteMenu } from "../actions";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BlurCircularTwoTone } from "@mui/icons-material";

interface Props{
menu: Menus,
menuCategories : MenuCategories[],
selectedMenuCategories: number [],
isAvailable : boolean,
addonCategories: AddonCategories[]
selectedAddonCategories: number[]
}

export function UpdateMenuForm({menu, menuCategories, selectedMenuCategories, selectedAddonCategories, isAvailable, addonCategories} : Props){
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const  handleUpdateClientMenu=async (formData : FormData)=>{
        // console.log(formData);
        try{
            const file = formData.get("file") as File;
            if(file.size){
                const {url} = await upload(file.name, file, {
                    access: "public",
                    handleUploadUrl: "/api/upload"
                  });
                  formData.set("imageUrl", url);
            }
        const response = await updateMenu(formData);
        if(response?.errors){
          response.errors.forEach(error => toast.error(error.message));
        }else{
          toast.success("Menu Update Successfully.")
          router.push("/backoffice/menus");
        }
        setLoading(false);
        }catch(err){
            setLoading(false);
        }
    }

    return(
        <>
        <h3>Update Menu</h3>
      <Box
      action={handleUpdateClientMenu}
      component={"form"} 
       sx={{ my: 2, display: "flex", flexDirection: "column" }}>
        <input
          type="hidden"
          defaultValue={menu.id}
          name="id"
          
        />
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="text"
          defaultValue={menu.name}
          variant="outlined"
          name="updatedMenuName"
          
        ></TextField>
        <TextField
          sx={{ my: 2, width: "350px" }}
          type="number"
          defaultValue={menu.price}
          name="updatedMenuPrice"
          variant="outlined"
         
        ></TextField>
        <input
        type="hidden"
        name="updatedMenuId"
        value={menu.id}
         />
         <Image src={menu.imageUrl || ""} width={100}  height={100} alt="menu image" style={{ marginTop: "10px", borderRadius: "10px" }}/>
         <TextField
          sx={{ my: 2, width: "350px" }}
          type="file"
          // placeholder="Upload Menu Image"  
        // label="Upload Menu Image"
          name="file"
          variant="outlined"
        //   defaultValue={menu.imageUrl}
        ></TextField>
        <Box sx={{py: 2}}>
        <h4>Choose Menu Category</h4>
        <Box sx={{display: "flex"}}> 
          {menuCategories.map((menuCategory)=> (
            <FormControlLabel 
            key={menuCategory.id}
            control={<Checkbox
              defaultChecked={selectedMenuCategories?.includes(menuCategory.id)}
              name="menuCategoryId"
              value={menuCategory.id}
            />}
            label= {menuCategory.name}
            />
          ))}
        </Box>
        </Box>

        <Box sx={{py: 2}}>
        <h4>Choose Addon Category</h4>
        <Box sx={{display: "flex"}}> 
          {addonCategories.map((addonCategory)=> (
            <FormControlLabel 
            key={addonCategory.id}
            control={<Checkbox
              defaultChecked={selectedAddonCategories?.includes(addonCategory.id)}
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
              defaultChecked = {isAvailable}
              name="isAvailable"
            />
          }

          label="Available"
        />
        </Box>
        <Button
          sx={{ my: 2, width: "fit-content" }}
          variant="contained"
          type="submit"
        >
          {loading? <CircularProgress/> : "Update"}
        </Button>
      </Box>
      <Box component={"form"} action={deleteMenu}>
      <input
          type="hidden"
          defaultValue={menu.id}
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
    )
}