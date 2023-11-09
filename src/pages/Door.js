import * as React from 'react';
import DoorDataService from '../services/Door.services';
import { useParams } from "react-router-dom";
import moment from 'moment';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/GPS_Navbar_Logo_R1.svg'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Card, Stack, Divider, CardContent } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import RHInSwing from '../assets/door_swing_icons/RHInSwing.svg'
import RHOutSwing from '../assets/door_swing_icons/RHOutSwing.svg'
import LHInSwing from '../assets/door_swing_icons/LHInSwing.svg'
import LHOutSwing from '../assets/door_swing_icons/LHOutSwing.svg'

import RHInSwingDark from '../assets/door_swing_icons/RHInSwingDark.svg'
import RHOutSwingDark  from '../assets/door_swing_icons/RHOutSwingDark.svg'
import LHInSwingDark  from '../assets/door_swing_icons/LHInSwingDark.svg'
import LHOutSwingDark  from '../assets/door_swing_icons/LHOutSwingDark.svg'

import RHAInSwing from '../assets/door_swing_icons/RHAInSwing.svg'
import RHAOutSwing  from '../assets/door_swing_icons/RHAOutSwing.svg'
import LHAInSwing  from '../assets/door_swing_icons/LHAInSwing.svg'
import LHAOutSwing  from '../assets/door_swing_icons/LHAOutSwing.svg'

import RHAInSwingDark from '../assets/door_swing_icons/RHAInSwingDark.svg'
import RHAOutSwingDark  from '../assets/door_swing_icons/RHAOutSwingDark.svg'
import LHAInSwingDark  from '../assets/door_swing_icons/LHAInSwingDark.svg'
import LHAOutSwingDark  from '../assets/door_swing_icons/LHAOutSwingDark.svg'

import RHSlidingIn from '../assets/door_swing_icons/RHSlidingIn.svg'
import LHSlidingIn from '../assets/door_swing_icons/LHSlidingIn.svg'
import RHSlidingInDark from '../assets/door_swing_icons/RHSlidingInDark.svg'
import LHSlidingInDark from '../assets/door_swing_icons/LHSlidingInDark.svg'

import RHSlidingOut from '../assets/door_swing_icons/RHSlidingOut.svg'
import LHSlidingOut from '../assets/door_swing_icons/LHSlidingOut.svg'
import RHSlidingOutDark from '../assets/door_swing_icons/RHSlidingOutDark.svg'
import LHSlidingOutDark from '../assets/door_swing_icons/LHSlidingOutDark.svg'

import BiPartingIn from '../assets/door_swing_icons/BiPartingIn.svg'
import BiPartingOut from '../assets/door_swing_icons/BiPartingOut.svg'
import BiPartingInDark from '../assets/door_swing_icons/BiPartingInDark.svg'
import BiPartingOutDark from '../assets/door_swing_icons/BiPartingOutDark.svg'

import Loading from '../components/Loading';

