import * as React from 'react';

import { AccountCircleOutlined, Close, Search } from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    Fade,
    IconButton,
    InputBase,
    LinearProgress,
    Menu,
    MenuItem,
    Paper,
    Toolbar,
    Typography,
} from '@mui/material';
import {
    Link as ReactRouterLink,
    useLocation,
    useNavigation,
} from 'react-router-dom';

import { useRoot } from './Root';

export function CustomizedInputBase() {
    return (
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
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search University of Maryland"
            />
            <IconButton type="button" sx={{ pl: 2 }} aria-label="search">
                <Close />
            </IconButton>
        </Paper>
    );
}

// See https://mui.com/material-ui/react-app-bar/#MenuAppBar.js
function MenuAppBar({ open, setOpen }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigation = useNavigation();
    const { pathname } = useLocation();
    const { userInfo } = useRoot();

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
                color: 'text.secondary',
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
                    {userInfo ? (
                        <IconButton
                            size="medium"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit">
                            <Avatar sx={{ width: 32, height: 32 }}>
                                {userInfo.username.charAt(0)}
                            </Avatar>
                        </IconButton>
                    ) : (
                        <Button
                            component={ReactRouterLink}
                            to={'/login?redirect=' + pathname}
                            color="primary"
                            startIcon={<AccountCircleOutlined />}>
                            Sign in
                        </Button>
                    )}
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
                        <MenuItem
                            component={ReactRouterLink}
                            to={'/logout?redirect=' + pathname}>
                            Sign out
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default React.memo(MenuAppBar);
