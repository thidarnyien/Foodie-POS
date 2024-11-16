/* import { Box } from "@mui/material";
import { Urbanist } from "next/font/google";
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

const urbanist = Urbanist({ subsets: ["latin"] });

interface props {
  children: ReactNode;
}

export function BackofficeLayout({ children }: props) {
  return (
    <div className={urbanist.className}>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{p:"20px", width:"100vw"}}>
            {children}
        </Box>
      </div>
    </div>
  );
}
 */