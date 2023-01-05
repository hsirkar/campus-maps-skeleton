import React from 'react';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    IconButton,
    Link,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Scrollbars from 'react-custom-scrollbars';
import { Link as ReactRouterLink, useRouteLoaderData } from 'react-router-dom';

import Chip from '../../../common/Chip';
import PostAvatar from '../../../common/PostAvatar';
import types from '../../../postTypes';

const eventsPreview = [
    'university-events',
    'parties',
    'performances',
    'school-sports',
    'club',
];
const placesPreview = ['hangout', 'cool', 'restaurants', 'shops', 'study'];

function Slider({ type }) {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        slides: {
            perView: 1.75,
            spacing: 8,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
    });

    const posts = useRouteLoaderData('root').posts;

    return (
        <Box
            ref={sliderRef}
            className="keen-slider"
            sx={{
                '& .slider-arrow': {
                    opacity: 0,
                    transition: 'opacity 0.2s',
                },
                '&:hover .slider-arrow': {
                    opacity: 1,
                },
            }}>
            {(type === 'events' ? eventsPreview : placesPreview).map(e => (
                <Box key={e} className="keen-slider__slide">
                    <Card
                        sx={{ borderRadius: 1, height: 210 }}
                        variant="outlined">
                        <Typography m={1.5} variant="h5">
                            {types[type].find(e1 => e1.url === e).name}
                        </Typography>
                        <Divider />
                        <List dense>
                            {posts
                                .filter(p => p.subtype.includes(e))
                                .slice(0, 2)
                                .map((p, i) => (
                                    <ListItemButton
                                        component={ReactRouterLink}
                                        to={`/p/${p.id}`}
                                        key={i}
                                        dense>
                                        <ListItemAvatar>
                                            <PostAvatar p={p} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontWeight: 600,
                                                style: {
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                },
                                            }}
                                            secondaryTypographyProps={{
                                                component: 'div',
                                            }}
                                            primary={p.title}
                                            secondary={p.nearestLocation}
                                        />
                                    </ListItemButton>
                                ))}
                        </List>
                        <Link
                            m={2}
                            component={ReactRouterLink}
                            to={`/explore/${type}/${e}`}>
                            See all
                        </Link>
                    </Card>
                </Box>
            ))}
            {instanceRef.current && (
                <React.Fragment>
                    <Box
                        className="slider-arrow"
                        sx={{
                            position: 'absolute',
                            bgcolor: 'background.paper',
                            borderRadius: '50%',
                            boxShadow: 1,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            left: 4,
                        }}>
                        <IconButton
                            onClick={e =>
                                e.stopPropagation() ||
                                instanceRef?.current?.prev()
                            }
                            variant="outlined"
                            size="small"
                            disabled={currentSlide === 0}>
                            <ChevronLeft />
                        </IconButton>
                    </Box>
                    <Box
                        className="slider-arrow"
                        sx={{
                            position: 'absolute',
                            bgcolor: 'background.paper',
                            borderRadius: '50%',
                            boxShadow: 1,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            right: 4,
                        }}>
                        <IconButton
                            onClick={e =>
                                e.stopPropagation() ||
                                instanceRef?.current?.next()
                            }
                            variant="outlined"
                            size="small"
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides
                                    .length -
                                    1
                            }>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default function Home() {
    return (
        <Scrollbars
            style={{ width: 535, height: 'calc(100vh - 49px)' }}
            autoHide>
            <CardMedia
                sx={{ height: 200 }}
                image="umd-splash.jpg"
                title="University of Maryland"
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            University of Maryland, College Park
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4">Upcoming Events</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        textAlign="right"
                        fontSize={theme => theme.typography.body2.fontSize}>
                        <Link component={ReactRouterLink} to="/explore/events">
                            See more
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Slider type="events" />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4">Trending</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        textAlign="right"
                        fontSize={theme => theme.typography.body2.fontSize}>
                        <Link component={ReactRouterLink} to="/explore/places">
                            See more
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Slider type="places" />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">All Categories</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" mb={1}>
                            Events
                        </Typography>
                        {types.events.map(e => (
                            <Chip key={e.url} type="events" subtype={e.url} />
                        ))}
                        <Typography variant="h5" mt={2} mb={1}>
                            Places
                        </Typography>
                        {types.places.map(e => (
                            <Chip key={e.url} type="places" subtype={e.url} />
                        ))}
                    </Grid>
                </Grid>
            </CardContent>
        </Scrollbars>
    );
}
