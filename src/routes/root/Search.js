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
import {
    Link as ReactRouterLink,
    useLocation,
    useParams,
    useRouteLoaderData,
} from 'react-router-dom';

import TypeChip from '../../common/Chip';
import PostAvatar from '../../common/PostAvatar';

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
                            <Typography>
                                {dayjs
                                    .unix(p.eventTime.seconds)
                                    .calendar(null, {
                                        sameElse: 'M/D/YY [at] h:mm A',
                                    })}
                            </Typography>
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
    const { id } = useParams();

    // Save context
    const [context, setContext] = React.useState();
    const { pathname } = useLocation();

    React.useEffect(() => {
        if (!pathname.includes('/p/')) setContext(pathname);
    }, [pathname]);

    return (
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
    );
}
