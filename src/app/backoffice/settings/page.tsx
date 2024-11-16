
import { getCompanyId } from "@/libs/actions"
import { prisma } from "@/libs/prisma";
import { Box, Card, CardContent, Chip, Link, Typography } from "@mui/material"

export default async function SettingsPage(){
  const companyId = await getCompanyId();
  const company = await prisma.company.findFirst({where: {id: companyId}});

    return(
        <>
           <h1>Settings Page</h1>
          <Link  href={`/backoffice/settings/${company?.id}`}
              style={{ textDecoration: "none" }}>
          <Box
              sx={{
                marginRight: 4,
                mb: 4,
                mt: 4 
                }}
            >
              <Card sx={{ maxWidth: 350, borderRadius: 2, overflow: "hidden"}}>
                <CardContent
                  sx={{ p: 2, bgcolor: "background.paper", color: "text.primary" }}
                >
                  <Box
                  height= "100px"
                    display="flex"
                    flexDirection= "column"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Typography variant="body1">Company Nmae - {company?.name}</Typography>
                    <Typography variant="body1">Company Phone Number - {company?.phoneNumber}</Typography>
                    <Typography variant="body1">Company Address - {company?.address}</Typography>
                  </Box>
                  
                </CardContent>
              </Card>
            </Box></Link>
           
        </>
      )
}
