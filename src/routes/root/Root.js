import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import AppBar from './AppBar';
import Drawer from './Drawer';
import Map from './Map';
import PostList from './PostList';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';

// Loads post list based on params
export async function loader({ params }) {
    // Home page
    if(!params.type && !params.id) {
        console.log("Home page!");
    }

    // Explore
    if(params.type) {
        console.log("Type: " + params.type);
    }

    // Page details
    if(params.id) {
        console.log("Page details");
    }

    // User profile
    if(params.user) {
        console.log("User profile");
    }

    // Fetch posts from Cloud Firestore
    const res = await getDocs(collection(db, 'umd'));
    const posts = res.docs.map(doc => doc.data());
    return { posts };
}

export default function Root() {
    const { pathname, state } = useLocation();
    const showPostList = !pathname.includes('/p/') || state?.context;

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
