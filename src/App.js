import React from 'react';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme.js';

import AppBar from './components/AppBar';
import SideBar from './components/SideBar';
import Main from './components/Main';

const firebaseConfig = {
    apiKey: 'AIzaSyBNYzyZz9QTpTZpTWBYyA9YZVpKddYN5zs',
    authDomain: 'campus-maps-53c7c.firebaseapp.com',
    databaseURL: 'https://campus-maps-53c7c-default-rtdb.firebaseio.com',
    projectId: 'campus-maps-53c7c',
    storageBucket: 'campus-maps-53c7c.appspot.com',
    messagingSenderId: '591540730553',
    appId: '1:591540730553:web:ca62a4bcf1d987ed753968',
    measurementId: 'G-X0QNYZD797',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
    const [posts, setPosts] = React.useState([
        {
            lat: 100,
            lng: 100,
            name: 'New York City',
        },
        {
            lat: 100,
            lng: 100,
            name: 'Columbia',
        },
    ]);

    // React.useEffect(() => {
    //     const fetchPosts = async () => {
    //         const col = collection(db, 'umd');
    //         const snapshot = await getDocs(col);
    //         const events = snapshot.docs.map(doc => doc.data());
    //         return events;
    //     }

    //     fetchPosts().then(res => console.log(res));
    // }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar />
            <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 49px)' }}>
                <SideBar posts={posts} />
                <Main posts={posts} />
            </Box>
        </ThemeProvider>
    );
}

export default App;
