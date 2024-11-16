import { AddCircle, RemoveCircle } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"


interface Props{
    value: number,
    onDecrease: () => void,
    onIncrease : () => void
}
export default function QuantitySelector({value, onDecrease, onIncrease}: Props){
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "100px",
            mt: {xs: 2, sm: 3}
        }}>
            <IconButton onClick={onDecrease} color="primary">
                <RemoveCircle/>
            </IconButton>
            <Typography variant="h5">{value}</Typography>
            <IconButton onClick={onIncrease} color="primary">
                <AddCircle/>
            </IconButton>
        </Box> 
    )
}