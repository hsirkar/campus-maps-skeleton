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

dayjs.extend(calendar);
dayjs.extend(relativeTime);

export function PostListItem({
    p,
    isHovered,
    isSelected,
    setHovered,
    linkState,
}) {
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
                            <Typography>{p.nearest_location}</Typography>
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
                    state={linkState}
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

export default function Search({ hovered, setHovered }) {
    // Get data from above loader
    const { posts } = useRouteLoaderData('root');
    const { id, type, subtype } = useParams();

    // Save context
    const [context, setContext] = React.useState();
    const [title, setTitle] = React.useState();

    const { pathname } = useLocation();

    React.useEffect(() => {
        if (!pathname.includes('/p/')) {
            setContext(pathname);

            let temp = type === 'events' ? 'Events' : 'Places';
            if (subtype) {
                temp = types[type].find(e => e.url === subtype).name;
            }

            setTitle(temp);
        }
    }, [pathname, subtype, type]);

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
                            bgcolor: '#ebf8ff',
                        },
                }}>
                {posts.map((p, i) => (
                    <MemoizedPostListItem
                        key={i}
                        p={p}
                        isSelected={p.id === id}
                        isHovered={hovered === p.id}
                        setHovered={setHovered}
                        linkState={{ context }}
                    />
                ))}
            </List>
        </Scrollbars>
    );
}
