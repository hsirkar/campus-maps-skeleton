import {
    Avatar,
    Checkbox,
    Divider,
    FormControl,
    Grid,
    Input,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
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

const placeTypes = [
    'Bathrooms',
    'Cool Places',
    'Date Spots',
    'Hangout Spots',
    'Outdoor & Nature',
    'Parking',
    'Restaurants & Cafes',
    'Shops',
    'Study Spots',
];

const eventTypes = [
    'Campus Traditions',
    'Career Fairs & Workshops',
    'Club Events',
    'Meetups',
    'Nightlife',
    'House Parties',
    'Performances',
    'Pickup Games',
    'School Sports',
    'Volunteering',
    'University Events',
];

const types = eventTypes.concat(placeTypes);

const FilterSelect = styled(Select)(({ theme }) => ({
    borderRadius: 2,
    fontSize: '0.85em',
    fontWeight: 600,
    color: theme.palette.primary.main,
    '.MuiSvgIcon-root ': {
        color: theme.palette.primary.main,
    },
}));

export default function PostList() {
    // Get data from root's loader
    const { posts } = useRouteLoaderData('root');

    const [selectedType, setSelectedType] = React.useState([0, 1]);
    const handleTypeChange = event => {
        const {
            target: { value },
        } = event;
        setSelectedType(typeof value === 'string' ? value.split(',') : value);
    };

    const [sortBy, setSortBy] = React.useState(0);
    const handleSortChange = event => {
        setSortBy(event.target.value);
    };

    return (
        <Box sx={{ width: 500 }}>
            <Grid container sx={{ px: 2.5, pt: 2, pb: 0.5 }} spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h4">What's Nearby</Typography>
                </Grid>

                <Grid item xs={8}>
                    <FormControl
                        sx={{ width: '100%', overflow: 'hidden' }}
                        size="small">
                        <FilterSelect
                            MenuProps={{ elevation: 1, fontSize: '0.85em' }}
                            label="Everything"
                            value={selectedType}
                            onChange={handleTypeChange}
                            multiple
                            displayEmpty
                            renderValue={selected => {
                                if (selected.length === 0)
                                    return 'Nothing selected';

                                if (selected.length < 4)
                                    return selected
                                        .map(s => types[s])
                                        .join(', ');
                                else
                                    return (
                                        selected
                                            .slice(0, 2)
                                            .map(s => types[s])
                                            .join(', ') +
                                        ', +' +
                                        (selected.length - 2) +
                                        ' more'
                                    );
                            }}
                            input={<Input disableUnderline />}>
                            <ListSubheader>Events</ListSubheader>

                            {eventTypes.map((type, i) => (
                                <MenuItem key={i} value={i}>
                                    <Checkbox
                                        sx={{ py: 0, pl: 0, ml: 0 }}
                                        checked={selectedType.indexOf(i) > -1}
                                    />
                                    <ListItemText primary={type} />
                                </MenuItem>
                            ))}

                            <ListSubheader>Locations</ListSubheader>

                            {placeTypes.map((type, i) => (
                                <MenuItem
                                    key={i + eventTypes.length}
                                    value={i + eventTypes.length}>
                                    <Checkbox
                                        sx={{ py: 0, pl: 0, ml: 0 }}
                                        checked={
                                            selectedType.indexOf(
                                                i + eventTypes.length
                                            ) > -1
                                        }
                                    />
                                    <ListItemText primary={type} />
                                </MenuItem>
                            ))}
                        </FilterSelect>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl
                        sx={{ width: '100%', overflow: 'hidden' }}
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
                </Grid>
            </Grid>

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
                                <Typography>right side</Typography>
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