export default function Door(props) {
    const [ door, setDoor ] = React.useState('');
    const [ doorIcon, setDoorIcon ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ service, setService ] = React.useState(false);
    const [ anchorElUser, setAnchorElUser ] = React.useState(null);
    const { user, handleChangeMode, darkState } = props
    let navigate = useNavigate();
    const { id } = useParams();

    const initialService = { 
            date: new Date(), 
            due: new Date(), 
            nextServiceDays: 0,
            color: 'primary'
        } 

    React.useLayoutEffect(()=> {
        setService(initialService)
        recieveDoor(id)
    },[]);

    React.useEffect(() => {
        if (door && door.log.length > 0) {
            const lastService = door.log[door.log.length - 1].date;
            const dueDate = moment(lastService).add(1, 'year').format("MM/DD/YY");
            const nextServiceDays = moment(dueDate).diff(moment(), 'days');
            let color = 'primary'; // Use let instead of const

            if (nextServiceDays <= 0) {
                color = 'error'; // Update the existing color variable
            }
            else if (nextServiceDays < 30) {
                color = 'warning'; // Update the existing color variable
            }
            setService({
                date: lastService,
                due: dueDate,
                nextServiceDays: nextServiceDays,
                color: color
            });
        }else{
            const lastService = door.completed;
            const dueDate = moment(lastService).add(1, 'year').format("MM/DD/YY");
            const nextServiceDays = moment(dueDate).diff(moment(), 'days');
            let color = 'primary'; // Use let instead of const

            if (nextServiceDays <= 0) {
                color = 'error'; // Update the existing color variable
            }
            else if (nextServiceDays < 30) {
                color = 'warning'; // Update the existing color variable
            }
            setService({
                date: lastService,
                due: dueDate,
                nextServiceDays: nextServiceDays,
                color: color
            });
        }
    }, [door])

    React.useEffect(() => {
        switch (`${door.hand}-${door.swing}-${door.is_double_door}-${door.is_sliding}-${door.is_biparting}`) {
            case "RH-in-false-false-false":
                setDoorIcon(darkState ? RHInSwingDark : RHInSwing);
                break;
            case "LH-in-false-false-false":
                setDoorIcon(darkState ? LHInSwingDark : LHInSwing);
                break;
            case "RH-out-false-false-false":
                setDoorIcon(darkState ? RHOutSwingDark : RHOutSwing);
                break;
            case "LH-out-false-false-false":
                setDoorIcon(darkState ? LHOutSwingDark : LHOutSwing);
                break;
            case "RHA-in-true-false-false":
                setDoorIcon(darkState ? RHAInSwingDark : RHAInSwing);
                break;
            case "RHA-out-true-false-false":
                setDoorIcon(darkState ? RHAOutSwingDark : RHAOutSwing);
                break;
            case "LHA-in-true-false-false":
                setDoorIcon(darkState ? LHAInSwingDark : LHAInSwing);
                break;
            case "LHA-out-true-false-false":
                setDoorIcon(darkState ? LHAOutSwingDark : LHAOutSwing);
                break;

            case "RH-in-false-true-false":
                setDoorIcon(darkState ? RHSlidingInDark : RHSlidingIn);
                break;

            case "LH-in-false-true-false":
                setDoorIcon(darkState ? LHSlidingInDark : LHSlidingIn);
                break;
            case "RH-out-false-true-false":
                setDoorIcon(darkState ? RHSlidingOutDark : RHSlidingOut);
                break;
            case "LH-out-false-true-false":
                setDoorIcon(darkState ? LHSlidingOutDark : LHSlidingOut);
                break;
            case "BI-in-false-true-true":
                setDoorIcon(darkState ? BiPartingInDark : BiPartingIn);
                break;
            case "BI-out-false-true-true":
                setDoorIcon(darkState ? BiPartingOutDark : BiPartingOut);
                break;
            default:
                setDoorIcon('');
            }
        }, [door, darkState]);
        

    const recieveDoor = (id) => {
        setIsLoading(true)
        DoorDataService.getDoor(id)
            .then(response => {
                setDoor(response.data);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false)
            });
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
        
    };

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
                <img style={{width: '6rem'}} src={logo} alt="GPS Logo"/>
                </Typography>
                
                <Typography
                    variant="h5"
                    noWrap
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
        {door?
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
                    bdoor: 0.5,
                    bdoorColor: 'primary.main',
                    bdoorRadius: '16px',
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
                        <div>
                        <Typography 
                            sx={{
                                color: (theme) => {
                                    if (service.color === 'error') {
                                        return theme.palette.error.main;
                                    } else if (service.color === 'warning') {
                                        return theme.palette.warning.main;
                                    } else {
                                        return theme.palette.primary.main;
                                    }
                                },
                                mt:2,
                                textAlign: 'center'
                            }} 
                            variant="caption" 
                            component="div" >
                            Next Service recommended on {moment(service.due).format("MM/DD/YY")}
                        </Typography>
                        <Typography 
                            sx={{
                                color: (theme) => {
                                    if (service.color === 'error') {
                                        return theme.palette.error.main;
                                    } else if (service.color === 'warning') {
                                        return theme.palette.warning.main;
                                    } else {
                                        return theme.palette.primary.main;
                                    }
                                },
                                mt:2,
                                textAlign: 'center'
                            }} 
                            variant="body1" 
                            component="div" >
                                {service.nextServiceDays} days until next service
                        </Typography>
                        </div>
                    <CardMedia
                        sx={{
                            m:2, 
                            maxWidth: '200px',
                        }}
                        component="img"
                        // height="194"
                        image={doorIcon}
                        alt="Door Icon"
                    />
                    <Typography color="text.secondary">
                        S/N: {door.project ? `${door.project.number}-${door.count}-${door.id}` : (door.service ? `${door.service.number}-${door.count}-${door.id}` : '')}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Door Type: {door.door_type.description}
                    </Typography>
                    <Button 
                        variant="contained" 
                        color={service.color} 
                        onClick={() =>
                            window.open(
                            `mailto:bryan@shieldingsystems.com?subject=Request%20Service%20(id#%20${door.id})`,
                            '_blank')}
                        >Schedule Service
                    </Button>
                </Stack>
                
                <CardContent>
                <Divider/>
                    {door.service? 
                    <div>
                    <Typography variant="h5" component="div" sx={{mt:1}}>
                        {door.service ? door.service.number : ''}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {door.service ? door.service.name : ''}
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
                                {door.service.address?
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {door.service ? door.service.address.address : ''}
                                    <br/>
                                    {`${door.service ? door.service.address.city : ''}, ${door.service ? door.service.address.state : ''} ${door.service ? door.service.address.postal_code : ''}`}
                                    <br/>
                                    {door.service ? door.service.address.country === 'US'? '' : door.service.address.country : ''}
                                </Typography>
                                :''}
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
                                {door.service ? door.service.project_category.name : ''}
                            </Typography>
                            <Typography variant="body2">
                                Project Type:
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {door.service ? door.service.project_type.name : ''}
                            </Typography>
                        </div>
                    </Stack>
                    </div>
                    :
                    <div>
                    <Typography variant="h5" component="div" sx={{mt:1}}>
                        {door.project ? door.project.number : ''}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {door.project ? door.project.name : ''}
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
                            <a href={`http://maps.google.com/?q=${door.project.address.address}, ${door.project.address.city}, ${door.project.address.state} ${door.project.address.postal_code}`}                             
                                target="_blank"
                                rel="noopener noreferrer" 
                            >
                                {door.project.address?
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {door.project ? door.project.address.address : ''}
                                    <br/>
                                    {`${door.project ? door.project.address.city : ''}, ${door.project ? door.project.address.state : ''} ${door.project ? door.project.address.postal_code : ''}`}
                                    <br/>
                                    {door.project ? door.project.address.country === 'US'? '' : door.project.address.country : ''}
                                </Typography>
                                : ''}
                            </a>
                            
                        </div>
                        
                        <Divider orientation="vertical" flexItem/>
                        </>
                        <div>
                            <Typography variant="body2">
                                Project Category:
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {door.project ? door.project.project_category.name : ''}
                            </Typography>
                            <Typography variant="body2">
                                Project Type:
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {door.project ? door.project.project_type.name : ''}
                            </Typography>
                        </div>
                    </Stack>
                    </div>
                    }
                    
                    <Divider/>
                    <Typography variant="body2" sx={{mt: 2}}>
                        Services:
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb:0 }} color="text.secondary" gutterBottom>
                        Commissioned: {moment(door.completed).format("MM/DD/YY")}
                    </Typography>
                    {door.log ? door.log.map((l, k) => (
                        <div key={k}>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={1}
                            alignItems="center"
                        >
                            <IconButton size='small' color="primary" aria-label="View Report">
                                <SummarizeIcon />
                            </IconButton>
                        <Typography sx={{ mb:0, fontSize: 14  }} color="primary" gutterBottom>
                            Serviced: {moment(l.date).format("MM/DD/YY")}
                        </Typography>
                        </Stack>
                        {k < door.log.length - 1 && (<Divider/>)}
                        </div>
                    ))
                    : ''}
                </CardContent>
            </Card>
        </Box>
        </Container>
        :''}
        <Loading
            open={isLoading}
        />
        </div>
    );
};


