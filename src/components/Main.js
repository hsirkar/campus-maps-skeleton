import * as React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function Main({ posts }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                bgcolor: 'grey.200',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Typography color="text.secondary" fontSize="2em">
                Map goes here
            </Typography>
        </Box>
    );
}
