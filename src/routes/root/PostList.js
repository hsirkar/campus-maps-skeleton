import React from 'react';

import {
    Divider,
    FormControl,
    Input,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Typography,
    styled,
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

import TypeChip from '../../common/Chip';
import PostAvatar from '../../common/PostAvatar';

dayjs.extend(calendar);
dayjs.extend(relativeTime);

const FilterSelect = styled(Select)(({ theme }) => ({
    borderRadius: 2,
    fontSize: '0.9em',
    fontWeight: 600,
    color: theme.palette.primary.main,
    '.MuiSvgIcon-root ': {
        color: theme.palette.primary.main,
    },
}));

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

export default function PostList({ hovered, setHovered }) {
    // Get data from above loader
    const { posts } = useRouteLoaderData('root');
    const { id } = useParams();

    const [sortBy, setSortBy] = React.useState(0);
    const handleSortChange = event => {
        setSortBy(event.target.value);
    };

    // Save context
    const [context, setContext] = React.useState();
    const { pathname } = useLocation();

    React.useEffect(() => {
        if (!pathname.includes('/p/')) setContext(pathname);
    }, [pathname]);

    return (
        <Paper
            elevation={1}
            sx={{
                position: 'relative',
                flexBasis: 350,
                flexGrow: 0,
                flexShrink: 0,
                fontSize: '0.95em',
            }}>
            <Scrollbars style={{ height: 'calc(100vh - 49px)' }} autoHide>
                <FormControl
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        px: 2.5,
                        pt: 2,
                        pb: 0.5,
                    }}
                    size="small">
                    <FilterSelect
                        MenuProps={{ elevation: 1 }}
                        value={sortBy}
                        onChange={handleSortChange}
                        input={<Input disableUnderline />}>
                        <MenuItem value={0}>By popularity</MenuItem>
                        <MenuItem value={1}>By date</MenuItem>
                    </FilterSelect>
                </FormControl>

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
        </Paper>
    );
}
