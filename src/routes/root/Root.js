import React from 'react';
// import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
// import { collection, getDocs } from '@firebase/firestore/lite';

// import { db } from '../../firebase';

import AppBar from './AppBar';
import Map from './Map';
import AppDrawer from './Drawer';

export async function loader() {
    // const res = await getDocs(collection(db, 'umd'));
    // const posts = res.docs.map(doc => doc.data());

    // for (let post of posts) {
    //     post['nearest_location'] = (
    //         await (
    //             await fetch(
    //                 `https://nominatim.openstreetmap.org/reverse?lat=${post.loc._lat}&lon=${post.loc._long}&format=json`
    //             )
    //         ).json()
    //     ).display_name.split(',')[0];
    // }
    // return { posts };
    return {};
}

export default function Root() {
    return (
        <React.Fragment>
            <AppBar />
            <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 49px)' }}>
                <AppDrawer />
                <Map />
            </Box>
        </React.Fragment>
    );
}
