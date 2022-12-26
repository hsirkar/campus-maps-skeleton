import { Typography, Link } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function Copyright(props) {
    return (
        <Typography
            component="div"
            variant="body2"
            color="text.secondary"
            align="center"
            mt={6}
            pb={2}
            {...props}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {' campus-maps'}
            <Stack direction="row" spacing={2} justifyContent="center">
                <Link color="inherit" component={ReactRouterLink} to="help">
                    Help & Feedback
                </Link>
                <Link
                    color="inherit"
                    component={ReactRouterLink}
                    to="/policies/privacy">
                    Privacy
                </Link>
                <Link
                    color="inherit"
                    component={ReactRouterLink}
                    to="/policies/terms">
                    Terms
                </Link>
            </Stack>
        </Typography>
    );
}
