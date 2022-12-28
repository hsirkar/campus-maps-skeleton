import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import AppBar from './AppBar';
import Drawer from './Drawer';
import Map from './Map';
import PostList from './PostList';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';

export async function loader() {
    // Fetch posts from Cloud Firestore
    const res = await getDocs(collection(db, 'umd'));
    const posts = res.docs.map(doc => doc.data());
    return { posts };
}

export default function Root() {
    const { pathname, state } = useLocation();
    const showPostList = !pathname.includes('/p/') || state?.hasContext;

    return (
        <React.Fragment>
            <AppBar />
            <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 49px)' }}>
                <Drawer />
                {showPostList && <PostList />}
                <Outlet />
                <Map />
            </Box>
        </React.Fragment>
    );
}
