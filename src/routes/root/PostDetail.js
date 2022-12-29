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
import { getDoc, doc } from 'firebase/firestore/lite';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {
    useLoaderData,
    useNavigate,
    useLocation,
    useRouteLoaderData,
    useParams,
} from 'react-router-dom';
import TypeChip from '../../common/Chip';
import PostAvatar from '../../common/PostAvatar';
import { db } from '../../firebase';

export async function loader({ params }) {
    let res = await getDoc(doc(db, 'sample', params.id));
    const post = res.data();
    return { post };
}

export default function PostDetail() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const params = useParams();
    const loaderData = useLoaderData();

    const post =
        useRouteLoaderData('root').posts?.find(p => p.id === params.id) ||
        loaderData;

    return (
        <Paper
            elevation={1}
            sx={{ position: 'relative', width: 400, fontSize: '0.95em' }}>
            <Scrollbars style={{ height: 'calc(100vh - 49px)' }} autoHide>
                <CardHeader
                    avatar={<PostAvatar p={post} />}
                    action={
                        <IconButton
                            onClick={() => navigate(state?.context || '/')}
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
                        <ListItem
                            sx={{ px: 1.25, py: 0.25 }}
                            alignItems="flex-start">
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
                            <ListItemText primary={post.nearest_location} />
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
                                    primary={comment}
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
