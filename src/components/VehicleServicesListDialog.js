import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import CloseIcon from '@mui/icons-material/Close';
import AddVehicleServiceForm from './AddVehicleServiceForm';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export default function VehicleServicesListDialog(props) {
    const { user } = props
    const { year, setYear } = props
    const { createVehicleService } = props
    const { vehicles, services } = props
    const { open, setOpen } = props;
    const [ vehicle, setVehicle ] = React.useState({});
    const [ openService, setOpenService ] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenService = (vehicle) => {
        setVehicle(vehicle);
        setOpenService(true);
    };

    const serviceList = 
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {services.map((value, index) => {
                    const labelId = `list-label-${value.id}`;
                    return (
                        <div style={{marginRight: '0.5rem', marginLeft: '0.5rem'}} key={value.id}>
                            <ListItem
                                dense
                                secondaryAction={
                                    user.is_staff?
                                        <IconButton edge="end" aria-label="delete" color='error'>
                                            <DeleteIcon />
                                        </IconButton>
                                    :''
                                }
                            >
                                {user.is_staff?
                                    <ListItemIcon>
                                        <IconButton  edge="start">
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
                            {index === services.length - 1?
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
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DatePicker
                                label="Year"
                                id="year"
                                name="year"
                                views={['year']}
                                value={year}
                                onChange={(date) => {setYear(date)}}
                                renderInput={(params) => < TextField {...params} variant="filled"/>}
                                fullWidth
                            />
                        </LocalizationProvider>
                    </Box>
                    {services.length > 0 ? serviceList : 'No Services Recorded'}
                </DialogContent>
                <Divider/>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
            <AddVehicleServiceForm
                open={openService}
                setOpen={setOpenService}
                vehicle={vehicle}
                user={user}
                createVehicleService={createVehicleService}
            />
        </div>
    );
};