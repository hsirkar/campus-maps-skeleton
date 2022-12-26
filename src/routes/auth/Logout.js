import React from 'react';
import { Typography, Box } from '@mui/material';
import { Navigate, useSearchParams } from 'react-router-dom';
import { logout } from '../../firebase';

export default function Logout() {
    React.useEffect(() => {
        logout();
    }, []);

    const [searchParams] = useSearchParams();

    return (
        <Box>
            <Typography>Signing out...</Typography>
            <Navigate to={searchParams.get('redirect') || '/login'} />
        </Box>
    );
}
