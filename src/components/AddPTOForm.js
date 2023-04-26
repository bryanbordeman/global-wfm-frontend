import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Stack, IconButton } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import  Divider from '@mui/material/Divider';
import EmployeePicker from './EmployeePicker';
import moment from 'moment-timezone';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

export default function AddPTOForm(props) {
    const { 
        editing, 
        setEditing,
        createPTO, 
        updatePTO,
        PTOsegment,
        setSegmentPTO,
        openAddPTO,
        setOpenAddPTO,
        user,
        token,
        handleChangeEmployee,
        employee,
        employees
        } = props

    
    const CHOICES = ['Vacation', 'Sick'];

    const initialFormValues = {
        user: user.id,
        PTO_type: CHOICES[0],
        is_full_day: true,
        is_approved: false,
        date: new Date(), 
        notes: ''
    };
    
    const editFormValues = {
        user: editing ? PTOsegment.user.id : '',
        PTO_type: editing ? PTOsegment.PTO_type : '',
        is_full_day: editing ? PTOsegment.is_full_day : '',
        is_approved: editing ? PTOsegment.is_approved : '',
        date: editing ? new Date(PTOsegment.date.replace('-', '/').replace('-', '/')): new Date(), 
        notes: editing ? PTOsegment.notes: '',
    };

    const [ values, setValues ] = React.useState(initialFormValues);
    
    const [ errors, setErrors ] = React.useState({
        date: null,
        employee: null
    });
    const [ isValid, setIsValid ] = React.useState(true);

    React.useLayoutEffect(() => {
        if(editing){
            setTimeout(() => {
                setValues(editFormValues)
            }, 500);
        }
    },[props]);


    React.useEffect(() => {
        if(employee) {
            setValues({
            ...values,
            user: employee.id
            });
        }
        //! not 100% if this is correct
        // if(employee.id === undefined) 
        //     setValues({
        //     ...values,
        //     user: user.id,
        //     });
        
    },[employee]);

    const handleSubmit = () => {
        const data = {
            user: values.user? values.user : user.id,
            PTO_type: values.PTO_type,
            is_full_day: values.is_full_day,
            is_approved: false,
            date: moment.tz(values.date, "America/New_York")._d.toISOString().split('T')[0],
            notes: values.notes
        };
        if(editing){
            updatePTO(PTOsegment.id, data); // update segment
            handleClose(); // close dialog
            setValues(initialFormValues); // reset form\
        }
        else {
            createPTO(data); // create segment
            handleClose(); // close dialog
            setValues(initialFormValues); // reset form
        };
    };


    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({ ...values,[name]: value });
    };

    
    const handleValidation = () => {
        let formIsValid = true;

        if(values.date > new Date()){
            setErrors({...errors, date: 'Date cannot be in the future.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, date: null});
            }, 3000);
        }
        else if(!employee){
            setErrors({...errors, employee: 'Select Employee'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, employee: null});
            }, 3000);
        }
        else{
            setErrors({
                date: null,
                employee: null
            });
            formIsValid = true;
        }
        setIsValid(formIsValid)
        setTimeout(() => {
            setIsValid(true);
        }, 3000);
    return formIsValid ? handleSubmit() : null
    };

    
    const handleClear = () => {
        setValues(initialFormValues);
    };

    const handleClose = () => {
        setOpenAddPTO(false);
        setEditing(false);
        setSegmentPTO('');
        handleClear();
    };

    
    return (
        <div>
            <Dialog 
                TransitionComponent={Transition}
                fullWidth
                fullScreen 
                open={openAddPTO} 
                onClose={handleClose}
                scroll={'body'}
                
                >
                <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            {`${editing ? 'Edit' : 'Add'} PTO`}
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
                <Stack direction="column" spacing={2}>
                    {user.is_staff ? 
                    <div>
                        <EmployeePicker
                            editing={editing}
                            editObject={PTOsegment}
                            employee={employee}
                            employees={employees}
                            errors={errors}
                            user={user}
                            token={token}
                            handleChangeEmployee={handleChangeEmployee}
                        />
                    </div> : ''
                    }
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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">PTO Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.PTO_type}
                                name='PTO_type'
                                label="PTO Type"
                                onChange={handleInputValue}
                            >
                        {CHOICES.map((c) => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <Stack direction='row' spacing={2}>
                    <FormControlLabel
                        onChange={() => {setValues({...values, is_full_day: !values.is_full_day})}}
                        control={<Switch checked={values.is_full_day} color="primary" />}
                        id="is_full_day"
                        name="is_full_day"
                        label="Full Day"
                        value={values.is_full_day}
                    />
                    <Chip 
                        icon={<QueryBuilderIcon/>}
                        label={values.is_full_day? '8 Hours' : '4 Hours'} 
                        color={values.is_full_day? 'success' : 'warning'}  
                    />
                    </Stack>
                    
                    <TextField
                        autoFocus={false}
                        id="notes"
                        name="notes"
                        label="Notes"
                        onChange={handleInputValue}
                        value={values.notes}
                        multiline
                        rows={4}
                    />
                </Stack>
                </DialogContent>
                <Divider/>
                <DialogActions>
                <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                <Button 
                    variant='contained' 
                    onClick={handleValidation}
                    color={`${isValid? 'primary' : 'error'}`}
                >
                    {editing ? 'Update' : 'Submit'}
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


