"use server";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { deleteMenu } from "./actions";
import { getCompanyMenus } from "@/libs/actions";
import { BackofficeMenuCard } from "@/components/BackofficeMenuCard";

export default async function MenusPage() {
  const menus = await getCompanyMenus();
  
  // console.log(menus)
  

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Menus Page</h1>
        <Link href={"/backoffice/menus/new"}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1D3557",
              "&:hover": { bgcolor: "#2d4466" },
            }}
          >
            New menu
          </Button>
        </Link>
      </Box>
      <Box component={"form"} action={deleteMenu} sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>

        {menus.map((menu) => (
          
          <div
            key={Number(menu.id)}

            style={{ position: "relative", width: "fit-content" }}
          >
            <Link

              href={`/backoffice/menus/${menu.id}`}
              style={{ textDecoration: "none" }}
            >
              <input
                type="hidden"
                defaultValue={menu.id}
                name="id"

              />
              <BackofficeMenuCard menu={menu} />
            </Link>
            <IconButton
              type="submit"
              aria-label="Close"
              sx={{
                position: "absolute",
                top: 8,
                right: 28,
                borderRadius: "50%",
                color: "dark",
              }}
              size="small"

            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </Box>
    </>
  );
}
