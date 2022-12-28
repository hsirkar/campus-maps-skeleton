import React from 'react';
import {
    Outlet,
    Route,
    Routes,
    useLoaderData,
    useLocation,
    useMatch,
} from 'react-router-dom';
import { Box } from '@mui/material';

import AppBar from './AppBar';
import Drawer from './Drawer';
import Map from './Map';
import PostList, { loader as postListLoader } from './PostList';
import PostDetail, { loader as postDetailLoader } from './PostDetail';

function MatchPath({ path, Comp }) {
    let match = useMatch(path);
    return match ? <Comp {...match} /> : null;
}

export async function loader() {
    // TODO: fetch post types to populate drawer
    return { asdf: 'asdf' };
}

export default function Root() {
    const location = useLocation();
    const { state } = location;

    return (
        <React.Fragment>
            <AppBar />
            <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 49px)' }}>
                <Drawer />
                <Routes>
                    <Route
                        loader={postListLoader}
                        path="explore/:type?/:subtype?"
                        element={<PostList />}
                    />
                    <Route
                        loader={postDetailLoader}
                        path="p/:id"
                        element={<PostDetail />}
                    />
                </Routes>
                {/* <Outlet /> */}
                <Map />
            </Box>
        </React.Fragment>
    );
}

// export default function Root() {
//     const location = useLocation();
//     const { state } = location;

//     return (
//         <React.Fragment>
//             <AppBar />
//             <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 49px)' }}>
//                 <Drawer />
//                 <Routes location={state?.backgroundLocation || location}>
//                     <Route
//                         loader={postListLoader}
//                         path="/explore/:type?/:subtype?"
//                         element={<PostList />}
//                     />
//                     <Route
//                         loader={postDetailLoader}
//                         path="/p/:id"
//                         element={<PostDetail />}
//                     />
//                 </Routes>
//                 {/* Show post details also when `backgroundLocation` is set */}
//                 {state?.backgroundLocation && (
//                     <Routes>
//                         <Route
//                             loader={postDetailLoader}
//                             path="/p/:id"
//                             element={<PostDetail />}
//                         />
//                     </Routes>
//                 )}
//                 <Map />
//             </Box>
//         </React.Fragment>
//     );
// }
