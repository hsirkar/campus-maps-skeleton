import { Box } from '@mui/system';
import React from 'react';
import AppBar from './AppBar';
import SideBar from './SideBar';
import Map from './Map';

export default function Main({ props }) {
    return (
        <React.Fragment>
            <AppBar />
            <Box
                sx={{
                    display: 'flex',
                    minHeight: 'calc(100vh - 49px)',
                }}>
                <SideBar {...props} />
                <Map {...props} />
            </Box>
        </React.Fragment>
    );
}
