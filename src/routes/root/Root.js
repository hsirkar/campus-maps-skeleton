import React from 'react';

import { Box } from '@mui/material';
import {
    collection,
    getDocs,
    limit,
    query,
    where,
} from 'firebase/firestore/lite';
import { Outlet, useLocation } from 'react-router-dom';

import { db } from '../../firebase';
import AppBar from './AppBar';
import Map from './Map';
import NavRail from './NavRail';
import Home from './sidebar/Home';
import Search from './sidebar/Search';
import Sidebar from './sidebar/Sidebar';

export let cachedLoaderData = { posts: [] };

async function loadHome() {
    const col = collection(db, 'posts');
    const q = query(col, limit(100));
    const res = await getDocs(q);
    const posts = res.docs.map(doc => doc.data());
    return { posts };
}

async function loadFollowing() {
    return { posts: [] };
}

async function loadSaved() {
    return { posts: [] };
}

async function loadExplore({ params }) {
    const col = collection(db, 'posts');
    let q;
    if (params.subtype) {
        q = query(col, where('subtype', 'array-contains', params.subtype));
    } else if (params.type) {
        q = query(col, where('type', '==', params.type));
    }

    const res = await getDocs(q);
    const posts = res.docs.map(doc => doc.data());
    return { posts };
}

export async function loader({ request, params }) {
    if (request.url.includes('/home'))
        cachedLoaderData = loadHome({ request, params });

    if (request.url.includes('/following'))
        cachedLoaderData = loadFollowing({ request, params });

    if (request.url.includes('/saved'))
        cachedLoaderData = loadSaved({ request, params });

    if (request.url.includes('/explore'))
        cachedLoaderData = loadExplore({ request, params });

    return cachedLoaderData;
}

export default function Root() {
    const { pathname, state } = useLocation();

    const [hovered, setHovered] = React.useState();

    // Determine if sidebar is expanded
    const [sidebarOpen, setSidebarOpen] = React.useState(
        !!state?.context || pathname.includes('/home')
    );

    // Auto close sidebar if we came from home
    React.useEffect(() => {
        if (state?.context.includes('/home')) setSidebarOpen(false);
    }, [state]);

    // Auto open sidebar if we're at home
    React.useEffect(() => {
        if (pathname.includes('/home')) setSidebarOpen(true);
    }, [pathname]);

    // Determine what to render in sidebar
    let sidebarContent = <React.Fragment />;
    if (pathname.includes('/home') || state?.context?.includes('/home'))
        sidebarContent = <Home setSidebarOpen={setSidebarOpen} />;
    else
        sidebarContent = (
            <Search
                hovered={hovered}
                setHovered={setHovered}
                setSidebarOpen={setSidebarOpen}
            />
        );

    return (
        <React.Fragment>
            <AppBar />
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    height: 'calc(100vh - 49px)',
                }}>
                <NavRail />
                <Sidebar
                    hovered={hovered}
                    setHovered={setHovered}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}>
                    {sidebarContent}
                </Sidebar>
                <Map
                    hovered={hovered}
                    setHovered={setHovered}
                    sidebarOpen={sidebarOpen}
                />
                <Outlet />
            </Box>
        </React.Fragment>
    );
}
