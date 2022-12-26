import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useRouteLoaderData, Link as ReactRouterLink } from 'react-router-dom';

export default function PostList() {
    // Get data from root's loader
    const { posts } = useRouteLoaderData('root');

    return (
        <Box sx={{ width: 400 }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {posts.map((p, i) => (
                    <React.Fragment key={i}>
                        <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                            <ListItemButton
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
                                    primary={p.title}
                                    secondary={p.desc}
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
