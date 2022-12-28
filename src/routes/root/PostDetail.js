import {
    CalendarToday,
    Close,
    CommentOutlined,
    FavoriteBorderOutlined,
    InfoOutlined,
    Person,
    Place,
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
import { red } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import { getDoc, doc } from 'firebase/firestore/lite';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {
    useLoaderData,
    Link as ReactRouterLink,
    useNavigate,
} from 'react-router-dom';
import { db } from '../../firebase';

export async function loader({ params }) {
    let res = await getDoc(doc(db, 'umd', params.postId));
    console.log(res);
    const post = res.data();

    console.log(post);

    res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${post.loc._lat}&lon=${post.loc._long}&format=json`
    );
    const json = await res.json();
    const building = json.display_name.split(',')[0];

    return { post, building };
}

export function PostDetail2() {
    return <div>Post details!</div>;
}

export default function PostDetail() {
    const { post, building } = useLoaderData();
    const navigate = useNavigate();

    return (
        <Paper
            elevation={1}
            sx={{ position: 'relative', width: 400, fontSize: '0.95em' }}>
            <Scrollbars style={{ height: 'calc(100vh - 49px)' }} autoHide>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton
                            onClick={() => navigate(-1)}
                            aria-label="settings">
                            <Close />
                        </IconButton>
                    }
                    title={post.title}
                    subheader={post.user}
                    titleTypographyProps={{
                        variant: 'h3',
                        sx: { mb: 0.5 },
                    }}
                />

                <CardContent sx={{ pt: 0 }}>
                    <Divider />
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
                            <ListItemText primary={building} />
                        </ListItem>

                        <ListItem sx={{ px: 1.25, py: 0.2 }}>
                            <ListItemIcon sx={{ minWidth: 0, pr: 1.5 }}>
                                <CalendarToday
                                    color="primary"
                                    fontSize="medium"
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={new Date(
                                    post.eventTime.seconds * 1000
                                ).toLocaleString('en-US', { timeZone: 'utc' })}
                            />
                        </ListItem>
                    </List>

                    <Divider />

                    <Typography variant="h3" mt={3}>
                        Comments
                    </Typography>

                    <List>
                        {post.comments.map(comment => (
                            <ListItem key={comment} alignItems="flex-start">
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
