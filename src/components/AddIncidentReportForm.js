import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Stack, IconButton } from '@mui/material';
import  Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddAttachments from './AddAttachments';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProjectPicker from './ProjectPicker';
import QuotePicker from './QuotePicker';
import ServicePicker from './ServicePicker';
import HSEPicker from './HSEPicker';
import ProjectTypeDropdown from './ProjectTypeDropdown';


const CHOICES = ['Shop',
                'Field',
                'Office',
                ];

export default function AddIncidentReportForm(props) {
    const { user, token, handleOpenSnackbar, darkState} = props;
    const { open, handleClose, editing, project } = props;
    const { setIsLoading } = props;

    const initialFormValues = {
        project: project? project : {},
        comments: '',
        category: CHOICES[0],
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

    const [ menuOptions, setMenuOptions ] = React.useState(['Projects', 'Services', "HSE's"]);
    const [ menuSelection, setMenuSelection ] = React.useState(0);

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

    React.useEffect(() => {
        if(user.groups.filter(group => (group.name === 'SALES')).length > 0){
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    },[]);
    

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

    let picker = <div></div>

    switch(menuSelection) {
        case 1:
            picker = 
                <ServicePicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    // editObject={DCN}
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
                    // editObject={DCN}
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
                    // editObject={DCN}
                    // editProject={values.project}
                />
        break;
        default:
            picker = 
                <ProjectPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    // editObject={DCN}
                    errors={errors}
                    editProject={values.project}
                />  
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
                            {`${editing ? 'Edit' : 'Add'} Incident Report`}
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
                    <Stack direction="row" spacing={1}>
                        {picker}
                        <ProjectTypeDropdown
                            user={user}
                            menuOptions={menuOptions}
                            menuSelection={menuSelection}
                            setMenuSelection={setMenuSelection}
                        />
                    </Stack>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.category}
                                name='category'
                                label="Category"
                                onChange={handleInputValue}
                            >
                        {CHOICES.map((c) => (
                            <MenuItem key={c} value={c}>{c}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus={false}
                        id="location"
                        name="location"
                        label="Address of Incident"
                        onChange={handleInputValue}
                        value={values.location}
                        multiline
                        rows={3}
                        helperText={errors.location === null ? '' : errors.location}
                        error={errors.location? true : false}
                    />
                    <TextField
                        autoFocus={false}
                        id="participants"
                        name="participants"
                        label="Participants involved"
                        onChange={handleInputValue}
                        value={values.participants}
                        multiline
                        rows={3}
                        helperText={errors.participants === null ? '' : errors.participants}
                        error={errors.participants? true : false}
                    />
                    
                    <TextField
                        autoFocus={false}
                        id="witnesses"
                        name='witnesses'
                        label="Witnesses"
                        onChange={handleInputValue}
                        value={values.witnesses}
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                    />
                    <TextField
                        autoFocus={false}
                        id="comments"
                        name="comments"
                        label="Description of Incident "
                        onChange={handleInputValue}
                        value={values.comments}
                        multiline
                        rows={15}
                        helperText={errors.comments === null ? '' : errors.comments}
                        error={errors.comments? true : false}
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