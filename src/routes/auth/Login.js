import React from 'react';

import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Typography,
} from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(true);

    return (
        <ValidatorForm
            onSubmit={e => {
                e.preventDefault();
                console.log({ username, password, remember });
            }}
            style={{ marginTop: 4 * 8, width: '100%' }}>
            <Typography variant="h4" mb={0.5}>
                Sign in
            </Typography>
            <TextValidator
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                validators={['required']}
                errorMessages={['This field is required']}
                value={username}
            />
            <TextValidator
                margin="normal"
                fullWidth
                name="password"
                onChange={e => setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                validators={['required']}
                errorMessages={['This field is required']}
                value={password}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={remember}
                        onChange={e => {
                            e.preventDefault();
                            setRemember(e.target.checked);
                        }}
                        color="primary"
                    />
                }
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
        </ValidatorForm>
    );
}
