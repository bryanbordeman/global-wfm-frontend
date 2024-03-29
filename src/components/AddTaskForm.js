import React from 'react';
import Button from '@mui/material/Button';
import PublicSwitchButton from './PublicSwitchButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField, Divider, IconButton } from '@mui/material';
import AssigneePicker from './AssigneePicker';
import ProjectPicker from '../components/ProjectPicker';
import QuotePicker from '../components/QuotePicker';
import ServicePicker from '../components/ServicePicker';
import HSEPicker from '../components/HSEPicker';
import ProjectTypeDropdown from '../components/ProjectTypeDropdown';
import TaskListPicker from './TaskListPicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment-timezone';
import Transition from './DialogTransistion';
import AddAttachments from './AddAttachments';

export default function AddTaskForm(props) {
    const { user, token } = props;
    const { handleOpenSnackbar } = props;
    const { employees } = props;
    const { open, setOpen } = props;
    const { editing, task, setEditing } = props;
    const { createTask } = props;
    const { updateTask } = props;
    const { setIsLoading } = props;
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});

    const [ menuOptions, setMenuOptions ] = React.useState(['Projects', 'Services', "HSE's"]);
    const [ menuSelection, setMenuSelection ] = React.useState(0);


    React.useEffect(() => {
        if(user.groups.filter(group => (group.name === 'SALES')).length > 0){
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    },[]);

    React.useEffect(() => {
        // if picker changes clear project value
        if(!editing)
            setValues({
                ...values,
                hse: '',
                project: '',
                service: '',
                quote: ''
            });
    },[menuSelection]);

    const initialFormValues = {
        created_by: user.id,
        assignee:'',
        tasklist: '',
        title:'',
        notes:'',
        due: new Date(),
        subtasks:[],
        project:'',
        service: '',
        hse: '',
        quote:'',
        created: new Date(),
        is_complete: false,
        is_deleted: false,
        is_read: false,
        is_public: true,
        completed: new Date(),
        updated: new Date(),
        attachments: []
    };

    const editFormValues = {
        created_by: task.created_by,
        assignee: task.assignee,
        tasklist: task.tasklist,
        title: task.title,
        notes: task.notes,
        due: editing && task.due !== undefined? new Date(task.due.replace('-', '/').replace('-', '/')) : new Date(),
        subtasks:task.subtasks,
        quote: editing && task.quote != null ? task.quote.id : task.quote,
        project: editing && task.project != null ? task.project.id : task.project,
        service: editing && task.service != null? task.service.id : task.service,
        hse: editing && task.hse != null ? task.hse.id : task.hse,
        created: new Date(),
        is_complete: task.is_complete,
        is_deleted: false,
        is_read: task.is_read,
        is_public: task.is_public,
        completed: new Date(),
        updated: new Date(),
        attachments: task.attachments
    };

    const [ values, setValues ] = React.useState(initialFormValues);

    React.useLayoutEffect(() => {
        if(editing){
            if(task.service !== null){
                setMenuSelection(1)
            }
            if(task.hse !== null){
                setMenuSelection(2)
            }
            if(task.quote !== null){
                setMenuSelection(3)
            }
            if(task.project !== null){
                setMenuSelection(0)
            }
        }
    },[props]);

    React.useLayoutEffect(() => {
        if(editing){
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

    const handleChangeProject = (newValue) => {
        switch(menuSelection) {
            case 1:
                //Service
                if(newValue){
                    setValues({
                    ...values,
                    service: newValue.id,
                    project: null,
                    hse: null,
                    quote: null
                    });
                };
            break;
            case 2:
                //HSE
                if(newValue){
                    setValues({
                    ...values,
                    hse: newValue.id,
                    project: null,
                    service: null,
                    quote: null
                    });
                };
            break;
            case 3:
               //Quote
                if(newValue){
                    setValues({
                    ...values,
                    quote: newValue.id,
                    project: null,
                    hse: null,
                    service: null
                    });
                };
            break;
            default:
                //Project 
                if(newValue){
                    setValues({
                    ...values,
                    project: newValue.id,
                    service: null,
                    hse: null,
                    quote: null
                    });
                };
        };
    };

    const handleChangeAssignee = (newValue) => {
        if(newValue){
            setValues({
            ...values,
            assignee: newValue.id
            });
        };
    };

    const handleChangeList = (newValue) => {
        if(newValue){
            setValues({
            ...values,
            tasklist: newValue.id
            });
        };
    };

    const handleValidation = () => {
        let formIsValid = true;

        if(values.project === '' && values.service === '' && values.hse === '' && values.quote === ''){
            setErrors({...errors, project: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, project: null});
            }, 3000);
        }
        else if(values.tasklist === ''){
            setErrors({...errors, tasklist: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, tasklist: null});
            }, 3000);
        }
        else if(values.assignee === ''){
            setErrors({...errors, assignee: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, assignee: null});
            }, 3000);
        }
        else if(values.title.length > 100){
            setErrors({...errors, title: '100 character max.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, title: null});
            }, 3000);
        }
        else if(values.title.length < 1){
            setErrors({...errors, title: 'Required field'});
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
                project: null,
                assignee: null,
                quote: null,
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
        setValues(initialFormValues);
    };

    const handleSubmit = () => {
        if(editing){
            const data = values
            data.created_by = values.created_by.id;
            data.due = moment.tz(data.due, "America/New_York")._d;
            data.assignee = values.assignee.id === undefined? values.assignee : values.assignee.id;
            data.tasklist = values.tasklist.id === undefined? values.tasklist : values.tasklist.id;
            data.subtasks = values.subtasks.map(subT => (subT.id));
            data.updated= moment.tz(data.updated, "America/New_York")._d.toISOString();
            const tempAttachments = []
            if (values.attachments.length > 0) {
                values.attachments.forEach((a) => {
                    if (a.id) {
                        tempAttachments.push(a.id);
                    }
                });
            data.attachments = tempAttachments
            }
            updateTask(task.id, data);
            setValues(initialFormValues);
        }else{
            const data = values
            const tempAttachments = []
            if (values.attachments.length > 0) {
                values.attachments.forEach((a) => {
                    if (a.id) {
                        tempAttachments.push(a.id);
                    }
                });
            data.attachments = tempAttachments
            }
            createTask(data);
            setValues(initialFormValues);
        };
        handleClose();
    };

    const handleToggleIsPublic = (isPublic) => {
        setValues({
            ...values,
            is_public: isPublic
        });
    };

    let picker = <div></div>

    switch(menuSelection) {
        case 1:
            picker = 
                <ServicePicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={task}
                    errors={errors}
                    editProject={values.project}
                />
        break;
        case 2:
            picker = 
                <HSEPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={task}
                    errors={errors}
                    editProject={values.project}
                />
        break;
        case 3:
            picker = 
                <QuotePicker
                    token={token}
                    handleChangeQuote={handleChangeProject}
                    errors={errors}
                    editing={editing}
                    editObject={task}
                    // editProject={values.project}
                />
        break;
        default:
            picker = 
                <ProjectPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={task}
                    errors={errors}
                    editProject={values.project}
                />  
    };

    const assignee = values.assignee ? typeof values.assignee == 'number'? values.assignee : values.assignee.id : '';

    return (
        <div>
            <Dialog
                TransitionComponent={Transition}
                fullWidth
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            {`${editing ? 'Edit' : 'Add'} Task`}
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
                        <Stack direction="row" spacing={2}>
                            <div style={{ width: '75%' }}>
                                <TaskListPicker
                                    editing={editing}
                                    task={task}
                                    errors={errors}
                                    token={token}
                                    handleOpenSnackbar={handleOpenSnackbar}
                                    handleChangeList={handleChangeList}
                                />
                            </div>
                            <PublicSwitchButton
                                handleToggleIsPublic={handleToggleIsPublic}
                                isPublic={values.is_public}
                            />
                        </Stack>
                        <AssigneePicker
                            employees={employees}
                            editing={editing}
                            task={task}
                            errors={errors}
                            user={user}
                            token={token}
                            handleChangeAssignee={handleChangeAssignee}
                            handleOpenSnackbar={handleOpenSnackbar}
                        />
                        <Stack direction="row" spacing={1}>
                            {picker}
                            <ProjectTypeDropdown
                                user={user}
                                menuOptions={menuOptions}
                                menuSelection={menuSelection}
                                setMenuSelection={setMenuSelection}
                            />
                        </Stack>
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
                            helperText={errors.notes === null ? '' : errors.notes}
                            error={errors.notes? true : false}
                        />
                        <Divider/>
                        <AddAttachments
                            setIsLoading={setIsLoading}
                            token={token}
                            handleOpenSnackbar={handleOpenSnackbar}
                            values={values}
                            setValues={setValues}
                            editing={editing}
                        />

                        {editing && user.id === assignee?
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
                    color={`${isValid? 'primary' : 'error'}`}
                >
                    {editing ? 'Update' : 'Submit'}
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};