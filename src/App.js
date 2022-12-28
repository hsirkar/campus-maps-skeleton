import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Routes,
} from 'react-router-dom';

import theme from './theme';

import Auth from './routes/auth/Auth';
import Verify from './routes/auth/Verify';
import Reset from './routes/auth/Reset';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import Logout from './routes/auth/Logout';

import Page from './routes/pages/Page';
import Help from './routes/pages/Help';
import Privacy from './routes/pages/policies/Privacy';
import Terms from './routes/pages/policies/Terms';

import Root, { loader as rootLoader } from './routes/root/Root';
import PostList, { loader as postListLoader } from './routes/root/PostList';
import PostDetail, {
    loader as postDetailLoader,
} from './routes/root/PostDetail';

const router = createBrowserRouter(
    createRoutesFromElements(
        <React.Fragment>
            <Route loader={rootLoader} path="*" element={<Root />}></Route>
            <Route element={<Auth />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/password-reset" element={<Reset />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/logout" element={<Logout />} />
            </Route>
            <Route element={<Page />}>
                <Route path="/help" element={<Help />} />
                <Route path="/policies/privacy" element={<Privacy />} />
                <Route path="/policies/terms" element={<Terms />} />
            </Route>
        </React.Fragment>
    )
);

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}
