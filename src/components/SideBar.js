import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Paper } from '@mui/material';

// See https://mui.com/material-ui/react-list/#AlignItemsList.js
function PostsList({ posts }) {
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {posts.map((p, i) => (
                <React.Fragment key={i}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={p.name}
                            secondary={p.lat + ', ' + p.lng}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
}

export default function SideBar({ posts }) {
    return (
        <Paper elevation={1} sx={{ width: '400px', position: 'relative' }}>
            <PostsList posts={posts} />
        </Paper>
    );
}
