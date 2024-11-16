// "use client";
import AddonCategoryCard from "@/components/AddonCategoryCard";

import { Box, Button } from "@mui/material";
import Link from "next/link";

import { getCompanyAddonCategories } from "@/libs/actions";
// import router from "next/navigation";

export default async function AddonCategoriesPage() {
  const addonCategories = await getCompanyAddonCategories();
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
        <h1>Addon Categories Page</h1>
        <Link href={"/backoffice/addon-categories/new"}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1D3557",
              "&:hover": { bgcolor: "#2d4466" },
            }}
          >
            New Addon Category
          </Button>
        </Link>
      
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap",
          }}>
        {addonCategories.map((addonCategory)=> (
        <Link style={{textDecoration: "none"}} href={`/backoffice/addon-categories/${addonCategory.id}`}>
          <AddonCategoryCard title={addonCategory.name} isRequired = {addonCategory.isRequired} ></AddonCategoryCard>
        </Link>
        
        )

        )}
      </Box>
    </>
  );
}
