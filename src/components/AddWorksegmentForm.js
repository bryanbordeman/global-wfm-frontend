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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Stack } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import  Divider from '@mui/material/Divider';

export default function AddWorksegmentForm(props) {
    const { 
            editing, 
            createWorksegment, 
            updateWorksegment,
            segment,
            handleClose, 
            openAdd,
            setOpenAdd
            } = props

    const initialFormValues = {
        project: '',
        is_approved: false,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        lunch: true,
        travel: 0, 
        notes: ''
    }

    const editFormValues = {
        project: segment.project,
        date: editing ? new Date(segment.date.replace('-', '/').replace('-', '/')) : new Date(),
        startTime: editing ? getDateFromHours(segment.start_time) : new Date(),
        endTime: editing ? getDateFromHours(segment.end_time) : new Date(),
        lunch: segment.lunch,
        travel: segment.travel_duration,
        notes: segment.notes
    }

    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        project: null,
        date: null,
        startTime: null,
        endTime: null,
        travel: null,
    })

    React.useEffect(() => {
        setValues(editing ? editFormValues : initialFormValues)
    },[openAdd]);

    function getDateFromHours(time) {
        time = time.split(':');
        let now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
    }

    const handleSubmit = () => {
        const data = {
            project: values.project, 
            is_approved: false,
            date: values.date.toISOString().split('T')[0],
            start_time: values.startTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
            end_time: values.endTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
            lunch: values.lunch,
            travel_duration: values.travel,
            notes: values.notes
        };

        if(editing){
            updateWorksegment(segment.id, data);
            setOpenAdd(false);

        }
        else {
            createWorksegment(data);
            setOpenAdd(false);
        };
    };

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };

    function msToTime(duration) {
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
        return hours + minutes /60;
    }
    
    const handleValidation = () => {
        let formIsValid = true;

        if(values.project.length > 5){
            setErrors({...errors, project: 'Invalid Entry'});
            formIsValid = false;
        }
        else if(values.date > new Date()){
            setErrors({...errors, date: 'Date cannot be in the future.'});
            formIsValid = false;
        }
        else if(values.startTime > values.endTime){
            setErrors({...errors, startTime: 'Start time needs to be before end time'});
            formIsValid = false;
        }
        else if(values.travel < 0){
            setErrors({...errors, travel: 'Travel time can not be negitive'});
            formIsValid = false;
        }
        else if(values.travel > msToTime(values.endTime - values.startTime)){
            setErrors({...errors, travel: 'Travel time can not be greater then total time'});
            formIsValid = false;
        }
        else{
            setErrors({
                project: null,
                date: null,
                startTime: null,
                endTime: null,
                travel: null,
            });
            formIsValid = true;
        }
    return formIsValid ? handleSubmit() : null
    };


    return (
        <div>
        <Dialog fullWidth open={openAdd} onClose={handleClose}>
            <DialogTitle>{`${editing ? 'Edit' : 'Add'} Worksegment`}</DialogTitle>
            <Divider/>
            <DialogContent>
            <Stack direction="column" spacing={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="project"
                    name='project'
                    label="Project"
                    onChange={handleInputValue}
                    value={values.project}
                    type="text"
                    fullWidth
                    variant="outlined"
                    helperText={errors.project === null ? '' : errors.project}
                    error={errors.project? true : false}
                />
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="Start Time"
                        id="start-time"
                        name="startTime"
                        value={values.startTime}
                        onChange={(time) => {setValues({...values, startTime: time})}}
                        renderInput={(params) => <TextField {...params} helperText={errors.startTime === null ? '' : errors.startTime}
                        error={errors.startTime? true : false}/>}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="End Time"
                        id="end-time"
                        name="endTime"
                        value={values.endTime}
                        onChange={(time) => {setValues({...values, endTime: time})}}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <FormControlLabel
                    onChange={() => {setValues({...values, lunch: !values.lunch})}}
                    control={<Switch checked={values.lunch} color="primary" />}
                    id="lunch"
                    name="lunch"
                    label="Lunch"
                    value={values.lunch}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="travel"
                    name="travel"
                    onChange={handleInputValue}
                    value={values.travel}
                    label="Travel Duration"
                    type="number"
                    fullWidth
                    variant="outlined"
                    helperText={errors.travel === null ? '' : errors.travel}
                    error={errors.travel? true : false}
                />
                <TextField
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
            <Button variant='contained' onClick={handleValidation}>{editing ? 'Update' : 'Submit'}</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
