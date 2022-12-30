import React from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import Auth from './routes/auth/Auth';
import Login from './routes/auth/Login';
import Logout from './routes/auth/Logout';
import Register from './routes/auth/Register';
import Reset from './routes/auth/Reset';
import Verify from './routes/auth/Verify';
import Help from './routes/pages/Help';
import Page from './routes/pages/Page';
import Privacy from './routes/pages/policies/Privacy';
import Terms from './routes/pages/policies/Terms';
import PostDetail, {
    loader as postDetailLoader,
} from './routes/root/PostDetail';
import Root, { loader as rootLoader } from './routes/root/Root';
import theme from './theme';

const router = createBrowserRouter(
    createRoutesFromElements(
        <React.Fragment>
            <Route id="root" loader={rootLoader} path="*" element={<Root />}>
                <Route
                    path="explore/:type/:subtype?"
                    element={<React.Fragment />}
                />
                <Route
                    id="p"
                    loader={postDetailLoader}
                    path="p/:id"
                    element={<PostDetail />}
                />
            </Route>
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
