import React from 'react';
import VehicleDataService from '../services/Vehicle.services';
import Loading from '../components/Loading';
import { Container, Box } from '@mui/material';
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
import ArticleIcon from '@mui/icons-material/Article';

import AddVehicleIssueForm from '../components/AddVehicleIssueForm';
import AddVehicleInspectionForm from '../components/AddVehicleInspectionForm';
import AddVehicleServiceForm from '../components/AddVehicleServiceForm';
import AddVehicleCleaningForm from '../components/AddVehicleCleaningForm';

import VehicleListDialog from '../components/VehicleListDialog';
import VehicleServicesListDialog from '../components/VehicleServicesListDialog';
import VehicleCleaningsListDialog from '../components/VehicleCleaningsListDialog';
import VehicleIssuesListDialog from '../components/VehicleIssuesListDialog';
import VehicleInspectionsListDialog from '../components/VehicleInspectionsListDialog';
import VehicleInsurance from '../components/VehicleInsurance';

import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function Vehicles(props) {
    const { user, token, handleOpenSnackbar } = props
    
    const [ isLoading, setIsLoading ] = React.useState(true); // wait until API returns promise

    const [ vehicle, setVehicle ] = React.useState({});

    // list of values (this is fetched from API)
    const [ vehicles , setVehicles ] = React.useState([]); // all vehicle
    const [ issues, setIssues ] = React.useState([]); 
    const [ inspections, setInspections ] = React.useState([]);
    const [ services, setServices ] = React.useState([]);
    const [ cleanings, setCleanings ] = React.useState([]);

    // year is used for cleanings and services
    const [ year, setYear ] = React.useState(new Date());

    // open list
    const [ openList, setOpenList ] = React.useState(false); // vehicle list
    const [ openServicesList, setOpenServicesList ] = React.useState(false); // service list
    const [ openCleaningsList, setOpenCleaningsList ] = React.useState(false); // cleaning list
    const [ openIssuesList, setOpenIssuesList ] = React.useState(false); // issues list
    const [ openInspectionsList, setOpenInspectionsList ] = React.useState(false); // issues list

    // open add form
    const [ openIssue, setOpenIssue ] = React.useState(false); // add or edit issue
    const [ openInspection, setOpenInspection ] = React.useState(false); // add or edit inspection
    const [ openService, setOpenService ] = React.useState(false); // add or edit service
    const [ openCleaning, setOpenCleaning ] = React.useState(false); // add or edit cleaning
    const [ openInsurance, setOpenInsurance ] = React.useState(false); // add or edit cleaning

    // set edit values
    const [ isEdit, setIsEdit ] = React.useState(false);
    const [ editCleaning, setEditCleaning ] = React.useState({});
    const [ editService, setEditService ] = React.useState({});
    const [ editInspection, setEditInspection ] = React.useState({});
    const [ editIssue, setEditIssue ] = React.useState({});

    // delete 
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const [ deleteId, setDeleteId ] = React.useState('');
    const [ deleteMessage, setDeleteMessage ] = React.useState('');

    React.useEffect(() => {
        retrieveVehicles();
        retrieveVehicleIssues();
        retrieveVehicleInspections();
        retrieveVehicleServices();
        retrieveVehicleCleanings();
    },[]);

    React.useEffect(() => {
        // set isEdit if edit object exist
        if(Object.keys(editService).length > 0){
            setIsEdit(true);
        }
        else if(Object.keys(editCleaning).length > 0){
            setIsEdit(true);
        }
        else if(Object.keys(editInspection).length > 0){
            setIsEdit(true);
        }
        else if(Object.keys(editIssue).length > 0){
            setIsEdit(true);
        }
        else{
            setIsEdit(false);
        }
    },[editService, editCleaning, editInspection, editIssue]);

    React.useEffect(() => {
        // if year changes update list
        retrieveVehicleServices();
        retrieveVehicleCleanings();
    },[year]);

    const handleDeleteAction = () => {
        // take last word of message to determine which action to take
        let key = deleteMessage.title.split(' ').pop();
        
        if(key === 'service'){
            deleteVehicleService(deleteId);
        }
        else if(key === 'cleaning'){
            deleteVehicleCleaning(deleteId);
        }
        else if(key === 'issue'){
            deleteVehicleIssue(deleteId);
        }
        else if(key === 'inspection'){
            deleteVehicleInspection(deleteId);
        };
        
    };

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
        setIsLoading(true);
        VehicleDataService.deleteVehicleService(vehicleId, token)
        .then(response => {
            retrieveVehicleServices();
            handleOpenSnackbar('warning', 'Service has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });

    };

    const deleteVehicleCleaning= (vehicleId) => {
        setIsLoading(true);
        VehicleDataService.deleteVehicleCleaning(vehicleId, token)
        .then(response => {
            retrieveVehicleCleanings();
            handleOpenSnackbar('warning', 'Cleaning has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });

    };

    const deleteVehicleIssue= (vehicleId) => {
        setIsLoading(true);
        VehicleDataService.deleteVehicleIssue(vehicleId, token)
        .then(response => {
            retrieveVehicleIssues();
            handleOpenSnackbar('warning', 'Issue has been deleted')
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const deleteVehicleInspection= (vehicleId) => {
        setIsLoading(true);
        VehicleDataService.deleteVehicleInspection(vehicleId, token)
        .then(response => {
            retrieveVehicleInspections();
            handleOpenSnackbar('warning', 'Inspection has been deleted')
        })
        .catch( e => {
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
                        <ListItemButton onClick={() => setOpenInspectionsList(true)}>
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
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setOpenInsurance(true)}>
                        <ListItemIcon>
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Insurance" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <VehicleListDialog
                openIssue={openIssue}
                setOpenIssue={setOpenIssue}
                openInspection={openInspection}
                setOpenInspection={setOpenInspection}
                openService={openService}
                setOpenService={setOpenService}
                openCleaning={openCleaning}
                setOpenCleaning={setOpenCleaning}
                vehicles={vehicles}
                vehicle={vehicle}
                setVehicle={setVehicle}
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
                setVehicle={setVehicle}
                open={openServicesList}
                setOpen={setOpenServicesList}
                setOpenService={setOpenService}
                setEditService={setEditService}
                user={user}
                services={services}
                openDelete={openDelete}
                setDeleteId={setDeleteId}
                setDeleteMessage={setDeleteMessage}
                setOpenDelete={setOpenDelete}
            />
            
            <VehicleCleaningsListDialog
                year={year}
                setYear={setYear}
                setVehicle={setVehicle}
                open={openCleaningsList}
                setOpen={setOpenCleaningsList}
                openCleaning={openCleaning}
                setOpenCleaning={setOpenCleaning}
                editCleaning={editCleaning}
                setEditCleaning={setEditCleaning}
                user={user}
                cleanings={cleanings}
                openDelete={openDelete}
                setDeleteId={setDeleteId}
                setDeleteMessage={setDeleteMessage}
                setOpenDelete={setOpenDelete}
            />
            <VehicleIssuesListDialog
                setVehicle={setVehicle}
                open={openIssuesList}
                setOpen={setOpenIssuesList}
                openIssue={openIssue}
                setOpenIssue={setOpenIssue}
                editIssue={editIssue}
                setEditIssue={setEditIssue}
                user={user}
                issues={issues}
                openDelete={openDelete}
                setDeleteId={setDeleteId}
                setDeleteMessage={setDeleteMessage}
                setOpenDelete={setOpenDelete}
            />

            <VehicleInspectionsListDialog
                year={year}
                setYear={setYear}
                setVehicle={setVehicle}
                open={openInspectionsList}
                setOpen={setOpenInspectionsList}
                setOpenInspection={setOpenInspection}
                setEditInspection={setEditInspection}
                user={user}
                inspections={inspections}
                openDelete={openDelete}
                setDeleteId={setDeleteId}
                setDeleteMessage={setDeleteMessage}
                setOpenDelete={setOpenDelete}
            />
            <AddVehicleIssueForm
                open={openIssue}
                setOpen={setOpenIssue}
                vehicle={vehicle}
                setVehicle={setVehicle}
                vehicles={vehicles}
                editIssue={editIssue}
                setEditIssue={setEditIssue}
                isEdit={isEdit}
                user={user}
                createVehicleIssue={createVehicleIssue}
                updateVehicleIssue={updateVehicleIssue}
                deleteVehicleIssue={deleteVehicleIssue}
            />
            <AddVehicleInspectionForm
                open={openInspection}
                setOpen={setOpenInspection}
                vehicle={vehicle}
                setVehicle={setVehicle}
                vehicles={vehicles}
                editInspection={editInspection}
                setEditInspection={setEditInspection}
                isEdit={isEdit}
                user={user}
                createVehicleInspection={createVehicleInspection}
                updateVehicleInspection={updateVehicleInspection}
                deleteVehicleInspection={deleteVehicleInspection}
            />
            <AddVehicleServiceForm
                open={openService}
                setOpen={setOpenService}
                vehicle={vehicle}
                setVehicle={setVehicle}
                vehicles={vehicles}
                editService={editService}
                setEditService={setEditService}
                isEdit={isEdit}
                user={user}
                createVehicleService={createVehicleService}
                updateVehicleService={updateVehicleService}
                deleteVehicleService={deleteVehicleService}
            />
            <AddVehicleCleaningForm
                open={openCleaning}
                setOpen={setOpenCleaning}
                vehicle={vehicle}
                setVehicle={setVehicle}
                vehicles={vehicles}
                editCleaning={editCleaning}
                setEditCleaning={setEditCleaning}
                isEdit={isEdit}
                user={user}
                createVehicleCleaning={createVehicleCleaning}
                updateVehicleCleaning={updateVehicleCleaning}
                deleteVehicleCleaning={deleteVehicleCleaning}
            />
            <VehicleInsurance
                open={openInsurance}
                setOpen={setOpenInsurance}
            />

            <DeleteConfirmationModal
                deleteAction={handleDeleteAction}
                message={deleteMessage}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            />
            <Loading
                open={isLoading}
            />
        </Container>
    );
};