import React from 'react';

import { Chip, darken, useTheme } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

import types from '../postTypes';

const subtypes = types.events.concat(types.places);

function TypeChip({ type, subtype }) {
    const { name, icon } = subtypes.find(item => item.url === subtype);

    const palette = type === 'places' ? blue : green;
    const theme = useTheme();

    const navigate = useNavigate();
    return (
        <Chip
            component={ReactRouterLink}
            to={`/explore/${type}/${subtype}`}
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/explore/${type}/${subtype}`);
            }}
            onMouseDown={e => e.stopPropagation()}
            sx={{
                mt: 0.5,
                mb: 0.5,
                fontWeight: 500,
                color:
                    theme.palette.mode === 'light'
                        ? darken(palette[500], 0.3)
                        : 'white',
                bgcolor:
                    theme.palette.mode === 'light' ? palette[50] : palette[900],
                '&:not(:first-of-type)': { ml: 0.25 },
            }}
            size="small"
            label={name}
            icon={React.createElement(icon, { color: 'inherit' })}
        />
    );
}

export default React.memo(TypeChip);
