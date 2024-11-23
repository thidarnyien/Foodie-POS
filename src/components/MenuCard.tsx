
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";


interface props {
  id : number,
  name : string,
  price : number | null,
  imageUrl? : string,
  showIsAvailable?: boolean,
  isAvailable? : boolean
}

export function MenuCard({ id, name,price,imageUrl, showIsAvailable, isAvailable }: props) {

  return (
    <Box
      sx={{
        marginRight: 4,
        mb: 4,
        
        }}
    >
      <Card sx={{ width: 200, height: 250, borderRadius: 2, overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Dish Image"
          sx={{ height: 150, objectFit: "cover" }}
        />
        <CardContent
          sx={{ p: 2, bgcolor: "background.paper", color: "text.primary" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{name}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography variant="body2" color="primary" fontSize={18}>
              Ks {Number(price)}
            </Typography>
            {showIsAvailable && <Chip
              label={isAvailable ? "Available" : "Sold Out"}
              color={isAvailable ? "success" : "error"}
              size="small"
            />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
{
  /* <Card sx={{ width: 256, borderRadius: 2, overflow: "hidden", position: "relative" }}>
      <CardMedia
        component="img"
        image="/placeholder.svg"
        alt="Dish Image"
        sx={{ height: 192, objectFit: "cover" }}
      />
      <CardContent sx={{ p: 2, bgcolor: "background.paper", color: "text.primary" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{name}</Typography>
          <IconButton
            aria-label="Close"
            sx={{ position: "absolute", top: 8, right: 8, borderRadius: "50%" }}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="body2" color="text.secondary">Ks {price}</Typography>
          
        </Box>
      </CardContent>
    </Card> */
}
