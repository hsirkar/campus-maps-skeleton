import React, { useState } from 'react';

import { Alert, Box, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { signout } from '../../firebase';

export default function Logout() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState();

    React.useEffect(() => {
        if (!error) {
            signout()
                .then(() => {
                    setTimeout(
                        () => navigate(searchParams.get('redirect') || '/home'),
                        2000
                    );
                })
                .catch(err => setError(err?.message || 'Unknown error.'));
        }
    });

    return (
        <Box>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography>Signing out...</Typography>
        </Box>
    );
}
