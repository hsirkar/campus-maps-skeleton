import React from 'react';

import {
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';
import Scrollbars from 'react-custom-scrollbars';
import {
    Link as ReactRouterLink,
    useLocation,
    useParams,
    useRouteLoaderData,
} from 'react-router-dom';

import TypeChip from '../../../common/Chip';
import PostAvatar from '../../../common/PostAvatar';
import types from '../../../postTypes';
import { useRoot } from '../Root';

dayjs.extend(calendar);
dayjs.extend(relativeTime);

export function PostListItem({ p, isHovered, isSelected, setHovered }) {
    const content = React.useMemo(
        () => (
            <React.Fragment>
                <ListItemAvatar>
                    <PostAvatar p={p} />
                </ListItemAvatar>
                <ListItemText
                    primaryTypographyProps={{
                        fontWeight: 600,
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
                            <Typography>{p.nearestLocation}</Typography>
                        </React.Fragment>
                    }
                />
            </React.Fragment>
        ),
        [p]
    );

    return (
        <React.Fragment>
            <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                <ListItemButton
                    selected={isSelected}
                    alignItems="flex-start"
                    component={ReactRouterLink}
                    to={`/p/${p.id}`}
                    sx={{ px: 3, py: 1 }}
                    className={
                        isHovered ? 'MuiListItemButton-root-hovered' : ''
                    }
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => isHovered && setHovered(null)}>
                    {content}
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    );
}

const MemoizedPostListItem = React.memo(PostListItem);

export default function Search() {
    // Get data from loader
    const { posts } = useRouteLoaderData('root');
    const { id, type, subtype } = useParams();

    const { pathname } = useLocation();

    // Set title
    const title = React.useMemo(() => {
        if (!pathname.includes('/p/')) {
            let temp = type === 'events' ? 'Events' : 'Places';
            if (subtype) {
                temp = types[type].find(e => e.url === subtype).name;
            }
            return temp;
        }
    }, [pathname, subtype, type]);

    const { hovered, setHovered } = useRoot();

    return (
        <Scrollbars
            style={{ width: 350, height: 'calc(100vh - 49px)' }}
            autoHide>
            <Typography variant="h3" m={2} mb={0}>
                {title || 'Search Results'}
            </Typography>

            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    // hover states
                    '& .MuiListItemButton-root:hover, .MuiListItemButton-root-hovered':
                        {
                            bgcolor: 'action.hover',
                        },
                }}>
                {posts.map((p, i) => (
                    <MemoizedPostListItem
                        key={i}
                        p={p}
                        isSelected={p.id === id}
                        isHovered={hovered === p.id}
                        setHovered={setHovered}
                    />
                ))}
            </List>
        </Scrollbars>
    );
}
