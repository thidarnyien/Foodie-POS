
import { prisma } from "@/libs/prisma";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { deleteAddon } from "./actions";
import { MenuCard } from "@/components/MenuCard";
import { AddonCard } from "@/components/AddonCard";
import { getCompanyAddons } from "@/libs/actions";
// import { deleteMenu } from "./actions";

export default async function AddonsPage() {
  const addons = await getCompanyAddons();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Addons Page</h1>
        <Link href={"/backoffice/addons/new"}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1D3557",
              "&:hover": { bgcolor: "#2d4466" },
            }}
          >
            New Addon
          </Button>
        </Link>
      </Box>
      <Box component={"form"} action={deleteAddon} sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>

        {addons.map((addon) => (

          <div
            key={Number(addon.id)}

            style={{ position: "relative", width: "fit-content" }}
          >
            <Link

              href={`/backoffice/addons/${addon.id}`}
              style={{ textDecoration: "none" }}
            >
              <input
                type="hidden"
                defaultValue={addon.id}
                name="id"

              />
              <AddonCard addon={addon} />
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
