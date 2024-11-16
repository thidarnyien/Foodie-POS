
import { getSelectedLocation } from "@/libs/actions";
import { MenuCard } from "./MenuCard";

interface props {
  menu : any
}

export async function BackofficeMenuCard({ menu }: props) {
  const selectedLocationId = (await getSelectedLocation())?.locationId;
  const {id, name, price, imageUrl } = menu;
  const disabledLoationMenus = menu.DisabledLocationsMenus[0];
  const isAvailable = disabledLoationMenus && disabledLoationMenus.locationId === selectedLocationId ? false : true;
  const menuImageUrl = menu.imageUrl ? menu.imageUrl : "https://images.squarespace-cdn.com/content/v1/5a81c36ea803bb1dd7807778/1610403788186-K2ATWJRYLHVC4ENCZZ7D/Shan+khaut+swe+%28Shan+sticky+noodles%29"

  return <MenuCard name={name} imageUrl={imageUrl} price={price} id = {id} isAvailable = {isAvailable} showIsAvailable/>
  /* (
    <Box
      sx={{
        marginRight: 4,
        mb: 4,
        
        }}
    >
      <Card sx={{ width: 236, borderRadius: 2, overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={menuImageUrl}
          alt="Dish Image"
          sx={{ height: 182, objectFit: "cover" }}
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
{ */
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
