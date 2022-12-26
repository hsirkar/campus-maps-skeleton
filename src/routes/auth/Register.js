import {
    Button,
    FormControl,
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
    const [school, setSchool] = React.useState('');
    const handleChange = event => {
        setSchool(event.target.value);
    };
    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">Sign up</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Institution
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={school}
                            label="Select institution"
                            onChange={handleChange}>
                            <MenuItem value="umd">
                                University of Maryland, College Park
                            </MenuItem>
                            {/* <MenuItem value="umbc">University of Maryland, Baltimore County</MenuItem>
                                    <MenuItem value="jhu">Johns Hopkins University</MenuItem>
                                    <MenuItem value="towson">Towson University</MenuItem> */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                        By signing up, you agree with our Privacy Policy and
                        Terms of Service (see below).
                    </Typography>
                </Grid>
            </Grid>
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
