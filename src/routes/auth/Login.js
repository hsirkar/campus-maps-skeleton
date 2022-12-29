import React from 'react';

import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Login() {
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
            <Typography variant="h4" mb={0.5}>
                Sign in
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
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link
                        to="/password-reset"
                        component={ReactRouterLink}
                        variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link
                        to="/register"
                        component={ReactRouterLink}
                        variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}
