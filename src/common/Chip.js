import React from 'react';

import { Chip, darken } from '@mui/material';
import { blue, green } from '@mui/material/colors';

import types from '../postTypes';

const subtypes = types.events.concat(types.places);

function TypeChip({ type, subtype, variant = 'light' }) {
    const { name, icon } = subtypes.find(item => item.url === subtype);
    const background = variant === 'light' ? 50 : 500;
    return (
        <Chip
            sx={{
                mt: 0.5,
                mb: 0.5,
                fontWeight: 500,
                bgcolor:
                    type === 'places' ? blue[background] : green[background],
                '&:not(:first-of-type)': { ml: 0.25 },
                color:
                    variant === 'light'
                        ? type === 'places'
                            ? darken(blue[500], 0.3)
                            : darken(green[500], 0.3)
                        : 'white',
            }}
            size="small"
            label={name}
            icon={React.createElement(icon, { color: 'inherit' })}
        />
    );
}

export default React.memo(TypeChip);
