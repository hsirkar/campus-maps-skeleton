import { Chip, darken } from '@mui/material';
import { green, blue } from '@mui/material/colors';
import React from 'react';

import types from '../postTypes';
const subtypes = types.events.concat(types.places);

export default function TypeChip({ type, subtype, variant = 'light' }) {
    const icon = subtypes.find(item => item.name === subtype).icon;
    const background = variant === 'light' ? 50 : 500;
    return (
        <Chip
            sx={{
                mt: 0.5,
                mb: 0.5,
                fontWeight: 500,
                bgcolor:
                    type === 'places' ? blue[background] : green[background],
                '&:not(:first-child)': { ml: 0.25 },
                color:
                    variant === 'light'
                        ? type === 'places'
                            ? darken(blue[500], 0.3)
                            : darken(green[500], 0.3)
                        : 'white',
            }}
            size="small"
            label={subtype}
            icon={React.createElement(icon, { color: 'inherit' })}
            // avatar={
            //     <Avatar
            //         src={
            //             parse(
            //                 subtypes.find(item => item.name === subtype).emoji
            //             )[0].url
            //         }></Avatar>
            // }
        />
    );
}
