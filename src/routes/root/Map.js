import * as React from 'react';

import { Box } from '@mui/system';
import { useRouteLoaderData } from 'react-router';

import Pin from '../../common/Pin';

function range(min, max) {
    return Math.random() * (max - min) + min;
}

function irange(min, max) {
    return Math.round(range(min, max));
}

export default function Map() {
    const { posts } = useRouteLoaderData('root');

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                bgcolor: 'grey.200',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: 'url("/mapbox-placeholder.png")',
                overflow: 'hidden',
                position: 'relative',
            }}>
            {posts.map(post => (
                <Pin
                    key={post.id}
                    post={post}
                    sx={{
                        position: 'absolute',
                        bottom: irange(0, 1500),
                        right: irange(0, 1500),
                    }}
                />
            ))}
        </Box>
    );
}
