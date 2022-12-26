import { Typography, Link } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

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
                <Link target="_blank" color="inherit" href="/help">
                    Help & Feedback
                </Link>
                <Link target="_blank" color="inherit" href="/policies/privacy">
                    Privacy
                </Link>
                <Link target="_blank" color="inherit" href="/policies/terms">
                    Terms
                </Link>
            </Stack>
        </Typography>
    );
}
