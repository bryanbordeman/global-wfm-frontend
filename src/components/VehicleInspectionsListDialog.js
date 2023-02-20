import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

export default function VehicleInspectionsListDialog(props) {
    const { user } = props
    const { year, setYear } = props
    const { inspections } = props
    const { open, setOpen } = props;
    const { setVehicle } = props;
    const { setOpenInspection } = props;
    const { setEditInspection } = props;
    const { openDelete, setDeleteId, setDeleteMessage, setOpenDelete } = props;

    const handleClose = () => {
        setOpen(false);
        setEditInspection({});
        setYear(new Date());
    };

    const handleOpenInspection = (vehicle, inspection) => {
        setVehicle(vehicle);
        setEditInspection(inspection);
        setOpenInspection(true);
    };

    const handleDelete = (value) => {
        setDeleteId(value.id);
        setDeleteMessage({title: 'Permanently delete this inspection', content: `Inspection: ${value.description}`})
        setOpenDelete(!openDelete)
    };

    const inspectionsList = 
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {inspections.map((value, index) => {
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
                                            onClick={() => {handleOpenInspection(value.vehicle, value)}}
                                            edge="start"
                                        >
                                            <EditIcon color='primary'/>
                                        </IconButton>
                                    </ListItemIcon>
                                    :''
                                }
                                <Stack>
                                <Chip sx={{maxWidth: '200px'}} color="warning" label={`Expires ${moment(value.expiration_date, "YYYYMMDD").fromNow()}`} />
                                <ListItemText 
                                    id={labelId} 
                                    primary={value.description} 
                                    secondary={
                                        <> Vehicle: {value.vehicle.nickname} 
                                        <br/> 
                                        Expires on: {moment(value.expiration_date).format('MM/YY')}
                                        </>} 
                                    />
                                </Stack>
                            </ListItem>
                            
                            {index === inspections.length - 1?
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
                            Vehicle Inspections
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
                    <Stack direction='row' spacing={2}>
                        <Box sx={{width: '100%'}}>
                            <Button 
                                size='large'
                                disableElevation
                                sx={{
                                    width: '100%', 
                                    maxWidth: '150px', 
                                    float: 'right',
                                    mr: '1.25rem',
                                    mb: 3}}
                                variant="contained"
                                onClick={() => setOpenInspection(true)}
                            >Add</Button>
                        </Box>
                    </Stack>
                    {inspections.length > 0 ? inspectionsList : 'No Services Recorded'}
                </DialogContent>
                <Divider/>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};