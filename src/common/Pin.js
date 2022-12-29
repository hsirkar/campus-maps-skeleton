import React from 'react';

import { Box, darken } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';

import types from '../postTypes';

const subtypes = types.events.concat(types.places);

export default function Pin({
    post,
    selected = false,
    highlighted = false,
    ...rest
}) {
    const icon = subtypes.find(item => item.url === post.subtype[0]).icon;

    let background;
    let border;

    if (selected) {
        background = grey[800];
        border = darken(grey[900], 0.1);
    } else if (highlighted) {
        background = grey[600];
        border = darken(grey[900], 0.1);
    } else {
        if (post.type === 'places') {
            background = blue[500];
            border = darken(blue[900], 0.1);
        } else {
            background = green[500];
            border = darken(green[900], 0.1);
        }
    }

    return (
        <Box
            sx={{
                position: 'relative',
                m: 1,
            }}
            {...rest}>
            <Box
                sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50% 50% 50% 0',
                    background: background,
                    transform: 'rotate(-45deg)',
                    boxShadow: 1,
                    color: 'white',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: border,
                }}
            />
            {React.createElement(icon, {
                sx: {
                    fontSize: '1.4em',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    margin: 'auto',
                    color: 'white',
                },
            })}
        </Box>
    );
}
