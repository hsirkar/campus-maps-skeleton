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

const RootContext = React.createContext();
export const useRoot = () => React.useContext(RootContext);

export default function Root() {
    const { pathname } = useLocation();

    const [context, setContext] = React.useState();
    const [hovered, setHovered] = React.useState();
    const [sidebarExpanded, setSidebarExpanded] = React.useState(true);

    // Save context
    React.useEffect(() => {
        if (!pathname.includes('/p')) setContext(pathname);
    }, [pathname]);

    // Automatically expand/collapse sidebar
    React.useEffect(() => {
        if (pathname.includes('/home')) setSidebarExpanded(true);
        if (pathname.includes('/p') && context?.includes('/home'))
            setSidebarExpanded(false);
        if (pathname.includes('/explore')) setSidebarExpanded(true);
    }, [pathname, context]);

    // Determine what to render in side bar
    const sidebarContent = React.useMemo(() => {
        if (pathname.includes('/home')) return <Home />;
        if (pathname.includes('/explore')) return <Search />;
        if (context?.includes('/home')) return <Home />;
        if (context?.includes('/explore')) return <Search />;
        return <Home />;
    }, [pathname, context]);

    return (
        <RootContext.Provider
            value={{
                context,
                hovered,
                setHovered,
                sidebarExpanded,
                setSidebarExpanded,
            }}>
            <AppBar />
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    height: 'calc(100vh - 49px)',
                }}>
                <NavRail />
                {context && <Sidebar>{sidebarContent}</Sidebar>}
                <Map />
                <Outlet />
            </Box>
        </RootContext.Provider>
    );
}
