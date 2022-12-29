import React from 'react';

import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Reset() {
    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
            <Typography variant="h4" mb={1}>
                Forgot password
            </Typography>
            <Typography variant="body2">
                Enter your email below. If the email is valid, we'll send you a
                link to reset your password.
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Send Reset Link
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link
                        component={ReactRouterLink}
                        to="/login"
                        variant="body2">
                        Back to login
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}
