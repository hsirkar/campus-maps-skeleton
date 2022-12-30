import React from 'react';

import {
    Event,
    Favorite,
    HomeRounded,
    PlaceOutlined,
    Search,
} from '@mui/icons-material';
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
} from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

import postTypes from '../../postTypes';

const { events, places } = postTypes;

export const drawerItems = [
    {
        text: 'Home',
        to: '/',
        icon: <HomeRounded sx={{ color: 'text.secondary' }} />,
    },
    {
        text: 'Search',
        to: '/search',
        icon: <Search sx={{ color: 'text.secondary' }} />,
    },
    {
        text: 'Liked',
        to: '/liked',
        icon: <Favorite sx={{ color: 'text.secondary' }} />,
    },
    {
        text: 'Events',
        to: '/explore/events',
        icon: <Event sx={{ color: 'text.secondary' }} />,
    },
    ...events.map(e => ({
        text: e.name,
        to: '/explore/events/' + e.url,
        icon: <e.icon sx={{ color: 'text.secondary' }} />,
        indent: true,
    })),
    {
        text: 'Places',
        to: '/explore/places',
        icon: <PlaceOutlined sx={{ color: 'text.secondary' }} />,
    },
    ...places.map(p => ({
        text: p.name,
        to: '/explore/places/' + p.url,
        icon: <p.icon sx={{ color: 'text.secondary' }} />,
        indent: true,
    })),
];

const dividers = [2, 3 + events.length];

function DrawerListItem({ item, selected }) {
    return (
        <ListItem dense disablePadding>
            <ListItemButton
                sx={{ ml: item.indent ? 2 : 0 }}
                selected={selected}
                component={ReactRouterLink}
                to={item.to}
                dense>
                <ListItemAvatar sx={{ minWidth: 0, pr: 1.25 }}>
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
                        fontWeight: selected ? 600 : 'inherit',
                        color: selected ? 'inherit' : 'inherit',
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
}

const MemoizedDrawerListItem = React.memo(DrawerListItem);

function Drawer() {
    const { pathname, state } = useLocation();

    function isSelected(item) {
        return pathname === item.to || state?.context === item.to;
    }

    return (
        <Paper
            elevation={1}
            sx={{
                position: 'relative',
                flexBasis: 230,
                flexGrow: 0,
                flexShrink: 0,
                fontSize: '0.95em',
            }}>
            <Scrollbars style={{ height: 'calc(100vh - 49px)' }} autoHide>
                <List sx={{ width: '100%' }}>
                    {drawerItems.map((item, i) => (
                        <React.Fragment key={i}>
                            <MemoizedDrawerListItem
                                item={item}
                                selected={isSelected(item)}
                            />
                            {dividers.includes(i) && <Divider sx={{ my: 1 }} />}
                        </React.Fragment>
                    ))}
                </List>
            </Scrollbars>
        </Paper>
    );
}

export default React.memo(Drawer);
