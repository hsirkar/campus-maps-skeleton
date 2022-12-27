import React from 'react';
import {
    Avatar,
    Divider,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
} from '@mui/material';
import {
    Event,
    FavoriteOutlined,
    HomeRounded,
    Place,
    Search,
} from '@mui/icons-material';
import Scrollbars from 'react-custom-scrollbars';
import Twemoji from 'react-twemoji';

const metaTypes = {
    Home: <HomeRounded color="primary" />,
    Search: <Search color="primary" />,
    Liked: <FavoriteOutlined color="primary" />,
};

const placeTypes = {
    Places: <Place color="primary" />,
    Bathrooms: <Twemoji children="🚽" />,
    'Cool Places': <Twemoji children="🛕" />,
    'Date Spots': <Twemoji children="👫" />,
    'Hangout Spots': <Twemoji children="🍻" />,
    'Outdoor & Nature': <Twemoji children="🌴" />,
    Parking: <Twemoji children="🅿️" />,
    'Restaurants & Cafes': <Twemoji children="🍽️" />,
    Shops: <Twemoji children="🛍️" />,
    'Study Spots': <Twemoji children="👩‍💻" />,
};

const eventTypes = {
    Events: <Event color="primary" />,
    'Campus Traditions': <Twemoji children="🧨" />,
    'Career Events': <Twemoji children="💼" />,
    'Club Events': <Twemoji children="🃏" />,
    Meetups: <Twemoji children="🤝🏽" />,
    Nightlife: <Twemoji children="🌃" />,
    'House Parties': <Twemoji children="🥳" />,
    Performances: <Twemoji children="🎭" />,
    'Pickup Games': <Twemoji children="🏓" />,
    'School Sports': <Twemoji children="🏈" />,
    Volunteering: <Twemoji children="🫶🏾" />,
    'University Events': <Twemoji children="🎓" />,
};

export default function Drawer() {
    return (
        <Paper
            elevation={1}
            sx={{ position: 'relative', width: 240, fontSize: '0.95em' }}>
            <Scrollbars style={{ height: 'calc(100vh - 49px)' }} autoHide>
                <List sx={{ width: '100%' }}>
                    {Object.keys(metaTypes).map((type, i) => (
                        <ListItemButton key={i} dense>
                            <ListItemAvatar sx={{ minWidth: 0, pr: 1.25 }}>
                                <Avatar
                                    sx={{
                                        width: '1.5em',
                                        height: '1.5em',
                                        background: 'transparent',
                                    }}>
                                    {metaTypes[type]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={type} />
                        </ListItemButton>
                    ))}
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    {Object.keys(eventTypes).map((type, i) => (
                        <ListItemButton
                            key={i}
                            dense
                            sx={{ ml: i === 0 ? 0 : 2 }}>
                            <ListItemAvatar sx={{ minWidth: 0, pr: 1.25 }}>
                                <Avatar
                                    sx={{
                                        width: '1.5em',
                                        height: '1.5em',
                                        background: 'transparent',
                                    }}>
                                    {eventTypes[type]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={type} />
                        </ListItemButton>
                    ))}
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    {Object.keys(placeTypes).map((type, i) => (
                        <ListItemButton
                            key={i}
                            dense
                            sx={{ ml: i === 0 ? 0 : 2 }}>
                            <ListItemAvatar sx={{ minWidth: 0, pr: 1.25 }}>
                                <Avatar
                                    sx={{
                                        width: '1.5em',
                                        height: '1.5em',
                                        background: 'transparent',
                                    }}>
                                    {placeTypes[type]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={type} />
                        </ListItemButton>
                    ))}
                </List>
            </Scrollbars>
        </Paper>
    );
}
