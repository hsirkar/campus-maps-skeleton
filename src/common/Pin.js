import { Avatar, Box, darken } from '@mui/material';
import { green, blue } from '@mui/material/colors';
import React from 'react';
import { parse } from 'twemoji-parser';

import types from '../postTypes';
const subtypes = types.events.concat(types.places);

export default function Pin({ post, variant = 'dark' }) {
    const icon = subtypes.find(item => item.url === post.subtype[0]).icon;
    const background = variant === 'light' ? 50 : 500;
    return (
        <Box
            sx={{
                position: 'fixed',
                right: 200,
                bottom: 200,
            }}>
            <Box
                sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50% 50% 50% 0',
                    background:
                        post.type === 'places'
                            ? blue[background]
                            : green[background],
                    transform: 'rotate(-45deg)',
                    boxShadow: 1,
                    color: variant === 'light' ? 'text.primary' : 'white',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor:
                        variant === 'light'
                            ? 'white'
                            : post.type === 'places'
                            ? darken(blue[900], 0.1)
                            : darken(green[900], 0.1),
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
                    color: variant === 'light' ? 'text.primary' : 'white',
                },
            })}
        </Box>
    );
}

export function Pin2({ post }) {
    return (
        <Box
            sx={{
                position: 'fixed',
                right: 200,
                bottom: 200,
                width: '30px',
                height: '30px',
                borderRadius: '50% 50% 50% 0',
                background: 'white',
                transform: 'rotate(-45deg) scale(1.2)',
                m: 5,
                boxShadow: 1,
                '&:after': {
                    content: '""',
                    width: 26,
                    height: 26,
                    transform: 'rotate(-45deg)',
                    margin: '2px 0 0 2px', // (30 - width)/2
                    bgcolor: post.type === 'places' ? blue[50] : green[50],
                    borderRadius: '50%',
                    position: 'absolute',
                    boxShadow: 1,
                    border:
                        '1.5px solid ' +
                        (post.type === 'places' ? blue[300] : green[300]),
                },
            }}>
            <Avatar
                style={{
                    position: 'absolute',
                    width: 18,
                    height: 18,
                    margin: '6px 0 0 6px', // (30 - width)/2
                    transform: 'rotate(45deg)',
                    zIndex: 4,
                }}
                src={
                    parse(
                        subtypes.find(item => item.name === post.subtype[0])
                            .emoji
                    )[0].url
                }
            />
        </Box>
    );
}
