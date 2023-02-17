import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import CloseIcon from '@mui/icons-material/Close';
import AddVehicleIssueForm from './AddVehicleIssueForm';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function VehicleIssuesListDialog(props) {
    const { user } = props
    const { createVehicleIssue, updateVehicleIssue, deleteVehicleIssue } = props
    const { vehicles, issues } = props
    const { open, setOpen } = props;
    const [ vehicle, setVehicle ] = React.useState({});
    const [ openIssue, setOpenIssue ] = React.useState(false);
    const [ editIssue, setEditIssue ] = React.useState({});
    const [  openDelete, setOpenDelete ] = React.useState(false);
    const [ deleteId, setDeleteId ] = React.useState('');
    const [ deleteMessage, setDeleteMessage ] = React.useState('');

    const handleClose = () => {
        setOpen(false);
        setEditIssue({});
    };

    const handleOpenService = (vehicle, issue) => {
        setVehicle(vehicle);
        setEditIssue(issue);
        setOpenIssue(true);
    };

    const handleDelete = (value) => {
        setDeleteId(value.id);
        setDeleteMessage({title: 'Permanently delete this issue', content: `Issue: ${value.description}`})
        setOpenDelete(!openDelete)
        // deleteVehicleService();
    };

    const handleDeleteAction = () => {
        deleteVehicleIssue(deleteId);
    };

    const issueList = 
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {issues.map((value, index) => {
                    const labelId = `list-label-${value.id}`;
                    return (
                        <div style={{marginRight: '0.5rem', marginLeft: '0.5rem'}} key={value.id}>
                            <ListItem
                                dense
                                secondaryAction={
                                    user.is_staff?
                                        <IconButton onClick={() => handleDelete(value)} edge="end" aria-label="delete" color='error'>
                                            <DeleteIcon />
                                        </IconButton>
                                    :''
                                }
                            >
                                {user.is_staff?
                                    <ListItemIcon>
                                        <IconButton  
                                            onClick={() => {handleOpenService(value.vehicle, value)}}
                                            edge="start"
                                        >
                                            <EditIcon color='primary'/>
                                        </IconButton>
                                    </ListItemIcon>
                                    :''
                                }
                                <ListItemText 
                                    id={labelId} 
                                    primary={value.description} 
                                    secondary={
                                        <> Vehicle: {value.vehicle.nickname} 
                                        <br/> 
                                        Serviced on: {moment(value.date).format('L')}
                                        </>} 
                                    />
                            </ListItem>
                            {index === issues.length - 1?
                                ''
                                : <Divider/>}
                        </div>
                    );
                })}
            </List>
        </div>

    return (
        <div>
            <Dialog 
                TransitionComponent={Transition}
                fullWidth 
                fullScreen
                open={open} 
                onClose={handleClose}
                scroll={'paper'} 
            >
            <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            Vehicle Services
                        </div>
                        <div>
                        <IconButton 
                            edge="end" 
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        </div> 
                    </div>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Box sx={{marginBottom: 4}}>
                        
                    </Box>
                    {issues.length > 0 ? issueList : 'No Issues Recorded'}
                </DialogContent>
                <Divider/>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
            <AddVehicleIssueForm
                open={openIssue}
                setOpen={setOpenIssue}
                vehicle={vehicle}
                user={user}
                createVehicleIssue={createVehicleIssue}
                updateVehicleIssue={updateVehicleIssue}
                editIssue={editIssue}
            />
            <DeleteConfirmationModal
                deleteAction={handleDeleteAction}
                message={deleteMessage}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            />
        </div>
    );
};