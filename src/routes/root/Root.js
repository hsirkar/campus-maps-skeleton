import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import { collection, getDocs } from '@firebase/firestore/lite';

import { db } from '../../firebase';

import AppBar from './AppBar';
import Map from './Map';
import Copyright from '../../common/Copyright';

export async function loader() {
    const res = await getDocs(collection(db, 'umd'));
    const posts = res.docs.map(doc => doc.data());
    return { posts };
}

export default function Root() {
    return (
        <React.Fragment>
            <AppBar />
            <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 49px)' }}>
                <Card sx={{ position: 'relative' }} elevation={1}>
                    <Outlet />
                    <Copyright />
                </Card>
                <Map />
            </Box>
        </React.Fragment>
    );
}
