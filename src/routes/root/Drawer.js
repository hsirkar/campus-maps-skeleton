import React from 'react';
import {
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
} from '@mui/material';
import {
    Edit,
    Event,
    FavoriteOutlined,
    HomeRounded,
    Place,
    Search,
} from '@mui/icons-material';
import Scrollbars from 'react-custom-scrollbars';
import Twemoji from 'react-twemoji';

import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

import postTypes from '../../postTypes.json';

const { events, places } = postTypes;

const drawerItems = [
    {
        text: 'Home',
        to: '/',
        icon: <HomeRounded color="primary" />,
    },
    {
        text: 'Search',
        to: '/search',
        icon: <Search color="primary" />,
    },
    {
        text: 'Liked',
        to: '/liked',
        icon: <FavoriteOutlined color="primary" />,
    },
    {
        text: 'Events',
        to: '/explore/events',
        icon: <Place color="primary" />,
    },
    ...events.map(e => ({
        text: e.name,
        to: '/explore/' + e.url,
        icon: <Twemoji children={e.emoji} />,
        indent: true,
    })),
    {
        text: 'Places',
        to: '/explore/places',
        icon: <Event color="primary" />,
    },
    ...places.map(p => ({
        text: p.name,
        to: '/explore/' + p.url,
        icon: <Twemoji children={p.emoji} />,
        indent: true,
    })),
];

const dividers = [2, 3 + events.length];

export default function Drawer() {
    const { pathname, state } = useLocation();

    function isSelected(item) {
        return pathname === item.to || state?.context === item.to;
    }

    return (
        <Paper
            elevation={1}
            sx={{ position: 'relative', width: 230, fontSize: '0.95em' }}>
            <Scrollbars style={{ height: 'calc(100vh - 49px)' }} autoHide>
                <List sx={{ width: '100%' }}>
                    {drawerItems.map((item, i) => (
                        <React.Fragment>
                            <ListItem
                                key={i}
                                dense
                                disablePadding
                                secondaryAction={
                                    i === 0 && (
                                        <IconButton
                                            edge="end"
                                            color="text.secondary"
                                            size="small">
                                            <Edit fontSize="small" />
                                        </IconButton>
                                    )
                                }>
                                <ListItemButton
                                    sx={{ ml: item.indent ? 2 : 0 }}
                                    selected={isSelected(item)}
                                    component={ReactRouterLink}
                                    to={item.to}
                                    dense>
                                    <ListItemAvatar
                                        sx={{ minWidth: 0, pr: 1.25 }}>
                                        <Avatar
                                            sx={{
                                                width: '1.5em',
                                                height: '1.5em',
                                                background: 'transparent',
                                            }}>
                                            {item.icon}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: isSelected(item)
                                                ? 600
                                                : 'inherit',
                                            color: isSelected(item)
                                                ? 'primary'
                                                : 'inherit',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                            {dividers.includes(i) && <Divider sx={{ my: 1 }} />}
                        </React.Fragment>
                    ))}
                </List>
            </Scrollbars>
        </Paper>
    );
}
