import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, Typography, IconButton, TextField } from '@mui/material';
import  Divider from '@mui/material/Divider';
import Transition from './DialogTransistion'
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import VehiclePicker from './VehiclePicker';

export default function AddVehicleInspectionForm(props) {
    const { user } = props;
    const { open, setOpen } = props;
    const { vehicles } = props;
    const { vehicle, setVehicle, createVehicleInspection, updateVehicleInspection } = props;
    const { editInspection, setEditInspection } = props;
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});
    const { isEdit } = props;
    

    const initialFormValues = {
        created_by: user.id,
        vehicle: vehicle.id,
        description:'',
        expiration_date: new Date(),
    };
    
    const [ values, setValues ] = React.useState({});

    React.useEffect(() => {
        if(editInspection !== undefined && Object.keys(editInspection).length > 0){
            setValues({...editInspection, expiration_date: new Date(editInspection.expiration_date.replaceAll('-','/'))})
        }else{
            setValues(initialFormValues);
        }
    },[open]);
    
    const handleClose = () => {
        setOpen(false);
        setEditInspection({});
        setVehicle({});
    };

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };

    const handleValidation = () => {
        let formIsValid = true;

        if(values.description === ''){
            setErrors({...errors, description: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, description: null});
            }, 3000);
        }
        else{
            setErrors({
                description: null,
            });
            formIsValid = true;
        }
        setIsValid(formIsValid)
        setTimeout(() => {
            setIsValid(true);
        }, 3000);
    return formIsValid ? handleSubmit() : null
    };

    const handleSubmit = () => {
        if(isEdit){
            if(values.description !== editInspection.description || moment(values.expiration_date).format().slice(0,10) !== editInspection.expiration_date){
                if(Object.keys(values.created_by).length > 0 && Object.keys(values.vehicle).length > 0){
                    let temp = values
                    temp.created_by = values.created_by.id
                    temp.vehicle = values.vehicle.id
                    updateVehicleInspection(editInspection.id, temp);
                }  
            }
        }else{
            createVehicleInspection(values);
        }
        handleClose();
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
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Stack>
                            <Typography variant="h6">
                                {isEdit? 'Edit Vehicle Inspection' : 'Log Vehicle Inspection'}
                            </Typography>
                            <Typography variant="subtitle1">
                                {vehicle.nickname}
                            </Typography>
                        </Stack>
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
                    <Stack direction="column" spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                label="Expiration Date"
                                id="expiration_date"
                                name="expiration_date"
                                value={values.expiration_date}
                                onChange={(expiration_date) => {setValues({...values, expiration_date: expiration_date})}}
                                renderInput={(params) => <TextField {...params} helperText={errors.expiration_date === null ? '' : errors.expiration_date}
                                error={errors.expiration_date? true : false} />}
                                fullWidth
                            />
                        </LocalizationProvider>
                        {isEdit || Object.keys(vehicle).length > 0? 
                            ''
                            :
                            <VehiclePicker
                                vehicles={vehicles}
                                setValues={setValues}
                                values={values}
                                errors={errors}
                            />
                        }
                        <TextField
                            autoFocus={false}
                            id="description"
                            name="description"
                            label="Description of Inspection"
                            onChange={handleInputValue}
                            value={values.description}
                            multiline
                            rows={8}
                            helperText={errors.description === null ? '' : errors.description}
                            error={errors.description? true : false}
                        />
                    </Stack>
                
                </DialogContent>
                <Divider/>
                {isEdit?
                    <div>
                        <DialogActions>
                            <DialogContent sx={{pt:0, pb:0}}>
                                <Stack direction="column" spacing={0}>
                                    <Typography variant="caption" color={'error'}>
                                        Created By: {isEdit && editInspection.created_by? 
                                        `${editInspection.created_by.first_name} ${editInspection.created_by.last_name}` 
                                        : ''}
                                    </Typography>
                                </Stack>
                            </DialogContent>
                        </DialogActions>
                        <Divider/>
                    </div>
                    :''}
                    <DialogActions>
                    <Button 
                        variant='outlined' 
                        onClick={handleClose}
                    >Cancel</Button>
                    <Button 
                        variant='contained' 
                        onClick={handleValidation}
                        // onClick={handleValidation}
                        color={`${isValid? 'primary' : 'error'}`}
                    >
                        {isEdit ? 'Update' : 'Submit'}
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};