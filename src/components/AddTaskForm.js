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

export default function AddTaskForm(props) {
    const { user, token } = props;
    const { handleOpenSnackbar } = props;
    const { open, setOpen } = props;
    const { editing, task, setEditing } = props;
    const { createTask, updateTask } = props;
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});

    const initialFormValues = {
        created_by: user.id,
        assignee:'',
        tasklist: '3',
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

    const [ values, setValues ] = React.useState(initialFormValues);

    React.useEffect(() => {
        setValues(initialFormValues);
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

    const handleClose = () => {
        setOpen(!open);
        setEditing(false);
        // handleChangeEmployee(null)
    };

    const handleSubmit = () => {
        createTask(values);
        setOpen(!open);
    };

    return (
        <div>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{`${editing ? 'Edit' : 'Add'} Task`}</DialogTitle>
                <Divider/>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <TaskListPicker
                            token={token}
                            handleOpenSnackbar={handleOpenSnackbar}
                            handleChangeList={handleChangeList}
                        />
                    <div>
                    {editing ?
                        <TextField
                            autoFocus={false}
                            margin="dense"
                            disabled
                            id="employee"
                            name='employee'
                            label="Employee"
                            // value={`${expense.user.first_name} ${expense.user.last_name}`}
                            type="text"
                            fullWidth
                            variant="outlined"
                        /> 
                        :
                    <AssigneePicker
                        // employee={employee}
                        errors={errors}
                        user={user}
                        token={token}
                        handleChangeAssignee={handleChangeAssignee}
                    />
                    }
                    </div>     
                    {editing ?
                    <TextField
                        autoFocus={false}
                        margin="dense"
                        disabled
                        id="project"
                        name='project'
                        label="Project"
                        // value={expense.project.number}
                        type="text"
                        fullWidth
                        variant="outlined"
                    /> 
                    :
                    <div>
                    <ProjectPicker
                        token={token}
                        handleChangeProject={handleChangeProject}
                        errors={errors}
                        editProject={values.project}
                    />
                    </div>
                    }
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Due Date"
                            id="due"
                            name="due"
                            value={values.due}
                            onChange={(date) => {setValues({...values, due: date})}}
                            renderInput={(params) => <TextField {...params} helperText={errors.due === null ? '' : errors.date_purchased}
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
                    onClick={handleSubmit}
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