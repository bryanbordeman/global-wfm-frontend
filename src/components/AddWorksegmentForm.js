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
    
    const [project, setProject] = React.useState(null);
    const [date, setDate] = React.useState(new Date());
    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());
    const [lunch, setLunch] = React.useState(true);
    const [travel, setTravel] = React.useState(0);
    const [notes, setNotes] = React.useState('');

    
    const [ submitted, setSubmitted ] = React.useState(false);
    
    const {handleClose, open } = props
    const { user, token, editing, createWorksegment } = props

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
        createWorksegment(data)
    };


    
    return (
        <div>
        <Dialog fullWidth open={open} onClose={handleClose}>
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
                        setLunch(lunch)}}
                    control={<Switch defaultChecked color="primary" />}
                    label="Lunch"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="travel"
                    onChange={(travel) => {
                        setTravel(travel.target.value)}}
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
                    multiline
                    rows={4}
                />
            </Stack>
            </DialogContent>
            <DialogActions>
            <Button variant='outlined' color='error' onClick={handleClose}>Cancel</Button>
            <Button variant='outlined' onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
