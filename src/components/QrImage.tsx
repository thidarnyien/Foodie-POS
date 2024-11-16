"use client";

import { Box, Button } from "@mui/material";
import Image from "next/image";

interface Props {
  qrImageUrl: string;
}

export default function QrImage({ qrImageUrl }: Props) {
  const handleQRImagePrint = () => {
    const imageWindow = window.open("");
    imageWindow?.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${qrImageUrl}" onload="window.print();window.close()" /></body></html>`
    );
  };

  return (
    <Box
      sx={{
        mt: 4,
        width: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    
      }}
    >
      <Image style={{marginBottom: "20px"}} src={qrImageUrl} width={150} height={150} alt="qr-image" />
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleQRImagePrint}>
        Print
      </Button>
    </Box>
  );
}
