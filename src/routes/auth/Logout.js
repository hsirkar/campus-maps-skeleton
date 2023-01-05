import React from 'react';

import { Box, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { Navigate, useSearchParams } from 'react-router-dom';

import { auth } from '../../firebase';

export default function Logout() {
    React.useEffect(() => {
        signOut(auth);
    }, []);

    const [searchParams] = useSearchParams();

    return (
        <Box>
            <Typography>Signing out...</Typography>
            <Navigate to={searchParams.get('redirect') || '/login'} />
        </Box>
    );
}
