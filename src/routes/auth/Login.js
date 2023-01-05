import React from 'react';

import {
    Alert,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Typography,
} from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {
    Link as ReactRouterLink,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';

import { auth, login } from '../../firebase';

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(true);
    const [error, setError] = React.useState();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (auth.currentUser) {
            navigate(searchParams.get('redirect') || '/home');
        }
    }, [navigate, searchParams]);

    const handleSubmit = e => {
        e.preventDefault();

        login({ email, password, remember })
            .then(() => navigate(searchParams.get('redirect') || '/home'))
            .catch(err => {
                switch (err.code) {
                    case 'auth/user-not-found':
                        setError(
                            "That account doesn't exist, try a different email or create a new account."
                        );
                        break;
                    case 'auth/wrong-password':
                        setError(
                            'The username/password combination is invalid, please try again.'
                        );
                        break;
                    default:
                        setError(err?.message || 'Unknown error.');
                        break;
                }
                setPassword('');
                console.error(err);
            });
    };

    return (
        <ValidatorForm
            onSubmit={handleSubmit}
            style={{ marginTop: 4 * 8, width: '100%' }}>
            <Typography variant="h4" mb={0.5}>
                Sign in
            </Typography>
            {!error && searchParams.get('register_success') && (
                <Alert severity="info">
                    Your registration was successful, please sign in below with
                    your new account.
                </Alert>
            )}
            {error && <Alert severity="error">{error}</Alert>}
            <TextValidator
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                validators={['required', 'isEmail']}
                errorMessages={[
                    'This field is required',
                    'Please enter a proper email address',
                ]}
                value={email}
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
