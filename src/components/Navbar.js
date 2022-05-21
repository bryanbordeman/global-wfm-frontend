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

const ResponsiveAppBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user } = props
    let navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };

    const logout = () => {
        props.logout()
        navigate('/login')
    }

    return (
        <div>
            {user ? (
        <AppBar position="static" color='darkBlue' style={{marginBottom: '0px'}} >
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
                    <MenuItem onClick={handleCloseNavMenu} component={Link} to='/'>
                        <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} component={Link} to='/worksegments'>
                        <Typography textAlign="center">Timesheets</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} component={Link} to='/schedule'>
                        <Typography textAlign="center">Schedule</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} component={Link} to='/projects'>
                        <Typography textAlign="center">Projects</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} component={Link} to='/announcements'>
                        <Typography textAlign="center">Announcements</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} component={Link} to='/expenses'>
                        <Typography textAlign="center">Expenses</Typography>
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
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        Dashboard
                    </Button>
                    <Button component={Link} to='/worksegments'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        Timesheets
                    </Button>
                    <Button component={Link} to='/schedule'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        Schedule
                    </Button>
                    <Button component={Link} to='/projects'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        Projects
                    </Button>
                    <Button component={Link} to='/announcements'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        Announcements
                    </Button>
                    <Button component={Link} to='/expenses'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                        Expenses
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.toUpperCase()} src="/static/images/avatar/2.jpg" />
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
        </AppBar> ) : (
        <div>

        </div>)}
        </div>
    );
};
export default ResponsiveAppBar;
