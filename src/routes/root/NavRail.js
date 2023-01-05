import React from 'react';

import {
    Favorite,
    FavoriteBorder,
    Help,
    HelpOutline,
    HomeOutlined,
    HomeRounded,
    People,
    PeopleOutlined,
    Settings,
    SettingsOutlined,
} from '@mui/icons-material';
import { List, ListItemButton, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';
import Scrollbars from 'react-custom-scrollbars';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { useRoot } from './Root';

dayjs.extend(calendar);
dayjs.extend(relativeTime);

const railItems = [
    {
        text: 'Home',
        to: '/home',
        icon: HomeOutlined,
        selectedIcon: HomeRounded,
    },
    {
        text: 'Following',
        to: '/following',
        icon: PeopleOutlined,
        selectedIcon: People,
    },
    {
        text: 'Liked',
        to: '/liked',
        icon: FavoriteBorder,
        selectedIcon: Favorite,
    },
    {
        text: 'Settings',
        to: '/settings',
        icon: SettingsOutlined,
        selectedIcon: Settings,
    },
    {
        text: 'Help & Feedback',
        to: '/help-feedback',
        icon: HelpOutline,
        selectedIcon: Help,
    },
];

function ListItem({ item, selected }) {
    return (
        <ListItemButton
            component={Link}
            to={item.to}
            selected={selected}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                py: 2,
                color: selected ? 'text.primary' : 'text.secondary',
            }}>
            {selected
                ? React.createElement(item.selectedIcon)
                : React.createElement(item.icon)}
            <Typography
                lineHeight="1.2"
                mt={0.75}
                textAlign="center"
                fontSize="0.85em"
                fontWeight={500}>
                {item.text}
            </Typography>
        </ListItemButton>
    );
}

const MemoizedListItem = React.memo(ListItem);

export default function NavRail() {
    const { pathname } = useLocation();
    const { context } = useRoot();

    function isSelected(item) {
        return pathname === item.to || context === item.to;
    }

    return (
        <React.Fragment>
            <Paper
                elevation={1}
                sx={{
                    position: 'relative',
                    width: 75,
                    fontSize: '0.95em',
                    zIndex: theme => theme.zIndex.navRail,
                    height: 'calc(100vh - 49px)',
                }}>
                <Scrollbars style={{ height: 'calc(100vh - 49px)' }} autoHide>
                    <List
                        sx={{
                            width: '100%',
                            height: '100%',
                            bgcolor: 'background.paper',
                            '& .MuiListItemButton-root:hover, .MuiListItemButton-root-hovered':
                                {
                                    bgcolor: 'action.hover',
                                },
                        }}>
                        {railItems.map(item => (
                            <MemoizedListItem
                                key={item.text}
                                item={item}
                                selected={isSelected(item)}
                            />
                        ))}
                    </List>
                </Scrollbars>
            </Paper>
        </React.Fragment>
    );
}
