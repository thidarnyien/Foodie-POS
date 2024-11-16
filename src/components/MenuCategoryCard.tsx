"use client"
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface props{
    title : string | null
    isAvailable: boolean
}

export default function Component({title, isAvailable}:props) {
  return (
    <Card sx={{ width: 160, height: 160, borderRadius: 2, boxShadow: 2 , mr: 3, mb: 3,opacity: isAvailable ? 1 : 0.4,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 5,
          },}}>
      <CardContent>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 2
          }}
        >
          
          <Avatar sx={{ bgcolor: 'primary.main', p: 1.5 , mt: 2 }}>
            <RestaurantIcon sx={{ color: 'primary.contrastText', fontSize: 24 }} />
          </Avatar>
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
