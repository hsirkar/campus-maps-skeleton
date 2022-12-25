import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    ListItemButton,
    ListItemIcon,
    Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
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
import { Stack } from '@mui/system';

// See https://mui.com/material-ui/react-list/#AlignItemsList.js
function PostList({ posts, selectedPost, setSelectedPost }) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {posts.map((p, i) => (
                <React.Fragment key={i}>
                    <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                        <ListItemButton
                            sx={{ px: 3, py: 1 }}
                            onClick={() => setSelectedPost(i)}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={p.user}
                                    src="/static/images/avatar/1.jpg"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={p.title}
                                secondary={p.desc}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
}

// See https://mui.com/material-ui/react-card/#RecipeReviewCard.js
function PostDetails({ posts, selectedPost, setSelectedPost }) {
    const post = posts[selectedPost];
    const [building, setBuilding] = React.useState(
        'Getting nearest location...'
    );

    // Reverse geocode - https://nominatim.org/release-docs/latest/api/Overview/
    React.useEffect(() => {
        fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${post.loc._lat}&lon=${post.loc._long}&format=json`
        )
            .then(res => res.json())
            .then(res => setBuilding(res.display_name.split(',')[0]));
    }, [post]);

    return (
        <React.Fragment>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton
                        aria-label="settings"
                        onClick={() => setSelectedPost(-1)}>
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
                        <ListItemIcon sx={{ minWidth: 0, pr: 2 }}>
                            <InfoOutlined color="primary" fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText primary={post.desc} />
                    </ListItem>

                    <ListItem sx={{ px: 1.25, py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 0, pr: 2 }}>
                            <Place color="primary" fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText primary={building} />
                    </ListItem>

                    <ListItem sx={{ px: 1.25, py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 0, pr: 2 }}>
                            <CalendarToday color="primary" fontSize="medium" />
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
        </React.Fragment>
    );
}

export default function SideBar(props) {
    return (
        <Card
            elevation={1}
            sx={{
                width: props.selectedPost === -1 ? '400px' : '600px',
                position: 'relative',
            }}>
            {props.selectedPost === -1 ? (
                <PostList {...props} />
            ) : (
                <PostDetails {...props} />
            )}
        </Card>
    );
}
