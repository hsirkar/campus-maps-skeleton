import React from 'react';

import { Box } from '@mui/material';
import {
    collection,
    getDocs,
    limit,
    query,
    where,
} from 'firebase/firestore/lite';
import {
    Outlet,
    useLoaderData,
    useLocation,
    useParams,
} from 'react-router-dom';

import { db } from '../../firebase';
import AppBar from './AppBar';
import Map from './Map';
import NavRail from './NavRail';
import Home from './sidebar/Home';
import Search from './sidebar/Search';
import Sidebar from './sidebar/Sidebar';

export let cachedLoaderData = { posts: [] };

async function loadHome() {
    const col = collection(db, 'sample');
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
    const col = collection(db, 'sample');
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
    const params = useParams();
    const { pathname, state } = useLocation();
    const { posts } = useLoaderData();

    const [hovered, setHovered] = React.useState();
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    let showSidebar = true;
    if (params.id) {
        showSidebar =
            (state?.context?.includes('explore') ||
                state?.context?.includes('search')) &&
            posts.length;
    }

    let sidebarContent = <React.Fragment />;
    if (pathname.includes('/home')) sidebarContent = <Home />;
    else sidebarContent = <Search hovered={hovered} setHovered={setHovered} />;

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
                        setSidebarOpen={setSidebarOpen}>
                        {sidebarContent}
                    </Sidebar>
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
