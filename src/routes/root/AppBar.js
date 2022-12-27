import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Divider } from '@mui/material';

// See https://mui.com/material-ui/react-app-bar/#MenuAppBar.js
export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="relative"
            color="transparent"
            sx={{ px: 1, borderBottom: '1px solid rgba(0,0,0,0.1)' }}
            elevation={1}>
            <Toolbar variant="dense">
                <Typography
                    variant="h4"
                    component="div"
                    color="primary"
                    sx={{ flexGrow: 1 }}>
                    campus-maps
                </Typography>
                <Box flex={1} />
                <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                    fontSize="0.95em"
                    sx={{ flexGrow: 1 }}>
                    University of Maryland, College Park
                </Typography>
                <Box flex={1} />
                <div>
                    <IconButton
                        size="medium"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit">
                        <Avatar sx={{ width: 32, height: 32 }}>RD</Avatar>
                    </IconButton>
                    <Menu
                        PaperProps={{
                            elevation: 1,
                            sx: {
                                width: 240,
                            },
                        }}
                        MenuListProps={{
                            dense: true,
                        }}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleClose}>Favorites</MenuItem>
                        <MenuItem onClick={handleClose}>
                            Help & Support
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>Sign out</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}