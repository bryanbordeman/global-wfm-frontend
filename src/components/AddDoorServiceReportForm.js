import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Stack, IconButton, Typography } from '@mui/material';
import  Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddAttachments from './AddAttachments';
import EmployeePicker from './EmployeePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CHOICES = ['Complete',
                'Incomplete',
                'Pending',
                'Under Observation',
                'Working solution provided'
                ];

export default function AddDoorServiceReportForm(props) {
    const { user, token, handleOpenSnackbar } = props;
    const { open, handleClose, editing, project } = props;
    const { employee, employees } = props;
    
    const { setIsLoading } = props;

    const initialFormValues = {
        project: project? project : {},
        comments: '',
        date: new Date(),
        attachments: [],
        is_active: true
    };

    const editFormValues ={
        project: project? project : {},
        comments: 'testing',
        date: new Date(),
        attachments: [
        {
            id: '243',
            title: "14036 Rev C",
            document :"https://globalshielding.s3.amazonaws.com/08c47c99-e57.png",
            created_at:"2023-10-20T15:00:54.724416-04:00",
            updated_at:"2023-10-20T15:00:54.724447-04:00",
        }
        ],
        is_active: true
    }

    const [ values, setValues ] = React.useState({});
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});

    React.useLayoutEffect(() => {
        if(open && !editing){
            setValues(initialFormValues);
        } else if (editing) {
            setValues(editFormValues)
        }
    },[open]);
    

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };

    const handleSubmit = () => {
        console.log(values)
    };

    const handleChangeEmployee = () => {
        //!! change employee
    };

    const handleValidation = () => {
        let formIsValid = true;

        if(values.comments.length > 6000){
            setErrors({...errors, comments: '6000 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, comments: null});
            }, 3000);
        }
        else if(values.comments.length < 1){
            setErrors({...errors, comments: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, comments: null});
            }, 3000);
        } else{ 
            setErrors({
                comments: null,
            });
            formIsValid = true;
        }
        setIsValid(formIsValid)
        setTimeout(() => {
            setIsValid(true);
        }, 3000);
    return formIsValid ? handleSubmit() : null
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
                        <div>
                            {`${editing ? 'Edit' : 'Add'} Door Service Report`}
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
                    <DialogContentText>
                        {project? `${project.number} ${project.name}` : ''}
                    </DialogContentText>
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
                    <EmployeePicker
                        editing={editing}
                        employee={employee}
                        employees={employees}
                        errors={errors}
                        user={user}
                        token={token}
                        handleChangeEmployee={handleChangeEmployee}
                    />
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        <Typography 
                            variant="subtitle1" 
                            gutterBottom
                            sx={{marginTop: 3, marginBottom: 0}}
                        >NATURE OF SERVICE</Typography>
                        <Divider color='primary' sx={{ borderWidth: '2px' }} />
                        <TextField
                            autoFocus={false}
                            id="problem_reported"
                            name="problem_reported"
                            label="Problem Reported"
                            onChange={handleInputValue}
                            value={values.problem_reported}
                            multiline
                            rows={10}
                            helperText={errors.problem_reported === null ? '' : errors.problem_reported}
                            error={errors.problem_reported? true : false}
                        />
                    </Stack>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="column" spacing={1}>
                            <Typography 
                                variant="subtitle1" 
                                gutterBottom
                                sx={{marginTop: 3, marginBottom: 0}}
                            >SERVICE DETAILS</Typography>
                            <Divider color='primary' sx={{ borderWidth: '2px' }} />
                            <TextField
                                autoFocus={false}
                                id="service_rendered"
                                name="service_rendered"
                                label="Service Rendered"
                                onChange={handleInputValue}
                                value={values.service_rendered}
                                multiline
                                rows={10}
                                helperText={errors.service_rendered === null ? '' : errors.service_rendered}
                                error={errors.service_rendered? true : false}
                            />
                        </Stack>
                    <TextField
                        autoFocus={false}
                        id="comments"
                        name="comments"
                        label="Additional Notes"
                        onChange={handleInputValue}
                        value={values.comments}
                        multiline
                        rows={5}
                        helperText={errors.comments === null ? '' : errors.comments}
                        error={errors.comments? true : false}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status after Service</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.status}
                                name='status'
                                label="Status after Service"
                                onChange={handleInputValue}
                            >
                        {CHOICES.map((c) => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <Divider/>
                    <AddAttachments
                        setIsLoading={setIsLoading}
                        token={token}
                        handleOpenSnackbar={handleOpenSnackbar}
                        values={values}
                        setValues={setValues}
                        editing={editing}
                    />
                </Stack>
                </DialogContent>
                <Divider/>
                <DialogActions>
                <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                <Button variant='contained' onClick={handleValidation}>{editing ? 'Update' : 'Submit'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};