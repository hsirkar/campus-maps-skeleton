import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Stack } from '@mui/system';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {' campus-maps'}
            <Stack direction="row" spacing={2} justifyContent="center">
                <Link color="inherit" href="https://mui.com/">
                    Help & Feedback
                </Link>
                <Link color="inherit" href="https://mui.com/">
                    Privacy
                </Link>
                <Link color="inherit" href="https://mui.com/">
                    Terms
                </Link>
            </Stack>
        </Typography>
    );
}

// https://github.com/mui/material-ui/blob/v5.11.0/docs/data/material/getting-started/templates/sign-up/SignUp.js
export function SignUp() {
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
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography variant="h3" component="div" color="primary">
                    campus-maps
                </Typography>

                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 4 }}>
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
                                By signing up, you agree with our Privacy Policy
                                and Terms of Service (see below).
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
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

// https://github.com/mui/material-ui/blob/v5.11.0/docs/data/material/getting-started/templates/sign-in/SignIn.js
export function SignIn() {
    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography variant="h3" component="div" color="primary">
                    campus-maps
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 4 }}>
                    <Typography variant="h4">Sign in</Typography>

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
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                to="/register"
                                component={ReactRouterLink}
                                variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
