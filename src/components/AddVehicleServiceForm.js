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

export default function AddVehicleServiceForm(props) {
    const { user } = props 
    const { open, setOpen } = props;
    const { vehicle, createVehicleService, updateVehicleService } = props;
    const { editService } = props;
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});
    const [ isEdit, setIsEdit ] = React.useState(false);

    const initialFormValues = {
        created_by: user.id,
        vehicle: vehicle.id,
        description:'',
        date: new Date(),
    };
    
    const [ values, setValues ] = React.useState({});

    React.useEffect(() => {
        if(editService !== undefined && Object.keys(editService).length > 0){
            // setValues(editService);
            setValues({...editService, date: new Date(editService.date.replaceAll('-','/'))})
            setIsEdit(true);
        }else{
            setValues(initialFormValues);
        }
    },[open]);

    const handleClose = () => {
        setOpen(false);
        setIsEdit(false);
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
            if(values.description !== editService.description || moment(values.date).format().slice(0,10) !== editService.date){
                if(Object.keys(values.created_by).length > 0 && Object.keys(values.vehicle).length > 0){
                    let temp = values
                    temp.created_by = values.created_by.id
                    temp.vehicle = values.vehicle.id
                    updateVehicleService(editService.id, temp);
                }  
            }
        }else{
            createVehicleService(values);
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
                                {isEdit? 'Edit Vehicle Service' : 'Log Vehicle Service'}
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
                                label="Date"
                                id="date"
                                name="date"
                                value={values.date}
                                onChange={(date) => {setValues({...values, date: date})}}
                                renderInput={(params) => <TextField {...params} helperText={errors.date === null ? '' : errors.date}
                                error={errors.date? true : false} />}
                                fullWidth
                            />
                        </LocalizationProvider>
                        <TextField
                            autoFocus={false}
                            id="description"
                            name="description"
                            label="Description of Service"
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
                                        Created By: {isEdit && editService.created_by? 
                                        `${editService.created_by.first_name} ${editService.created_by.last_name}` 
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