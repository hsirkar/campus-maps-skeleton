import React from 'react';

import {
    Alert,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    MenuItem,
    Typography,
} from '@mui/material';
import {
    SelectValidator,
    TextValidator,
    ValidatorForm,
} from 'react-material-ui-form-validator';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

import { register } from '../../firebase';

export default function Register() {
    const [username, setUsername] = React.useState('');
    const [isStudent, setIsStudent] = React.useState(false);
    const [campus, setCampus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState();

    React.useEffect(() => {
        ValidatorForm.addValidationRule(
            'isSchoolEmail',
            value =>
                value.endsWith('@terpmail.umd.edu') ||
                value.endsWith('@umd.edu')
        );
        return () => {
            ValidatorForm.removeValidationRule('isSchoolEmail');
        };
    }, []);

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        register({ email, password, username, isStudent, campus })
            .then(() => navigate('/login?register_success=1'))
            .catch(err => {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        setError(
                            'An account with that email address already exists, please try a different email.'
                        );
                        break;
                    default:
                        setError(err?.message || 'Unknown error.');
                        break;
                }

                console.error(err);
            });
    };

    return (
        <ValidatorForm
            onSubmit={handleSubmit}
            style={{ marginTop: 4 * 8, width: '100%' }}>
            <Typography variant="h4" mb={0.5}>
                Sign up
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextValidator
                autoComplete="username"
                errorMessages={['This field is required']}
                fullWidth
                id="username"
                label="Username"
                margin="normal"
                name="username"
                onChange={e => setUsername(e.target.value)}
                validators={['required']}
                value={username}
            />

            <SelectValidator
                fullWidth
                margin="normal"
                validators={['required']}
                errorMessages={['This field is required']}
                id="institution"
                value={campus}
                label="Select institution"
                onChange={e => {
                    e.preventDefault();
                    setCampus(e.target.value);
                }}>
                <MenuItem value="umd">
                    University of Maryland, College Park
                </MenuItem>
                <MenuItem value="others" disabled>
                    Others coming soon!
                </MenuItem>
            </SelectValidator>

            {campus && (
                <FormControlLabel
                    sx={{ mt: 1 }}
                    control={
                        <Checkbox
                            checked={isStudent}
                            onChange={e => {
                                e.preventDefault();
                                setIsStudent(e.target.checked);
                            }}
                            color="primary"
                        />
                    }
                    label="I am a student enrolled at this institution"
                />
            )}

            {isStudent && (
                <Typography variant="body2" color="text.secondary" mb={1}>
                    We'll use your school email only to verify your student
                    status. It will not be shared or visible to anyone.
                </Typography>
            )}

            <TextValidator
                autoComplete="email"
                errorMessages={[
                    'This field is required',
                    isStudent
                        ? 'Please enter a proper school email address'
                        : 'Please enter a proper email address',
                ]}
                fullWidth
                id="email"
                label={isStudent ? 'School email' : 'Email'}
                margin="normal"
                name="email"
                onChange={e => setEmail(e.target.value)}
                validators={[
                    'required',
                    isStudent ? 'isSchoolEmail' : 'isEmail',
                ]}
                value={email}
            />

            <TextValidator
                autoComplete="password"
                errorMessages={['This field is required']}
                fullWidth
                type="password"
                id="password"
                label="Password"
                margin="normal"
                name="password"
                onChange={e => setPassword(e.target.value)}
                validators={['required']}
                value={password}
            />

            <Typography variant="body2" color="text.secondary" mt={1} mb={1}>
                By signing up, you agree with our{' '}
                <Link target="_blank" href="/policies/privacy" color="inherit">
                    Privacy Policy
                </Link>{' '}
                and{' '}
                <Link target="_blank" href="/policies/terms" color="inherit">
                    Terms of Service
                </Link>
                .
            </Typography>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}>
                Continue
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link
                        to="/login"
                        component={ReactRouterLink}
                        variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </ValidatorForm>
    );
}
