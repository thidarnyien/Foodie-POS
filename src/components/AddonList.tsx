import { CheckBox } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, Radio, Typography } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props{
    addonCategory: AddonCategories;
    relatedAddons : Addons[];
    selectedAddons: Addons[];
    setSelectedAddons: Dispatch<SetStateAction<Addons[]>>;
}

export default function AddonList({addonCategory,relatedAddons, selectedAddons, setSelectedAddons}: Props){
    return (
       <Box>
        {relatedAddons.map((relatedAddon)=> {
            return (
                <Box key={relatedAddon.id} sx={{display: "flex", justifyContent: "space-between", my: 2}}>
                    <FormControlLabel control = {
                        addonCategory.isRequired ? 
                        <Radio sx={{
                            "&.Mui-checked": {
                                color: "#289D8F"
                            }
                        }} 
                        checked= {
                            selectedAddons.find(item => item.id === relatedAddon.id) ? true : false
                        }
                        onChange={()=> {
                            const addonIds = relatedAddons.map(item => item.id);
                            const others = selectedAddons.filter(
                                (item) => !addonIds.includes(item.id)
                            );
                            setSelectedAddons([...others, relatedAddon]);
                        }}
                        />: 
                        <Checkbox sx={{
                            "&.Mui-checked":{
                                color: "289D8F"
                            }
                        }} 
                        checked= {selectedAddons.find(item => item.id === relatedAddon.id) ? true: false}
                        
                        onChange={(evt, value)=> {
                            if(value){
                                setSelectedAddons([
                                    ...selectedAddons, relatedAddon
                                ])
                            }else{
                                const selected = selectedAddons.filter(item => item.id !== relatedAddon.id);
                                setSelectedAddons(selected);
                            }
                        }}
                        />
                    }
                    label = {relatedAddon.name}
                    >
                        
                    </FormControlLabel>
                    <Box>
                        <Typography>{relatedAddon.price}</Typography>
                    </Box>
                </Box>
            )
        })}
       </Box>
    )
}