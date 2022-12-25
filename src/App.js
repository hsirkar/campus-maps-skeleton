import React from 'react';

import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme.js';

import Main from './components/Map';
import Auth from './components/Auth';

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
// const auth = getAuth(app);

function App() {
    const [signedIn, setSignedIn] = React.useState(false);
    const [posts, setPosts] = React.useState([]);
    const [selectedPost, setSelectedPost] = React.useState(-1);

    async function fetchPosts() {
        const col = collection(db, 'umd');
        const snapshot = await getDocs(col);
        const posts = snapshot.docs.map(doc => doc.data());
        setPosts(posts);
        console.log(posts);
    }

    React.useEffect(() => {
        fetchPosts().then(res => console.log(res));
    }, []);

    const props = {
        signedIn,
        setSignedIn,
        posts,
        setPosts,
        selectedPost,
        setSelectedPost,
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {signedIn ? <Main {...props} /> : <Auth {...props} />}
        </ThemeProvider>
    );
}

export default App;
