import React from 'react';

import { Box, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { signout } from '../../firebase';

export default function Logout() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        signout();
        navigate(searchParams.get('redirect') || '/home');
    });

    return (
        <Box>
            <Typography>Signing out...</Typography>
        </Box>
    );
}
