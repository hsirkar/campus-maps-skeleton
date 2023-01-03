import * as React from 'react';

import { Close, Search } from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Divider,
    Fade,
    Grid,
    IconButton,
    InputBase,
    LinearProgress,
    List,
    ListItemButton,
    Menu,
    MenuItem,
    Paper,
    Popover,
    Toolbar,
    Typography,
} from '@mui/material';
import { useNavigation } from 'react-router';

import Chip from '../../common/Chip';
import types from '../../postTypes';

export function CustomizedInputBase() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
            <Paper
                component="form"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 600,
                    boxShadow: 0,
                    borderRadius: 2,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    '&:focus-within': { boxShadow: 1 },
                    transition: 'none',
                    boxSizing: 'border-box',
                }}>
                <IconButton type="button" sx={{ pl: 2 }} aria-label="search">
                    <Search />
                </IconButton>
                <InputBase
                    onFocus={e => handlePopoverOpen(e)}
                    onBlur={e => handlePopoverClose(e)}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search University of Maryland"
                />
                <IconButton type="button" sx={{ pl: 2 }} aria-label="search">
                    <Close />
                </IconButton>
            </Paper>
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: -4,
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                disableAutoFocus
                disableEnforceFocus
                sx={{ marginLeft: -0.5 }}
                PaperProps={{ elevation: 1, left: -5 }}>
                <Box sx={{ px: 4, py: 2, width: 600, boxSizing: 'border-box' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h4">Recent</Typography>
                            <List dense>
                                <ListItemButton>
                                    asdfasdfasdfasdf
                                </ListItemButton>
                                <ListItemButton>
                                    asdfasdfasdfasdf
                                </ListItemButton>
                                <ListItemButton>
                                    asdfasdfasdfasdf
                                </ListItemButton>
                                <ListItemButton>
                                    asdfasdfasdfasdf
                                </ListItemButton>
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h4">Trending</Typography>
                            <List dense>
                                <ListItemButton>
                                    asdfasdfasdfasdf
                                </ListItemButton>
                                <ListItemButton>
                                    asdfasdfasdfasdf
                                </ListItemButton>
                                <ListItemButton>
                                    asdfasdfasdfasdf
                                </ListItemButton>
                                <ListItemButton>
                                    asdfasdfasdfasdf
                                </ListItemButton>
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h4" mb={1.5}>
                                Explore Events
                            </Typography>
                            {types.events.map(e => (
                                <Chip type="events" subtype={e.url} />
                            ))}
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h4" mb={1.5}>
                                Explore Places
                            </Typography>
                            {types.places.map(p => (
                                <Chip type="places" subtype={p.url} />
                            ))}
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
        </React.Fragment>
    );
}

// See https://mui.com/material-ui/react-app-bar/#MenuAppBar.js
function MenuAppBar({ open, setOpen }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigation = useNavigation();

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="relative"
            sx={{
                px: 1,
                zIndex: theme => theme.zIndex.drawer + 1,
                bgcolor: 'background.paper',
            }}
            elevation={1}>
            <Fade
                in={navigation.state === 'loading'}
                style={{
                    transitionDelay: '100ms',
                }}
                exit={true}
                unmountOnExit
                mountOnEnter>
                <LinearProgress
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 3,
                        '& .MuiLinearProgress-bar': {
                            animationDuration: '0s',
                        },
                    }}
                    variant="determinate"
                    value={navigation.state === 'loading' ? 65 : 100}
                />
            </Fade>
            <Toolbar variant="dense">
                <Box flex={1}>
                    <Typography
                        variant="h4"
                        component="div"
                        color="primary"
                        sx={{ flexGrow: 1 }}>
                        campus-maps
                    </Typography>
                </Box>
                <Box flex={1}>
                    <CustomizedInputBase />
                </Box>
                <Box
                    flex={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end">
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
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default React.memo(MenuAppBar);
