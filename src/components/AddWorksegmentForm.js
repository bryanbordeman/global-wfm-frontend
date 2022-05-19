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

    const [project, setProject] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());
    const [lunch, setLunch] = React.useState(true);
    const [travel, setTravel] = React.useState(0);
    const [notes, setNotes] = React.useState('');
    
    React.useEffect(() => {
            setProject(editing ? segment.project : '');
            setDate(editing ? new Date(segment.date.replace('-', '/').replace('-', '/')) : new Date());
            setStartTime(editing ? getDateFromHours(segment.start_time) : new Date());
            setEndTime(editing ? getDateFromHours(segment.end_time) : new Date());
            setLunch(editing ? segment.lunch : true);
            setTravel(editing ? segment.travel_duration : 0);
            setNotes(editing ? segment.notes : '');
    },[openAdd])

    function getDateFromHours(time) {
        time = time.split(':');
        let now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
    }


    const data = {
        project: project, 
        is_approved: false,
        date: date.toISOString().split('T')[0],
        start_time: startTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
        end_time: endTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
        lunch: lunch,
        travel_duration: travel,
        notes: notes
    }

    const handleSubmit = () => {
        if(editing){
            updateWorksegment(segment.id, data);
            setOpenAdd(false);

        }
        else {
            createWorksegment(data);
            setOpenAdd(false);
        }
    };


    
    return (
        <div>
        <Dialog fullWidth open={openAdd} onClose={handleClose}>
            <DialogTitle>{`${editing ? 'Edit' : 'Add'} Worksegment`}</DialogTitle>
            <DialogContent>
            <Stack direction="column" spacing={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="project"
                    label="Project"
                    onChange={(project) => {
                        setProject(project.target.value)}}
                    value={project}
                    type="text"
                    fullWidth
                    variant="outlined"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date"
                        id="date"
                        value={date}
                        onChange={(newDate) => {
                        setDate(newDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="Start Time"
                        id="start-time"
                        value={startTime}
                        onChange={(newTime) => {
                        setStartTime(newTime);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="End Time"
                        id="end-time"
                        value={endTime}
                        onChange={(newTime) => {
                        setEndTime(newTime);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <FormControlLabel
                    onChange={() => {
                        setLunch(!lunch)}}
                    control={<Switch checked={lunch} color="primary" />}
                    label="Lunch"
                    value={lunch}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="travel"
                    onChange={(travel) => {
                        setTravel(travel.target.value)}}
                    value={travel}
                    label="Travel Duration"
                    type="number"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    onChange={(notes) => {
                        setNotes(notes.target.value)}}
                    value={notes}
                    multiline
                    rows={4}
                />
            </Stack>
            </DialogContent>
            <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant='contained' onClick={handleSubmit}>{editing ? 'Update' : 'Submit'}</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
