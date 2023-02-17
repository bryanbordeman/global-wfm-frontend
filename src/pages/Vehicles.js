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
import VehicleServicesListDialog from '../components/VehicleServicesListDialog';
import VehicleCleaningsListDialog from '../components/VehicleCleaningsListDialog';
import VehicleIssuesListDialog from '../components/VehicleIssuesListDialog';

export default function Vehicles(props) {
    const { user, token, handleOpenSnackbar } = props
    const [ openList, setOpenList ] = React.useState(false);
    const [ openServicesList, setOpenServicesList ] = React.useState(false);
    const [ openCleaningsList, setOpenCleaningsList ] = React.useState(false);
    const [ openIssuesList, setOpenIssuesList ] = React.useState(false);
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ vehicles , setVehicles ] = React.useState([]);
    const [ issues, setIssues ] = React.useState([]);
    const [ inspections, setInspections ] = React.useState([]);
    const [ services, setServices ] = React.useState([]);
    const [ cleanings, setCleanings ] = React.useState([]);
    const [ year, setYear ] = React.useState(new Date())

    React.useEffect(() => {
        retrieveVehicles();
        retrieveVehicleIssues();
        retrieveVehicleInspections();
        retrieveVehicleServices();
        retrieveVehicleCleanings();
    },[]);

    React.useEffect(() => {
        // if year changes update list
        retrieveVehicleServices();
        retrieveVehicleCleanings();
    },[year]);

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

    const retrieveVehicleIssues = () => {
        setIsLoading(true);
        VehicleDataService.getAllIssues(props.token)
        .then(response => {
            setIssues(response.data);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const retrieveVehicleInspections = () => {
        setIsLoading(true);
        VehicleDataService.getAllInspections(props.token)
        .then(response => {
            setInspections(response.data);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const retrieveVehicleServices = () => {
        setIsLoading(true);
        VehicleDataService.getAllServices(year.getFullYear(),props.token)
        .then(response => {
            setServices(response.data);
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const retrieveVehicleCleanings= () => {
        setIsLoading(true);
        VehicleDataService.getAllCleanings(year.getFullYear(), props.token)
        .then(response => {
            setCleanings(response.data);
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
            retrieveVehicleIssues();
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

    const createVehicleInspection = (data) => {
        setIsLoading(true);
        VehicleDataService.createVehicleInspection(data, token)
        .then(response => {
            retrieveVehicleInspections();
            handleOpenSnackbar('success', 'Your inspection has been logged')
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const createVehicleService = (data) => {
        setIsLoading(true);
        VehicleDataService.createVehicleService(data, token)
        .then(response => {
            retrieveVehicleServices();
            handleOpenSnackbar('success', 'Your service has been logged')
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const createVehicleCleaning = (data) => {
        setIsLoading(true);
        VehicleDataService.createVehicleCleaning(data, token)
        .then(response => {
            retrieveVehicleCleanings();
            handleOpenSnackbar('success', 'Your cleaning has been logged')
        })
        .catch(e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const updateVehicleService = (vehicleId, data) => {
        setIsLoading(true);
        VehicleDataService.updateVehicleService(vehicleId, data, token)
        .then(response => {
            retrieveVehicleServices();
            handleOpenSnackbar('info', 'Service has been updated')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const updateVehicleIssue = (vehicleId, data) => {
        setIsLoading(true);
        VehicleDataService.updateVehicleIssue(vehicleId, data, token)
        .then(response => {
            retrieveVehicleIssues();
            handleOpenSnackbar('info', 'Issue has been updated')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const updateVehicleInspection = (vehicleId, data) => {
        setIsLoading(true);
        VehicleDataService.updateVehicleInspection(vehicleId, data, token)
        .then(response => {
            retrieveVehicleInspections();
            handleOpenSnackbar('info', 'Inspection has been updated')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const updateVehicleCleaning = (vehicleId, data) => {
        setIsLoading(true);
        VehicleDataService.updateVehicleCleaning(vehicleId, data, token)
        .then(response => {
            retrieveVehicleCleanings();
            handleOpenSnackbar('info', 'Cleaning has been updated')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const deleteVehicleService = (vehicleId) => {
        VehicleDataService.deleteVehicleService(vehicleId, token)
        .then(response => {
            retrieveVehicleServices();
            handleOpenSnackbar('warning', 'Service has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });

    };

    const deleteVehicleCleaning= (vehicleId) => {
        VehicleDataService.deleteVehicleCleaning(vehicleId, token)
        .then(response => {
            retrieveVehicleCleanings();
            handleOpenSnackbar('warning', 'Cleaning has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        });

    };

    const deleteVehicleIssue= (vehicleId) => {
        VehicleDataService.deleteVehicleIssue(vehicleId, token)
        .then(response => {
            retrieveVehicleIssues();
            handleOpenSnackbar('warning', 'Issue has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
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
                        <ListItemButton onClick={() => setOpenServicesList(true)}>
                        <ListItemIcon>
                            <ConstructionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Services" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setOpenCleaningsList(true)}>
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
                        <ListItemButton onClick={() => setOpenIssuesList(true)}>
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
                issues={issues}
                createVehicleIssue={createVehicleIssue}
                createVehicleInspection={createVehicleInspection}
                createVehicleService={createVehicleService}
                createVehicleCleaning={createVehicleCleaning}
            />
            <VehicleServicesListDialog
                year={year}
                setYear={setYear}
                vehicles={vehicles}
                open={openServicesList}
                setOpen={setOpenServicesList}
                user={user}
                services={services}
                createVehicleService={createVehicleService}
                updateVehicleService={updateVehicleService}
                deleteVehicleService={deleteVehicleService}
            />
            <VehicleCleaningsListDialog
                year={year}
                setYear={setYear}
                vehicles={vehicles}
                open={openCleaningsList}
                setOpen={setOpenCleaningsList}
                user={user}
                cleanings={cleanings}
                createVehicleCleaning={createVehicleCleaning}
                updateVehicleCleaning={updateVehicleCleaning}
                deleteVehicleCleaning={deleteVehicleCleaning}
            />
            <VehicleIssuesListDialog
                vehicles={vehicles}
                open={openIssuesList}
                setOpen={setOpenIssuesList}
                user={user}
                issues={issues}
                createVehicleIssue={createVehicleIssue}
                updateVehicleIssue={updateVehicleIssue}
                deleteVehicleIssue={deleteVehicleIssue}
            />
            <Loading
                open={isLoading}
            />
        </Container>
    );
};