import React from 'react';

import { Box, darken, useTheme } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';

import types from '../postTypes';
import Popup from '../routes/root/Popup';

const subtypes = types.events.concat(types.places);

function Pin({
    post,
    selected = false,
    highlighted = false,
    onMouseOver = () => {},
    ...rest
}) {
    const icon = subtypes.find(item => item.url === post.subtype[0]).icon;

    const theme = useTheme();
    const palette = post.type === 'places' ? blue : green;

    let background;
    let border;

    if (theme.palette.mode === 'light') {
        if (selected) {
            background = grey[800];
            border = darken(grey[900], 0.1);
        } else if (highlighted) {
            background = grey[600];
            border = darken(grey[900], 0.1);
        } else {
            background = palette[500];
            border = darken(palette[900], 0.1);
        }
    } else {
        if (selected) {
            background = grey[700];
            border = darken(grey[900], 0.1);
        } else if (highlighted) {
            background = grey[500];
            border = darken(grey[900], 0.1);
        } else {
            background = palette[900];
            border = darken(palette[900], 0.6);
        }
    }

    const memoizedIcon = React.useMemo(
        () =>
            React.createElement(icon, {
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
            }),
        [icon]
    );

    return (
        <Box
            sx={{
                position: 'relative',
                m: 1,
                zIndex: theme =>
                    highlighted
                        ? theme.zIndex.highlightedPin
                        : theme.zIndex.pin,
                transform: selected ? 'scale(1.2)' : 'none',
            }}
            {...rest}>
            <Box
                sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50% 50% 50% 0',
                    background: background,
                    transform: 'rotate(-45deg)',
                    boxShadow: 1,
                    color: 'white',
                    borderWidth: 0.1,
                    borderStyle: 'solid',
                    borderColor: border,
                }}
                onMouseOver={onMouseOver}
            />
            {memoizedIcon}
            {highlighted && <Popup p={post} />}
        </Box>
    );
}

export default React.memo(Pin);
