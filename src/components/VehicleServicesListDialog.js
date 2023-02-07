import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import CloseIcon from '@mui/icons-material/Close';
import AddVehicleServiceForm from './AddVehicleServiceForm';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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

    const serviceList = services.map((s) => (
        <div key={s.id}>
            <span>{s.date}</span>
            <span>{s.vehicle.nickname}</span>
            <span>{s.description}</span>
        </div>
        
    ))

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
                    {serviceList}
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