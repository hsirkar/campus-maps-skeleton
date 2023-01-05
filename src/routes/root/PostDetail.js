import React from 'react';

import {
    Close,
    CommentOutlined,
    EventRepeat,
    FavoriteBorderOutlined,
    InfoOutlined,
    Person,
    Place,
    Schedule,
    Share,
} from '@mui/icons-material';
import {
    Avatar,
    Button,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';
import { doc, getDoc } from 'firebase/firestore/lite';
import Scrollbars from 'react-custom-scrollbars';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

import TypeChip from '../../common/Chip';
import PostAvatar from '../../common/PostAvatar';
import { db } from '../../firebase';
import { cachedLoaderData } from './Root';

export async function loader({ params }) {
    const cachedPost = cachedLoaderData?.posts?.find(p => p.id === params.id);

    if (cachedPost) return { post: cachedPost };

    const res = await getDoc(doc(db, 'posts', params.id));
    const post = res.data();
    return { post };
}

const height = 'calc(100vh - 49px - 50px)';

function PostDetail() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { post } = useLoaderData();

    return (
        <Paper
            elevation={1}
            sx={{
                position: 'absolute',
                width: 475,
                height: height,
                zIndex: 10,
                borderRadius: 5,
                right: theme => theme.spacing(2),
                top: theme => theme.spacing(2),
            }}>
            <Scrollbars style={{ height: height }} autoHide>
                <CardHeader
                    avatar={<PostAvatar p={post} />}
                    action={
                        <IconButton
                            onClick={() => navigate(state?.context || '/home')}
                            aria-label="settings">
                            <Close />
                        </IconButton>
                    }
                    title={post.title}
                    subheader={`${post.user} • ${dayjs
                        .unix(post.eventTime.seconds)
                        .fromNow()}`}
                    titleTypographyProps={{
                        variant: 'h3',
                        sx: { mb: 0.5 },
                    }}
                />

                <CardContent sx={{ pt: 0 }}>
                    {post.subtype.map((s, i) => (
                        <TypeChip type={post.type} subtype={s} key={i} />
                    ))}
                    <Divider sx={{ mt: 1 }} />
                    <Stack direction="row" spacing="1" mb={1} mt={1}>
                        <Button
                            sx={{ width: 90, color: 'text.secondary' }}
                            variant="text"
                            startIcon={<FavoriteBorderOutlined />}>
                            100
                        </Button>
                        <Button
                            sx={{ width: 90, color: 'text.secondary' }}
                            variant="text"
                            startIcon={<CommentOutlined />}>
                            55
                        </Button>
                        <Button
                            sx={{ width: 90, color: 'text.secondary' }}
                            variant="text"
                            startIcon={<Share />}>
                            Share
                        </Button>
                    </Stack>

                    <Divider />

                    <List mt={1.5}>
                        <ListItem sx={{ px: 1.25, py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 0, pr: 1.5 }}>
                                <InfoOutlined
                                    color="primary"
                                    fontSize="medium"
                                />
                            </ListItemIcon>
                            <ListItemText primary={post.desc} />
                        </ListItem>

                        <ListItem sx={{ px: 1.25, py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 0, pr: 1.5 }}>
                                <Place color="primary" fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText primary={post.nearestLocation} />
                        </ListItem>

                        <ListItem sx={{ px: 1.25, py: 0.2 }}>
                            <ListItemIcon sx={{ minWidth: 0, pr: 1.5 }}>
                                <Schedule color="primary" fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText
                                primary={dayjs
                                    .unix(post.eventTime.seconds)
                                    .format('dddd, MMMM D, YYYY [at] h:mm A')}
                            />
                        </ListItem>

                        <ListItem sx={{ px: 1.25, py: 0.2 }}>
                            <ListItemIcon sx={{ minWidth: 0, pr: 1.5 }}>
                                <EventRepeat
                                    color="primary"
                                    fontSize="medium"
                                />
                            </ListItemIcon>
                            <ListItemText primary="One-time event" />
                        </ListItem>
                    </List>

                    <Divider />

                    <Typography variant="h3" mt={3}>
                        Comments
                    </Typography>

                    <List>
                        {post.comments.map((comment, i) => (
                            <ListItem key={i} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={comment.content}
                                    secondary="Anonymous User"
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Scrollbars>
        </Paper>
    );
}

export default React.memo(PostDetail);
