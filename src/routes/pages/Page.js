import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Outlet } from 'react-router';

import Copyright from '../../common/Copyright';

export default function Page() {
    return (
        <React.Fragment>
            <AppBar position="static" color="transparent" elevation={1}>
                <Toolbar sx={{ verticalAlign: 'baseline' }}>
                    <Typography
                        variant="h3"
                        component="div"
                        color="primary"
                        ml={10}>
                        campus-maps
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container
                component="main"
                sx={{ width: '80%', pb: 6 }}
                maxWidth="lg">
                <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <Outlet />
                    <Copyright />
                </Box>
            </Container>
        </React.Fragment>
    );
}
