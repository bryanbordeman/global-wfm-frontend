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

    React.useEffect(() => {
        setValues(editing ? editFormValues : initialFormValues)
    },[openAdd]);

    const [errors, setErrors] = React.useState({});
    const validate = (fieldValues = values) => {
        // this function will check if the form values are valid
    }

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
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date"
                        id="date"
                        name="date"
                        value={values.date}
                        onChange={(date) => {setValues({...values, date: date})}}
                        renderInput={(params) => <TextField {...params} />}
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
                        renderInput={(params) => <TextField {...params} />}
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
            <Button variant='contained' onClick={handleSubmit}>{editing ? 'Update' : 'Submit'}</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
