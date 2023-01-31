import React from 'react';
import VehicleDataService from '../services/Vehicle.services';
import Loading from './Loading';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import Transition from './DialogTransistion'

export default function VehicleListDialog(props) {
    const { token, handleOpenSnackbar} = props
    const { open, setOpen } = props;
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
    
    const handleClose = () => {
        setOpen(false);
    };

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
                Vehicles
            </DialogTitle>
                <Divider/>
                {vehicles.map((v) => (
                    <DialogContent key={v.id}>
                    <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
                        {v.nickname}
                    </Typography>
                </DialogContent>
                ))}
                <Divider/>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </DialogActions>
            </Dialog>
            <Loading
                open={isLoading}
            />
        </div>
    );
};