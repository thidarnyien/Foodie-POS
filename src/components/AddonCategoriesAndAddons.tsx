import { Box, Chip, Typography } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import AddonList from "./AddonList";
import { Dispatch, SetStateAction } from "react";

interface Props{
    addonCategories: AddonCategories[],
    addons : Addons[],
    selectedAddons: Addons[],
    setSelectedAddons: Dispatch<SetStateAction<Addons[]>>;
}

export default function AddonCategoriesAndAddons({addonCategories, addons,selectedAddons, setSelectedAddons}: Props){
    return (
        <Box sx={{ width: "100%" }}>
            {addonCategories.map(item => {
                const relatedAddons = addons.filter((addon)=> addon.addonCategoryId === item.id);
                return (
                    <Box key={item.id} >
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography>
                                {item.name}
                            </Typography>
                            <Chip label={item.isRequired ? "Required" : "Optional"}/>
                        </Box>
                        <AddonList relatedAddons={relatedAddons} addonCategory={item} selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons}/>
                    </Box>
                )

            })}
        </Box>
    )
}