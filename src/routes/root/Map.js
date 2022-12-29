import * as React from 'react';
import { Box } from '@mui/system';

export default function Map({ posts }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                bgcolor: 'grey.200',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage:
                    'url("https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-76.9426,38.9869,16,0.00,0.00/1000x800?access_token=pk.eyJ1IjoicmFrcmlzaCIsImEiOiJjamptczYxOGMzc3dzM3BvbDB0andscXdwIn0.GY-HcAV_MakM6gwzSS17Fg")',
            }}>
            {/* <Typography color="text.secondary" fontSize="2em">
                Map goes here
            </Typography> */}
            {/* <Pin /> */}
        </Box>
    );
}
