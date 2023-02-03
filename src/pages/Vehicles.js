import React from 'react';
import VehicleDataService from '../services/Vehicle.services';
import Loading from '../components/Loading';
import { Container, Typography, Box } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ConstructionIcon from '@mui/icons-material/Construction';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import WashIcon from '@mui/icons-material/Wash';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import VehicleListDialog from '../components/VehicleListDialog';


export default function Vehicles(props) {
    const { user, token, handleOpenSnackbar } = props
    const [ openList, setOpenList ] = React.useState(false);
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ vehicles , setVehicles ] = React.useState([]);

    React.useEffect(() => {
        retrieveVehicles();
    },[]);
    
    const retrieveVehicles = () => {
        setIsLoading(true);
        VehicleDataService.getAll(props.token)
        .then(response => {
            setVehicles(response.data);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const createVehicleIssue = (data) => {
        setIsLoading(true);
        VehicleDataService.createVehicleIssue(data, token)
        .then(response => {
            handleOpenSnackbar('success', 'Your issue has been submitted')
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return ( 
        <Container
            component="span"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection:'column',
                height: '100%'
        }}>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setOpenList(true)}>
                        <ListItemIcon>
                            <DirectionsCarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Vehicle List" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <ConstructionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Services" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <WashIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cleaning" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <PlaylistAddCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inspections" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <LiveHelpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Issues" />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Box>
            <VehicleListDialog
                vehicles={vehicles}
                open={openList}
                setOpen={setOpenList}
                user={user}
                createVehicleIssue={createVehicleIssue}
            />
            <Loading
                open={isLoading}
            />
        </Container>
    );
};