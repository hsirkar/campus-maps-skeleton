import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Outlet } from 'react-router';
import Copyright from '../../common/Copyright';

export default function Auth() {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography variant="h3" component="div" color="primary" mb={4}>
                    campus-maps
                </Typography>
                <Outlet />
                <Copyright />
            </Box>
        </Container>
    );
}
