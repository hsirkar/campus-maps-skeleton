import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Register() {
    const [isStudent, setIsStudent] = React.useState(false);
    const [school, setSchool] = React.useState(null);
    const handleChange = event => {
        event.preventDefault();
        setSchool(event.target.value);
    };
    const handleCheckboxChange = event => {
        event.preventDefault();
        setIsStudent(event.target.checked);
    };
    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('firstName') + ' ' + data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            institution: school,
        });
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Typography variant="h4" mb={0.5}>
                Sign up
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
            />
            <FormControl margin="normal" fullWidth required>
                <InputLabel id="campus-label">Campus</InputLabel>
                <Select
                    labelId="institution"
                    id="institution"
                    value={school}
                    label="Select institution"
                    onChange={handleChange}
                    MenuProps={{ elevation: 1 }}>
                    <MenuItem value="umd">
                        University of Maryland, College Park
                    </MenuItem>
                    <MenuItem value="others" disabled>
                        Others coming soon!
                    </MenuItem>
                </Select>
            </FormControl>
            {school && (
                <FormControlLabel
                    sx={{ mt: 1 }}
                    control={
                        <Checkbox
                            required
                            value={isStudent}
                            onChange={handleCheckboxChange}
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
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={isStudent ? 'School email' : 'Email'}
                name="email"
                autoComplete="email"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
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
        </Box>
    );
}
