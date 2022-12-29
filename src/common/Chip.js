import { Avatar, Chip } from '@mui/material';
import React from 'react';
import { parse } from 'twemoji-parser';

import types from '../postTypes.json';
const subtypes = types.events.concat(types.places);

export default function TypeChip({ subtype }) {
    return (
        <Chip
            sx={{
                mt: 0.5,
                mb: 0.5,
                fontWeight: 600,
            }}
            size="small"
            label={subtype}
            avatar={
                <Avatar
                    src={
                        parse(
                            subtypes.find(item => item.name === subtype).emoji
                        )[0].url
                    }></Avatar>
            }
        />
    );
}
