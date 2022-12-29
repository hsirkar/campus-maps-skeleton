import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import AppBar from './AppBar';
import Drawer from './Drawer';
import Map from './Map';
import PostList from './PostList';
import {
    collection,
    getDocs,
    query,
    where,
    limit,
} from 'firebase/firestore/lite';
import { db } from '../../firebase';

let cachedLoaderData = { posts: [] };

// Loads post list based on params
export async function loader({ request, params }) {
    // Page details - don't load anything
    if (request.url.includes('/p/')) {
        return cachedLoaderData;
    }

    // Create a reference to the sample collection
    const sampleRef = collection(db, 'sample');
    let q;

    // Create a query depending on url params
    // Home page
    if (!params.type && !params.id) {
        q = query(sampleRef, limit(50));
    }

    // Explore
    if (params.subtype) {
        q = query(
            sampleRef,
            where('subtype', 'array-contains', params.subtype)
        );
    } else if (params.type) {
        q = query(sampleRef, where('type', '==', params.type));
    }

    // Execute query
    const res = await getDocs(q);
    const posts = res.docs.map(doc => doc.data());

    // Cache and return
    cachedLoaderData = { posts };
    return { posts };
}

export default function Root() {
    const { pathname, state } = useLocation();
    const showPostList = !pathname.includes('/p/') || !!state?.context;

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
