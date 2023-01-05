import React from 'react';

import { Button, Grid, Link, Typography } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Reset() {
    const [email, setEmail] = React.useState('');

    return (
        <ValidatorForm
            onSubmit={e => {
                e.preventDefault();
                console.log({ email });
            }}
            style={{ marginTop: 4 * 8, width: '100%' }}>
            <Typography variant="h4" mb={1}>
                Forgot password
            </Typography>
            <Typography variant="body2">
                Enter your email below. If the email is valid, we'll send you a
                link to reset your password.
            </Typography>
            <TextValidator
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                validators={['required', 'isEmail']}
                errorMessages={[
                    'This field is required',
                    'Please enter a proper email address',
                ]}
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
        </ValidatorForm>
    );
}
