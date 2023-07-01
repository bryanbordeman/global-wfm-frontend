import * as React from 'react';
import { useParams } from "react-router-dom";
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
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Card, Stack, Divider, CardContent } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import qrcode from '../assets/ShieldingSystemsQRCode.png'
const pathname = window.location.pathname


export default function Door(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user, handleChangeMode, darkState } = props
    let navigate = useNavigate();
    const [activeButton, setActiveButton] = React.useState(pathname === '/' ? 'dashboard' : pathname.substring(1));
    const { id } = useParams();

    React.useEffect(()=> {
        console.log(id)
    },[]) 
    
    const clickedButtonHandler = (e) => {
        const { name } = e.target;
        setActiveButton(name);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const login = () => {
        navigate('/login')
        setAnchorElUser(null);
        
    }

    return (
        <div>
        {user.id? '' : 
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
                // name='dashboard'
                // component={Link}
                // to="/"
                // onClick={() => {setActiveButton('dashboard')}}
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
                
                <Typography
                    variant="h5"
                    noWrap
                    name='dashboard'
                    // component={Link}
                    // to="/"
                    // onClick={() => {setActiveButton('dashboard')}}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
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
                {/* <Box sx={{ flexGrow: 0 }}> */}
                <Box sx={{ position: 'absolute', flexGrow: 0, right: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar src="/broken-image.jpg" />
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
                            onClick={login} 
                        >
                            <Typography textAlign="center">Login</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
            </Container>
        </AppBar>
        }
        <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column',
                    height: '100%'
                }}>
        <Box sx={{mt:8}}>
            <Card 
                elevation={0}
                sx={{
                    my: 1,
                    width: '100%',
                    maxWidth: '400px',
                    border: 0.5,
                    borderColor: 'primary.main',
                    borderRadius: '16px',
                    marginTop: '1rem'
                }}
                variant="outlined"
            >
                <Stack
                    sx={{ display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column',}}
                >
                    <Typography sx={{mt:2}} variant="h6" component="div" color="error">
                        Service 365 days past due!
                    </Typography>

                    <CardMedia
                        sx={{
                            m:2, 
                            maxWidth: '200px',
                        }}
                        component="img"
                        // height="194"
                        image={qrcode}
                        alt="QR Code"
                    />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {/* {project.name} */}
                        S/N: 12345.1
                    </Typography>
                    <Button variant="contained" color="error" >Schedule Service</Button>
                </Stack>
                
                <CardContent>
                <Divider/>
                    <Typography variant="h5" component="div" sx={{mt:1}}>
                        {/* {project.number} */}
                        12345
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {/* {project.name} */}
                        Test Project
                    </Typography>
                    <Divider/>
                    <Stack 
                        direction="row" 
                        spacing={2} 
                        sx={{mt:2, mb:2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'}}>
                        {/* {project.address? */}
                        <>
                        <div style={{paddingLeft: 0}}>
                            <Typography variant="body2">
                                Project Address:
                            </Typography>
                            <a 
                            
                                target="_blank"
                                rel="noopener noreferrer" 
                            >
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {/* {project.address.address} */}
                                    5 Just Rd
                                    <br/>
                                    {/* {`${project.address.city}, ${project.address.state} ${project.address.postal_code}`} */}
                                    Fairfield, NJ 07004
                                    <br/>
                                    {/* {project.address.country === 'US'? '' : project.address.country} */}
                                </Typography>
                            </a>
                            
                        </div>
                        
                        <Divider orientation="vertical" flexItem/>
                        </>
                        {/* : ''} */}
                        <div>
                            <Typography variant="body2">
                                Project Category:
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {/* {project.project_category.name} */}
                                MRI
                            </Typography>
                            <Typography variant="body2">
                                Project Type:
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {/* {project.project_type.name} */}
                                Siemens
                            </Typography>
                        </div>
                    </Stack>
                    <Divider/>
                    <Typography variant="body2" sx={{mt: 2}}>
                        Services:
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb:0 }} color="text.secondary" gutterBottom>
                        Commissioned: 05/23/20
                    </Typography>
                    <Typography sx={{ fontSize: 14  }} color="error" gutterBottom>
                        Serviced: 05/23/22
                    </Typography>
                </CardContent>
            </Card>
        </Box>
        </Container>
        </div>
    );
};
