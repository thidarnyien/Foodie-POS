
import MenuCategoryCard from "@/components/MenuCategoryCard";
import { getCompanyMenuCategories, getSelectedLocation } from "@/libs/actions";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default async function MenuCategoriesPage() {
  const menuCategories = await getCompanyMenuCategories();
  const selectedLocationId = (await getSelectedLocation())?.locationId;
//   const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
//   const router = useRouter();

//   useEffect(()=>{
//     getMenuCategories();
// },[])

// const getMenuCategories = async () => {
//   const response = await fetch(`${config.backofficeApiUrl}/menu-categories`);
//   const dataFromServer = await response.json();
//   console.log(dataFromServer);
//   const { menuCategories } = dataFromServer;
//   setMenuCategories(menuCategories);
// };
 

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Menu Categories Page</h1>
       <Link href={"/backoffice/menu-categories/new"}>
       <Button
        variant="contained"
        sx={{
          bgcolor: "#1D3557",
          "&:hover": { bgcolor: "#2d4466" },
        }}
          
          // onClick={() => router.push("/backoffice/menu-categories/new")}
        >
          New Menu Category
        </Button>
       </Link>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap",
          }}>
        {menuCategories.map((menuCategory)=> {
       
          return (

            <Link key={menuCategory.id} style={{textDecoration: "none"}} href={`/backoffice/menu-categories/${menuCategory.id}`}>
            <MenuCategoryCard title={menuCategory.name} 
            isAvailable = {menuCategory.DisabledLocationsMenuCategories.find(
              (item)=> 
              item.menuCategoryId === menuCategory.id && item.locationId === selectedLocationId)? false : true} ></MenuCategoryCard>
          </Link> 
          )
        
          }

        )}
      </Box>
    </>
  );
}
