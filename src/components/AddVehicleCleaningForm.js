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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import VehiclePicker from './VehiclePicker';
import moment from 'moment';
import { red } from '@mui/material/colors';

export default function AddVehicleCleaningForm(props) {
    const { user } = props 
    const { open, setOpen } = props;
    const { vehicles } = props;
    const { vehicle, setVehicle, createVehicleCleaning, updateVehicleCleaning } = props;
    const { editCleaning, setEditCleaning } = props;
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});
    const [ selectAll, setSeleteAll ] = React.useState(false);
    const { isEdit } = props;
    

    const initialFormValues = {
        created_by: user.id,
        vehicle: vehicle.id,
        date: new Date(),
        wash_exterior: false,
        wash_interior: false,
        clean_windows: false,
        wash_seats: false,
        vacuum_seats: false,
        vacuum_floor: false,
        other: false,
        other_description: "",
    };
    
    const [ values, setValues ] = React.useState({});

    React.useEffect(() => {
        if(editCleaning !== undefined && Object.keys(editCleaning).length > 0){
            setValues({...editCleaning, date: new Date(editCleaning.date.replaceAll('-','/'))})
            let isFullyCleaned = editCleaning.wash_exterior === true &&
                                editCleaning.wash_interior === true &&
                                editCleaning.clean_windows === true &&
                                editCleaning.wash_seats === true &&
                                editCleaning.vacuum_seats === true &&
                                editCleaning.vacuum_floor === true? true : false;
                if (isFullyCleaned) {
                    setSeleteAll(true);
                }else{
                    setSeleteAll(false);
                }
        }else{
            setValues(initialFormValues);
        }
    },[open]);

    const handleClose = () => {
        setOpen(false);
        setEditCleaning({});
        setVehicle({});
        setSeleteAll(false);
    };

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };

    const handleSelectAll = () => {
        setSeleteAll(!selectAll);
        if(selectAll === false){
            setValues({
                ...values,
                wash_exterior: true,
                wash_interior: true,
                clean_windows: true,
                wash_seats: true,
                vacuum_seats: true,
                vacuum_floor: true,
            })
        }else{
            setValues({
                ...values,
                wash_exterior: false,
                wash_interior: false,
                clean_windows: false,
                wash_seats: false,
                vacuum_seats: false,
                vacuum_floor: false,
            })
        }
    };

    const handleValidation = () => {
        let formIsValid = true;

        if(values.other === true && values.other_description === ''){
            setErrors({...errors, other_description: 'Other checked so this field is required'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, other_description: null});
            }, 3000);
        }
        else if(values.other === false &&
            values.wash_exterior === false &&
            values.wash_interior === false &&
            values.clean_windows === false &&
            values.wash_seats === false &&
            values.vacuum_seats === false &&
            values.vacuum_floor === false){
            setErrors({...errors, nothingSelected: 'Minimum of one field required'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, nothingSelected: null});
            }, 3000);
        }
        else if(values.vehicle === undefined){
            setErrors({...errors, vehicle: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, vehicle: null});
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
            
            let isModified = editCleaning.wash_exterior === values.wash_exterior &&
                                editCleaning.wash_interior === values.wash_interior &&
                                editCleaning.clean_windows === values.clean_windows &&
                                editCleaning.wash_seats === values.wash_seats &&
                                editCleaning.vacuum_seats === values.vacuum_seats &&
                                editCleaning.vacuum_floor === values.vacuum_floor &&
                                editCleaning.other === values.other &&
                                editCleaning.other_description === values.other_description? false : true;
            if(isModified || moment(values.date).format().slice(0,10) !== editCleaning.date){
                if(Object.keys(values.created_by).length > 0 && Object.keys(values.vehicle).length > 0){
                    let temp = values
                    temp.created_by = values.created_by.id
                    temp.vehicle = values.vehicle.id
                    updateVehicleCleaning(editCleaning.id, temp);
                }  
            }
        }else{
            createVehicleCleaning(values);
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
                                {isEdit? 'Edit Vehicle Cleaning' : 'Log Vehicle Cleaning'}
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
                        <FormControl
                            required
                            error={errors.nothingSelected}
                            component="fieldset"
                            sx={{ m: 3 }}
                            variant="standard"
                        >
                        
                        <FormGroup >
                            <Divider sx={{mb:3}}/>
                                <FormControlLabel control={<Checkbox checked={selectAll} onClick={handleSelectAll}/>} name="select_all" label="Full Cleaning (Select All)" />
                            <Divider sx={{mt:3}}/>
                            <FormLabel component="legend">Choose at least 1</FormLabel>
                            <FormControlLabel control={<Checkbox disabled={selectAll} checked={values.wash_exterior} onClick={() => setValues({...values, wash_exterior: !values.wash_exterior})} sx={{color: errors.nothingSelected? red[500] : '' }} />} name="wash_exterior" label="Wash Exterior" sx={{color: errors.nothingSelected? red[500] : '' }}/>
                            <FormControlLabel control={<Checkbox disabled={selectAll} checked={values.wash_interior} onClick={() => setValues({...values, wash_interior: !values.wash_interior})} sx={{color: errors.nothingSelected? red[500] : '' }} />} name="wash_interior" label="Wash Interior" sx={{color: errors.nothingSelected? red[500] : '' }}/>
                            <FormControlLabel control={<Checkbox disabled={selectAll} checked={values.clean_windows} onClick={() => setValues({...values, clean_windows: !values.clean_windows})} sx={{color: errors.nothingSelected? red[500] : '' }} />} name="clean_windows" label="Clean Windows" sx={{color: errors.nothingSelected? red[500] : '' }}/>
                            <FormControlLabel control={<Checkbox disabled={selectAll} checked={values.wash_seats} onClick={() => setValues({...values, wash_seats: !values.wash_seats})} sx={{color: errors.nothingSelected? red[500] : '' }} />} name="wash_seats" label="Wash Seats" sx={{color: errors.nothingSelected? red[500] : '' }}/>
                            <FormControlLabel control={<Checkbox disabled={selectAll} checked={values.vacuum_seats} onClick={() => setValues({...values, vacuum_seats: !values.vacuum_seats})} sx={{color: errors.nothingSelected? red[500] : '' }} />} name="vacuum_seats" label="Vacuum Seats" sx={{color: errors.nothingSelected? red[500] : '' }}/>
                            <FormControlLabel control={<Checkbox disabled={selectAll} checked={values.vacuum_floor} onClick={() => setValues({...values, vacuum_floor: !values.vacuum_floor})} sx={{color: errors.nothingSelected? red[500] : '' }} />} name="vacuum_floor" label="Vacuum Floor" sx={{color: errors.nothingSelected? red[500] : '' }}/>
                            <FormControlLabel control={<Checkbox checked={values.other}  onClick={() => setValues({...values, other: !values.other})} sx={{color: errors.nothingSelected? red[500] : '' }} />} name="other" label="Other" sx={{color: errors.nothingSelected? red[500] : '' }}/>
                        </FormGroup>
                        <FormHelperText>{errors.nothingSelected}</FormHelperText>
                        </FormControl>
                        <TextField
                            autoFocus={false}
                            id="other_description"
                            name="other_description"
                            label="Description of Other"
                            onChange={handleInputValue}
                            value={values.other_description}
                            multiline
                            rows={8}
                            helperText={errors.other_description === null ? '' : errors.other_description}
                            error={errors.other_description? true : false}
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
                                            Created By: {isEdit && editCleaning.created_by? 
                                            `${editCleaning.created_by.first_name} ${editCleaning.created_by.last_name}` 
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