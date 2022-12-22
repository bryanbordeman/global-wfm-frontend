import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField, Divider,IconButton} from '@mui/material';
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
import Transition from './DialogTransistion'
import QuoteProjectToggle from './QuoteProjectToggle';
import { projectType } from './ToggleObjects';

export default function AddTaskForm(props) {
    const { user, token } = props;
    const { handleOpenSnackbar } = props;
    const { open, setOpen } = props;
    const { editing, task, setEditing } = props;
    const { createTask } = props;
    const { updateTask } = props;
    const [ isValid, setIsValid ] = React.useState(true);
    const [ errors, setErrors ] = React.useState({});
    const [ choosePicker, setChoosePicker ] = React.useState('projects')

    const [ menuOptions, setMenuOptions ] = React.useState(['Projects', 'Services', "HSE's"]);
    const [ menuSelection, setMenuSelection ] = React.useState(0);
    const [ picker, setPicker ] = React.useState('');
    const didMount = React.useRef(false);

    React.useEffect(() => {
        if(user.groups.filter(group => (group.name === 'SALES')).length > 0){
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    },[])

    React.useEffect(() => {
        if (didMount.current) {
            switch(menuSelection) {
                case 1:
                    // console.log('Services')
                    // handleClear();
                    setPicker(
                        <ServicePicker
                            editing={editing}
                            editObject={task}
                            token={token}
                            handleChangeProject={handleChangeProject}
                            errors={errors}
                            editProject={values.project}
                        />
                    )
                break;
                case 2:
                    // console.log("HSE's")
                    // handleClear();
                    setPicker(
                        <HSEPicker
                            editing={editing}
                            editObject={task}
                            token={token}
                            handleChangeProject={handleChangeProject}
                            errors={errors}
                            editProject={values.project}
                        />
                    )
                break;
                case 3:
                    // console.log('Quotes')
                    // handleClear();
                    setPicker(
                        <QuotePicker
                            editing={editing}
                            editObject={task}
                            token={token}
                            handleChangeQuote={handleChangeProject}
                            errors={errors}
                            editProject={values.project}
                        />
                    )
                break;
                default:
                    // console.log('Projects')
                    // handleClear();
                    setPicker(
                        <ProjectPicker
                            editing={editing}
                            editObject={task}
                            token={token}
                            handleChangeProject={handleChangeProject}
                            errors={errors}
                            editProject={values.project}
                        />
                    )
            }
        } else {
            didMount.current = true;
        }
    },[menuSelection, open]);
    


    const initialFormValues = {
        created_by: user.id,
        assignee:'',
        tasklist: '',
        title:'',
        notes:'',
        due: new Date(),
        subtasks:[],
        project:'',
        quote:'',
        created: new Date(),
        is_complete: false,
        is_deleted: false,
        is_read: false,
        completed: new Date(),
        updated: new Date()
    };

    const editFormValues = {
        created_by: task.created_by,
        assignee: task.assignee,
        tasklist: task.tasklist,
        title: task.title,
        notes: task.notes,
        due: editing && task.due !== undefined? new Date(task.due.replace('-', '/').replace('-', '/')) : new Date(),
        subtasks:task.subtasks,
        project:task.project? task.project : '',
        quote:task.quote? task.quote : '',
        created: new Date(),
        is_complete: task.is_complete,
        is_deleted: false,
        is_read: false,
        completed: new Date(),
        updated: new Date()

    };

    const [ values, setValues ] = React.useState(initialFormValues);

    React.useLayoutEffect(() => {
        setValues(editing ? editFormValues : initialFormValues);
        if(editing && task.project){
            setChoosePicker('projects')
        }
        else if (editing && task.quote)
        {
            setChoosePicker('quotes')
        }
    },[open])
    
    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
        ...values,
        [name]: value
        });
    };

    const handleChangeProject = (newValue) => {

        if(newValue && choosePicker === projectType[0].name){
            setValues({
            ...values,
            project: newValue.id
            });
        }
        if(newValue && choosePicker === projectType[1].name){
            setValues({
            ...values,
            quote: newValue.id
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
        
        if(values.tasklist === ''){
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
        else if(values.project === '' && choosePicker === 'projects'){
            setErrors({...errors, project: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, project: null});
            }, 3000);
        }
        else if(values.quote === '' && choosePicker === 'quotes'){
            setErrors({...errors, quote: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, quote: null});
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
    };

    const handleSubmit = () => {
        if(editing){
            const data = values
            data.created_by = values.created_by.id
            data.due = moment.tz(data.due, "America/New_York")._d
            data.assignee = values.assignee.id === undefined? values.assignee : values.assignee.id

            if(choosePicker === projectType[0].name){
                data.project = values.project.id === undefined? values.project : values.project.id
                data.quote = ''
            }else{
                data.quote = values.quote.id === undefined? values.quote : values.quote.id
                data.project = ''
            }

            data.tasklist = values.tasklist.id === undefined? values.tasklist : values.tasklist.id
            data.subtasks = values.subtasks.map(subT => (subT.id))
            updateTask(task.id, data);
        }else{
            createTask(values);
        }
        handleClose();
        
    };

    const handleChangePicker = (newValue) => {
        setChoosePicker(newValue);
    };

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
                        <TaskListPicker
                            editing={editing}
                            task={task}
                            errors={errors}
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
                        <Stack direction="row" spacing={1}>
                            {picker}
                            <ProjectTypeDropdown
                                user={user}
                                menuOptions={menuOptions}
                                menuSelection={menuSelection}
                                setMenuSelection={setMenuSelection}
                            />
                        </Stack>
                        {/* <Stack direction="row" spacing={1}>
                        {choosePicker === projectType[0].name?
                        <ProjectPicker
                            editing={editing}
                            editObject={task}
                            token={token}
                            handleChangeProject={handleChangeProject}
                            errors={errors}
                            editProject={values.project}
                        />
                        : 
                        <QuotePicker
                            editing={editing}
                            editObject={task}
                            token={token}
                            handleChangeQuote={handleChangeProject}
                            errors={errors}
                            editProject={values.project}
                        />
                        }
                        {user.groups.filter(group => (group.name === 'SALES')).length > 0 ? 
                        <QuoteProjectToggle
                            handleChangePicker={handleChangePicker}
                            choosePicker={choosePicker}
                        />
                        : ''}
                        </Stack> */}
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
                        {editing && user.id === values.assignee.id ?
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