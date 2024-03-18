import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ConstructionIcon from '@mui/icons-material/Construction';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import PlaylistAddCheckSharpIcon from '@mui/icons-material/PlaylistAddCheckSharp';
import EngineeringSharpIcon from '@mui/icons-material/EngineeringSharp';
import ArchitectureSharpIcon from '@mui/icons-material/ArchitectureSharp';
import BuildCircleSharpIcon from '@mui/icons-material/BuildCircleSharp';
import SummarizeSharpIcon from '@mui/icons-material/SummarizeSharp';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import { Link } from 'react-router-dom';
import logo from '../assets/GPS_Navbar_Logo_R1.svg'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';

const drawerWidth = '300px';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        }),
    }),
);



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


export default function NavBar(props) {
    const theme = useTheme();
    const { open, setOpen } = props
    const { user, handleChangeMode, darkState, taskRead } = props;

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    let navigate = useNavigate();

    const isEng = user.groups.some(group => group.name === "ENGINEERING");

    const stringToColor = (string) => {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        let color = '#';
        
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
            }
        /* eslint-enable no-bitwise */
        
            return color;
        };

    const stringAvatar = (name) => {
        return {
            sx: {
            bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    const handleCloseUserMenu = () => {
            setAnchorElUser(null);
        };
    
    const logout = () => {
        props.logout()
        navigate('/login')
        setAnchorElUser(null);
        
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar 
                position="fixed" 
                open={open}
                color='darkBlue' 
            >
                <Toolbar>
                    <IconButton
                        style={{ color: 'white' }}
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            display: 'flex',
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center',    
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            height: '100%',      
                        }}
                    >
                        <Link 
                            name='dashboard'
                            component={Link}
                            to="/"
                        >
                        <img
                            style={{
                                width: '6rem',
                                height: 'auto',
                                marginTop: '10px'
                            }}
                            src={logo}
                            alt="GPS Logo"
                        />
                        </Link>
                    </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar
                                            variant="rounded" 
                                            {...stringAvatar(`${user.first_name} ${user.last_name}`)} 
                                        />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            > 
                            <MenuItem 
                                onClick={() => {
                                    handleChangeMode()}} 
                                >
                                <Stack direction={'row'} spacing={1}>
                                <Typography 
                                    textAlign="center"
                                >
                                    Mode
                                </Typography>
                                {darkState? 
                                <LightModeIcon
                                    fontSize={'small'}
                                />
                                :
                                <DarkModeIcon
                                    fontSize={'small'}
                                />
                                }
                                </Stack>
                            </MenuItem>
                            <MenuItem 
                                onClick={handleCloseUserMenu} 
                                component={Link} 
                                to='/profile'
                                >
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem 
                                onClick={handleCloseUserMenu} 
                                component={Link} 
                                to='/settings'
                                >
                                <Typography textAlign="center">Settings</Typography>
                            </MenuItem>
                            <MenuItem 
                                onClick={logout} 
                                >
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                        </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="temporary"
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
            >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItemButton 
                    component={Link} 
                    to='/'
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                    <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <Divider/>
                <List>
                    <ListItemButton 
                        component={Link} 
                        to='/worksegments'
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                        <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Timesheets" />
                    </ListItemButton>
                    <ListItemButton 
                        component={Link} 
                        to='/expenses'
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                        <ReceiptLongSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Expenses" />
                    </ListItemButton>
                    <ListItemButton 
                        component={Link} 
                        to='/task'
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                        <Badge badgeContent={taskRead} color="error">
                            <PlaylistAddCheckSharpIcon />
                        </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Task" />
                    </ListItemButton>
                </List>
                <Divider/>
                <List>
                <ListItemButton 
                    component={Link} 
                    to='/projects'
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                    <ConstructionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to='/reports'
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                    <SummarizeSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItemButton>

                <ListItemButton 
                    component={Link} 
                    to='/announcements'
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                    <AnnouncementIcon />
                    </ListItemIcon>
                    <ListItemText primary="Announcements" />
                </ListItemButton>
            </List>
            </List>
            <Divider />
            <List>
            <ListItemButton 
                    component={Link} 
                    to='/field'
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                    <EngineeringSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Field" />
                </ListItemButton>

                <ListItemButton 
                    component={Link} 
                    to='/shop'
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                    <BuildCircleSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Shop" />
                </ListItemButton>

                {isEng && (
                    <ListItemButton 
                        component={Link} 
                        to='/engineering'
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                            <ArchitectureSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Engineering" />
                    </ListItemButton>
                )}
                <ListItemButton 
                    component={Link} 
                    to='/videos'
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                        <OndemandVideoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Videos" />
                </ListItemButton>
            </List>
        </Drawer>
        <Main open={open} >
            {/* Your main content goes here */}
        </Main>
        </Box>
    );
};
