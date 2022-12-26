import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import theme from './theme';

import Auth from './routes/auth/Auth';
import Verify from './routes/auth/Verify';
import Reset from './routes/auth/Reset';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';

import Page from './routes/pages/Page';
import Help from './routes/pages/Help';
import Privacy from './routes/pages/policies/Privacy';
import Terms from './routes/pages/policies/Terms';

import Root from './routes/root/Root';
import PostList from './routes/root/PostList';
import PostDetail from './routes/root/PostDetail';

// See https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <PostList />,
            },
            {
                path: '/posts/:id',
                element: <PostDetail />,
            },
        ],
    },
    {
        element: <Auth />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'password-reset',
                element: <Reset />,
            },
            {
                path: 'verify',
                element: <Verify />,
            },
        ],
    },
    {
        element: <Page />,
        children: [
            {
                path: 'help',
                element: <Help />,
            },
            {
                path: 'policies/privacy',
                element: <Privacy />,
            },
            {
                path: 'policies/terms',
                element: <Terms />,
            },
        ],
    },
]);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
