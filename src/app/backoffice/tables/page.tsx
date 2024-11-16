
import TableCard from "@/components/TableCard";
import { getCompanyLocations, getCompanyTables, getLocationTables, getSelctedLocationTables } from "@/libs/actions";
import { Box, Button } from "@mui/material";

import Link from "next/link";


export default async function TablesPage(){
 const tables = await getSelctedLocationTables();
  /* const [tables, setTables] = useState<Tables[]>([]);
  useEffect(()=>{
    handleGetLocationTables();
  },[ ]);
  const handleGetLocationTables=async ()=>{
  
  const locationId = localStorage.getItem("currentLocationId");
  const tables = await getLocationTables(Number(locationId));
  setTables(tables); */

  
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Tables Page</h1>
       <Link href={"/backoffice/tables/new"}>
       <Button
        variant="contained"
        sx={{
          bgcolor: "#1D3557",
          "&:hover": { bgcolor: "#2d4466" },
        }}
          
          // onClick={() => router.push("/backoffice/menu-categories/new")}
        >
          New Table
        </Button>
       </Link>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap",
          }}>
        {tables.map((table)=> (
        <Link key={table.id} style={{textDecoration: "none"}} href={`/backoffice/tables/${table.id}`}>
          <TableCard title={table.tableNo} ></TableCard>
        </Link>
        
        )

        )}
      </Box>
    </>
  );
}