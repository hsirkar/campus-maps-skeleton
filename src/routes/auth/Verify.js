import React from 'react';

import { Button, Typography } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default function Verify() {
    const [code, setCode] = React.useState('');

    return (
        <ValidatorForm
            onSubmit={e => {
                e.preventDefault();
                console.log({ code });
            }}
            style={{ marginTop: 4 * 8, width: '100%' }}>
            <Typography variant="h4" mb={1}>
                Verify your email
            </Typography>
            <Typography variant="body2">
                We've sent a verification code to your email. Please check your
                inbox and enter the code below:
            </Typography>
            <TextValidator
                margin="normal"
                fullWidth
                id="code"
                label="Code"
                name="code"
                autoComplete="code"
                autoFocus
                value={code}
                onChange={e => setCode(e.target.value)}
                validators={['required']}
                errorMessages={['This field is required']}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Verify
            </Button>
        </ValidatorForm>
    );
}
