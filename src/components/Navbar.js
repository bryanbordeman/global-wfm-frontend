import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/GPS_Navbar_Logo.svg'

const pathname = window.location.pathname

const Navbar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user } = props
    let navigate = useNavigate();
    const [activeButton, setActiveButton] = React.useState(pathname === '/' ? 'dashboard' : pathname.substring(1));

    const clickedButtonHandler = (e) => {
        const { name } = e.target;
        setActiveButton(name);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        const { name } = e.target;
        setActiveButton(name);
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        setActiveButton('dashboard')
        props.logout()
        navigate('/login')
        setAnchorElUser(null);
        
    }

    const activeStyle = { my: 2, color: '#60BCD9', display: 'block'}
    const inactiveStyle = { my: 2, color: 'white', display: 'block'}

    return (
        <div>
        <AppBar 
            position="fixed" 
            color='darkBlue' 
            sx={{marginBottom: '0px',
                zIndex: (theme) => theme.zIndex.drawer + 1}} >
            <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                <img style={{width: '6rem'}} src={logo} alt="GPS Logo"/>
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    style={{ color: 'white' }}
                    
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                    display: { xs: 'block', md: 'none' },
                    }}
                >
                    <MenuItem name='dashboard' onClick={handleCloseNavMenu} component={Link} to='/'>
                        <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                    <MenuItem name='worksegments' onClick={handleCloseNavMenu} component={Link} to='/worksegments'>
                        <Typography textAlign="center">Timesheets</Typography>
                    </MenuItem>
                    <MenuItem name='schedule' onClick={handleCloseNavMenu} component={Link} to='/schedule'>
                        <Typography textAlign="center">Schedule</Typography>
                    </MenuItem>
                    <MenuItem name='projects' onClick={handleCloseNavMenu} component={Link} to='/projects'>
                        <Typography textAlign="center">Projects</Typography>
                    </MenuItem>
                    <MenuItem name='announcements' onClick={handleCloseNavMenu} component={Link} to='/announcements'>
                        <Typography textAlign="center">Announcements</Typography>
                    </MenuItem>
                    <MenuItem name='expenses' onClick={handleCloseNavMenu} component={Link} to='/expenses'>
                        <Typography textAlign="center">Expenses</Typography>
                    </MenuItem>
                    <MenuItem name='task' onClick={handleCloseNavMenu} component={Link} to='/task'>
                        <Typography textAlign="center">Task</Typography>
                    </MenuItem>
                </Menu>
                </Box>
                <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                <img style={{width: '6rem'}} src={logo} alt="GPS Logo"/>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button component={Link} to='/'
                        name='dashboard'
                        sx={activeButton === 'dashboard' ? activeStyle : inactiveStyle}
                        onClick={clickedButtonHandler}
                    >
                        Dashboard
                    </Button>
                    <Button component={Link} to='/worksegments'
                        name='worksegments'
                        sx={activeButton === 'worksegments' ? activeStyle : inactiveStyle}
                        onClick={clickedButtonHandler}
                        >
                        Timesheets
                    </Button>
                    <Button component={Link} to='/schedule'
                        name='schedule'
                        sx={activeButton === 'schedule' ? activeStyle : inactiveStyle}
                        onClick={clickedButtonHandler}
                        >
                        Schedule
                    </Button>
                    <Button component={Link} to='/projects'
                        name='projects'
                        sx={activeButton === 'projects' ? activeStyle : inactiveStyle}
                        onClick={clickedButtonHandler}
                        >
                        Projects
                    </Button>
                    <Button component={Link} to='/announcements'
                        name='announcements'
                        sx={activeButton === 'announcements' ? activeStyle : inactiveStyle}
                        onClick={clickedButtonHandler}
                        >
                        Announcements
                    </Button>
                    <Button component={Link} to='/expenses'
                        name='expenses'
                        sx={activeButton === 'expenses' ? activeStyle : inactiveStyle}
                        onClick={clickedButtonHandler}
                        >
                        Expenses
                    </Button>
                    <Button component={Link} to='/task'
                        name='task'
                        sx={activeButton === 'task' ? activeStyle : inactiveStyle}
                        onClick={clickedButtonHandler}
                        >
                        Task
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.first_name.toUpperCase()} src="/static/images/avatar/2.jpg" />
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
                    <MenuItem onClick={handleCloseUserMenu} component={Link} to='/profile'>
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
                </Box>
            </Toolbar>
            </Container>
        </AppBar>
        </div>
    );
};
export default Navbar;
