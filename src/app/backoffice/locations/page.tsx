"use server";
import LocationCard from "@/components/LocationCard";
import { getCompanyLocations } from "@/libs/actions";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default async function LocationsPage(){
  const locations = await getCompanyLocations()
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Locations Page</h1>
       <Link href={"/backoffice/locations/new"}>
       <Button
        variant="contained"
        sx={{
          bgcolor: "#1D3557",
          "&:hover": { bgcolor: "#2d4466" },
        }}
          
          // onClick={() => router.push("/backoffice/menu-categories/new")}
        >
          New Location
        </Button>
       </Link>
      </Box>
      
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap",
          }}>
        {locations.map((location)=> (
          
        <Link key={location.id} style={{textDecoration: "none"}} href={`/backoffice/locations/${location.id}`}>
          <LocationCard title={location.name} ></LocationCard>
        </Link>
        
        )

        )}
      </Box>
    </>
  );
}