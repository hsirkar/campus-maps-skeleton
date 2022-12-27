import {
    Avatar,
    Divider,
    FormControl,
    Input,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    styled,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import React from 'react';
import { useRouteLoaderData, Link as ReactRouterLink } from 'react-router-dom';

var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

const FilterSelect = styled(Select)(({ theme }) => ({
    borderRadius: 2,
    fontSize: '0.9em',
    fontWeight: 600,
    color: theme.palette.primary.main,
    '.MuiSvgIcon-root ': {
        color: theme.palette.primary.main,
    },
}));

export default function PostList() {
    // Get data from root's loader
    const { posts } = useRouteLoaderData('root');

    const [sortBy, setSortBy] = React.useState(0);
    const handleSortChange = event => {
        setSortBy(event.target.value);
    };

    return (
        <Box sx={{ width: 400 }}>
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
                    '& .MuiListItemButton-root:hover': {
                        bgcolor: '#ebf8ff',
                    },
                }}>
                {posts.map((p, i) => (
                    <React.Fragment key={i}>
                        <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                            <ListItemButton
                                alignItems="flex-start"
                                component={ReactRouterLink}
                                to={`/posts/${p.id}`}
                                sx={{ px: 3, py: 1 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={p.user}
                                        src="/static/images/avatar/1.jpg"
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primaryTypographyProps={{ fontWeight: 600 }}
                                    primary={p.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{
                                                    display: 'inline-block',
                                                    fontSize: '0.85em',
                                                    textTransform: 'uppercase',
                                                    color: 'text.secondary',
                                                    fontWeight: 500,
                                                    borderRadius: 2,
                                                    background: '#EBEBEB',
                                                    px: 0.5,
                                                    my: 0.5,
                                                }}>
                                                Event
                                            </Typography>
                                            <Typography>
                                                {p.nearest_location}
                                            </Typography>
                                            <Typography>
                                                {dayjs().calendar(
                                                    dayjs.unix(
                                                        p.eventTime.seconds
                                                    )
                                                )}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                {/* <Typography>right side</Typography> */}
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
