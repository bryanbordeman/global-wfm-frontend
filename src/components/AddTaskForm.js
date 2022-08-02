import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField, Divider } from '@mui/material';
import AssigneePicker from './AssigneePicker';
import ProjectPicker from './ProjectPicker';
import TaskListPicker from './TaskListPicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import moment from 'moment-timezone';

export default function AddTaskForm(props) {
    const { user, token } = props;
    const { handleOpenSnackbar } = props;
    const { open, setOpen } = props;
    const { editing, task, setEditing } = props;
    const { createTask } = props;
    const { updateTask } = props;
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});


    const initialFormValues = {
        created_by: user.id,
        assignee:'',
        tasklist: '',
        title:'',
        notes:'',
        due: new Date(),
        subtasks:[],
        project:'',
        created: new Date(),
        is_complete: false,
        is_deleted: false,
        is_read: false,
        completed: new Date(),
        updated: new Date()
    };

    const editFormValues = {
        created_by: user.id,
        assignee: task.assignee,
        tasklist: task.tasklist,
        title: task.title,
        notes: task.notes,
        due: editing ? new Date(task.due.replace('-', '/').replace('-', '/')) : new Date(),
        subtasks:task.subtasks,
        project:task.project,
        created: new Date(),
        is_complete: task.is_complete,
        is_deleted: false,
        is_read: false,
        completed: new Date(),
        updated: new Date()

    };

    const [ values, setValues ] = React.useState(initialFormValues);

    React.useLayoutEffect(() => {
        setValues(editing ? editFormValues : initialFormValues)
    },[open])
    

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };

    const handleChangeProject = (newValue) => {
        if(newValue){
            setValues({
            ...values,
            project: newValue.id
            });
        }
    };

    const handleChangeAssignee = (newValue) => {
        if(newValue){
            setValues({
            ...values,
            assignee: newValue.id
            });
        }
    };

    const handleChangeList = (newValue) => {
        if(newValue){
            setValues({
            ...values,
            tasklist: newValue.id
            });
        }
    };


    const handleValidation = () => {
        let formIsValid = true;

        if(values.title.length > 100){
            setErrors({...errors, title: '100 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, title: null});
            }, 3000);
        }
        else if(values.notes.length > 1000){
            setErrors({...errors, notes: '1000 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, notes: null});
            }, 3000);
        }
        else{
            setErrors({
                title: null,
                notes: null,
            });
            formIsValid = true;
        }
        setIsValid(formIsValid)
        setTimeout(() => {
            setIsValid(true);
        }, 3000);
    return formIsValid ? handleSubmit() : null
    };

    const handleClose = () => {
        setOpen(!open);
        setEditing(false);
        // handleChangeEmployee(null)
    };

    const handleSubmit = () => {
        if(editing){
            const data = values
            data.created_by = user.id
            data.due = moment.tz(data.due, "America/New_York")._d
            data.assignee = values.assignee.id === undefined? values.assignee : values.assignee.id
            data.project = values.project.id === undefined? values.project : values.project.id
            data.tasklist = values.tasklist.id === undefined? values.tasklist : values.tasklist.id
            data.subtasks = values.subtasks.map(subT => (subT.id))
            updateTask(task.id, data);
        }else{
            createTask(values);
        }
        setOpen(!open);
    };

    return (
        <div>
            <Dialog
                fullWidth
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{`${editing ? 'Edit' : 'Add'} Task`}</DialogTitle>
                <Divider/>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <TaskListPicker
                            editing={editing}
                            task={task}
                            token={token}
                            handleOpenSnackbar={handleOpenSnackbar}
                            handleChangeList={handleChangeList}
                        />
                        <AssigneePicker
                            editing={editing}
                            task={task}
                            errors={errors}
                            user={user}
                            token={token}
                            handleChangeAssignee={handleChangeAssignee}
                        />
                        <ProjectPicker
                            editing={editing}
                            editObject={task}
                            token={token}
                            handleChangeProject={handleChangeProject}
                            errors={errors}
                            editProject={values.project}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Due Date"
                                id="due"
                                name="due"
                                value={values.due}
                                onChange={(date) => {setValues({...values, due: date})}}
                                renderInput={(params) => <TextField {...params} helperText={errors.due === null ? '' : errors.due}
                                error={errors.due? true : false} />}
                                fullWidth
                            />
                        </LocalizationProvider>
                        <TextField
                            autoFocus={false}
                            margin="dense"
                            id="title"
                            name='title'
                            label="Title"
                            onChange={handleInputValue}
                            value={values.title}
                            type="text"
                            fullWidth
                            variant="outlined"
                            helperText={errors.title === null ? '' : errors.title}
                            error={errors.title? true : false}
                        />
                        <TextField
                            autoFocus={false}
                            id="notes"
                            name="notes"
                            label="Task"
                            onChange={handleInputValue}
                            value={values.notes}
                            multiline
                            rows={4}
                        />
                        {editing ?
                        <FormControlLabel
                            onChange={() => {setValues({...values, is_complete: !values.is_complete})}}
                            control={<Switch checked={values.is_complete} color="primary" />}
                            id="is_complete"
                            name="is_complete"
                            label="Complete"
                            value={values.is_complete}
                        /> 
                        : ''}
                    </Stack>
                </DialogContent>
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
                    {editing ? 'Update' : 'Submit'}
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};