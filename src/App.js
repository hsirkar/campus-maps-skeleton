import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import theme from './theme.js';
import Main from './components/Main';
import { SignIn, SignUp } from './components/Auth';

// See https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
    },
    {
        path: '/login',
        element: <SignIn />,
    },
    {
        path: '/register',
        element: <SignUp />,
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
