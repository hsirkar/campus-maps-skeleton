import { Box } from '@mui/system';
import React from 'react';
import AppBar from './AppBar';
import SideBar from './SideBar';
import Map from './Map';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore/lite';

export default function Main() {
    const [posts, setPosts] = React.useState([]);
    const [selectedPost, setSelectedPost] = React.useState(null);

    async function fetchPosts() {
        const res = await getDocs(collection(db, 'umd'));
        const posts = res.docs.map(doc => doc.data());
        setPosts(posts);
        console.log(posts);
    }
    React.useEffect(() => {
        fetchPosts();
    }, []);

    const props = { posts, selectedPost, setSelectedPost };
    return (
        <React.Fragment>
            <AppBar />
            <Box
                sx={{
                    display: 'flex',
                    minHeight: 'calc(100vh - 49px)',
                }}>
                <SideBar {...props} />
                <Map {...props} />
            </Box>
        </React.Fragment>
    );
}
