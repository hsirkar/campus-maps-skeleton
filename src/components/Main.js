import { Box } from '@mui/system';
import React from 'react';
import AppBar from './AppBar';
// import SideBar from './SideBar';
import Map from './Map';
// import { db } from '../firebase';
// import { collection, getDocs } from 'firebase/firestore/lite';
import { Outlet } from 'react-router-dom';
import { Card } from '@mui/material';

export default function Main() {
    return (
        <React.Fragment>
            <AppBar />
            <Box
                sx={{
                    display: 'flex',
                    minHeight: 'calc(100vh - 49px)',
                }}>
                <Card
                    elevation={1}
                    sx={{
                        width: '400px',
                        position: 'relative',
                    }}>
                    <Outlet />
                </Card>

                <Map />
            </Box>
        </React.Fragment>
    );
}
