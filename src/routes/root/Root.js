import React from 'react';

import { Box } from '@mui/material';
import {
    collection,
    getDocs,
    limit,
    query,
    where,
} from 'firebase/firestore/lite';
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';

import { db } from '../../firebase';
import AppBar from './AppBar';
import Map from './Map';
import NavRail from './NavRail';
import Sidebar from './sidebar/Sidebar';

export let cachedLoaderData = { posts: [] };

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
    const { posts } = useLoaderData();

    const [hovered, setHovered] = React.useState();
    const showSidebar =
        !pathname.includes('/p/') || (state?.context && !!posts.length);

    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    return (
        <React.Fragment>
            <AppBar />
            <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 49px)' }}>
                <NavRail />
                {showSidebar && (
                    <Sidebar
                        hovered={hovered}
                        setHovered={setHovered}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                )}
                <Outlet />
                <Map
                    hovered={hovered}
                    setHovered={setHovered}
                    sidebarOpen={sidebarOpen}
                />
            </Box>
        </React.Fragment>
    );
}
