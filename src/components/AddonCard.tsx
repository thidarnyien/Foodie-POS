"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Addons} from "@prisma/client";
import { useRouter } from "next/navigation";
interface props {
  addon: Addons;
}
export function AddonCard({ addon }: props) {
  const { name, price, isAvailable } = addon;
  const router = useRouter();

  return (
    <Box
      sx={{
        marginRight: 4,
        mb: 4,
        
        }}
    >
      <Card sx={{ width: 236, borderRadius: 2, overflow: "hidden" }}>
        {/* <CardMedia
          component="img"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY7__X1l8xvK5PMy6OmihxfesM1QqL4OQ-4Q&s"
          alt="Dish Image"
          sx={{ height: 182, objectFit: "cover" }}
        /> */}
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
            <Chip
              label={isAvailable ? "Available" : "Sold Out"}
              color={isAvailable ? "success" : "error"}
              size="small"
            />
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
