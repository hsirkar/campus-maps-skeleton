import React from 'react';

import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';

import TypeChip from '../../common/Chip';
import PostAvatar from '../../common/PostAvatar';

export default function Popup({ p }) {
    return (
        <Paper sx={{ position: 'absolute', width: 350 }}>
            <ListItem>
                <ListItemAvatar>
                    <PostAvatar p={p} />
                </ListItemAvatar>
                <ListItemText
                    primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: '1.3em',
                    }}
                    secondaryTypographyProps={{
                        component: 'div',
                    }}
                    primary={p.title}
                    secondary={
                        <React.Fragment>
                            {p.subtype.map((s, i) => (
                                <TypeChip type={p.type} subtype={s} key={i} />
                            ))}
                            <Typography>{p.nearest_location}</Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </Paper>
    );
}
