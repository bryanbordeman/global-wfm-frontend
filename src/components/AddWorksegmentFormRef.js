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
import { Stack, IconButton } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import  Divider from '@mui/material/Divider';
import ProjectPicker from './ProjectPicker';
import QuotePicker from './QuotePicker';
import ServicePicker from './ServicePicker';
import HSEPicker from './HSEPicker';
import ProjectTypeDropdown from './ProjectTypeDropdown';
import EmployeePicker from './EmployeePicker';
import moment from 'moment-timezone';
import CloseIcon from '@mui/icons-material/Close';
import Transition from './DialogTransistion'
import FieldShopOfficeToggle from './FieldShopOfficeToggle';

export default function AddWorksegmentForm(props) {
    const { 
        editing, 
        setEditing,
        workTypes,
        createWorksegment, 
        updateWorksegment,
        segment,
        handleClose, 
        openAdd,
        setOpenAdd,
        user,
        token,
        handleChangeEmployee,
        employee
        } = props
    const [ menuOptions, setMenuOptions ] = React.useState(['Projects', 'Services', "HSE's"]);
    const [ menuSelection, setMenuSelection ] = React.useState(0);
    // const [ picker, setPicker ] = React.useState('');
    const didMount = React.useRef(false);
    

    const initialFormValues = {
        user: user.id,
        segment_type: '',
        quote: '',
        project: '',
        service: '',
        hse: '',
        is_approved: false,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        lunch: true,
        travel: 0, 
        notes: ''
    };
    
    const editFormValues = {
        user: editing ? segment.user.id : segment.user,
        segment_type: segment.segment_type? segment.segment_type.id : segment.segment_type,
        quote: editing && segment.quote != null ? segment.quote.id : segment.quote,
        project: editing && segment.project != null ? segment.project.id : segment.project,
        service: editing && segment.service != null? segment.service.id : segment.service,
        hse: editing && segment.hse != null ? segment.hse.id : segment.hse,
        date: editing ? new Date(segment.date.replace('-', '/').replace('-', '/')) : new Date(),
        startTime: editing ? getDateFromHours(segment.start_time) : new Date(),
        endTime: editing ? getDateFromHours(segment.end_time) : new Date(),
        lunch: segment.lunch,
        travel: segment.travel_duration,
        notes: segment.notes
    };

    const [ values, setValues ] = React.useState(initialFormValues);
    const [ errors, setErrors ] = React.useState({
        project: null,
        date: null,
        startTime: null,
        endTime: null,
        travel: null,
        employee: null
    });
    const [ isValid, setIsValid ] = React.useState(true);
    // const [ segmentType, setSegmentType ] = React.useState('');

    React.useEffect(() => {
        if(user.groups.filter(group => (group.name === 'SALES')).length > 0){
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    },[])

    // React.useEffect(() => {
    //     if (didMount.current) {
    //         switch(menuSelection) {
    //             case 1:
    //                 // console.log('Services')
    //                 // handleClear();
    //                 setPicker(
    //                     <ServicePicker
    //                         token={token}
    //                         handleChangeProject={handleChangeProject}
    //                         editing={editing}
    //                         editObject={segment}
    //                         errors={errors}
    //                         editProject={values.project}
    //                     />
    //                 )
    //             break;
    //             case 2:
    //                 // console.log("HSE's")
    //                 // handleClear();
    //                 setPicker(
    //                     <HSEPicker
    //                         token={token}
    //                         handleChangeProject={handleChangeProject}
    //                         editing={editing}
    //                         editObject={segment}
    //                         errors={errors}
    //                         editProject={values.project}
    //                     />
    //                 )
    //             break;
    //             case 3:
    //                 // console.log('Quotes')
    //                 // handleClear();
    //                 setPicker(
    //                     <QuotePicker
    //                         token={token}
    //                         // handleChangeQuote={handleChangeQuote}
    //                         errors={{quote: ''}}
    //                     />
    //                 )
    //             break;
    //             default:
    //                 // console.log('Projects')
    //                 // handleClear();
    //                 setPicker(
    //                     <ProjectPicker
    //                         token={token}
    //                         handleChangeProject={handleChangeProject}
    //                         editing={editing}
    //                         editObject={segment}
    //                         errors={errors}
    //                         editProject={values.project}
    //                         open={openAdd}
    //                     />
    //                 )
    //         }
    //     } else {
    //         didMount.current = true;
    //     }
    // },[menuSelection, openAdd]);

    React.useLayoutEffect(() => {
        if (didMount.current) {
            if(editing){
                if(segment.service !== null){
                    setMenuSelection(1)
                }
                if(segment.hse !== null){
                    setMenuSelection(2)
                }
                if(segment.quote !== null){
                    setMenuSelection(3)
                }
                if(segment.project !== null){
                    setMenuSelection(0)
                }
                setTimeout(() => {
                    setValues(editFormValues)
                }, 500);
            }
        } else {
            didMount.current = true;
        }
    },[openAdd]);

    React.useEffect(() => {
        if(employee) 
            setValues({
            ...values,
            user: employee.id
            });
    },[employee]);

    React.useLayoutEffect(() => {
        if(editing){
            setValues({
                ...values,
                segment_type: segment.segment_type
            });
            // setSegmentType(workTypes.find(x => x.name === segment.segment_type).id);
        }else{
            // set type to office by default
            setValues({
                ...values,
                segment_type: workTypes.length > 0 ? workTypes[workTypes.length - 1].id : ''
            });
            // assign type based on user group if field or shop
            workTypes.forEach(work => {
                if(user.groups.filter(group => (group.name === work.name.toUpperCase())).length > 0){
                    setValues({
                        ...values,
                        segment_type: work
                    });
                }
            });

        }
    },[openAdd]);

    function getDateFromHours(time) {
        time = time.split(':');
        let now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
    };

    const handleSubmit = () => {
        const data = {
            user: values.user,
            segment_type: values.segment_type,
            quote: values.quote, 
            project: values.project, 
            service: values.service, 
            hse: values.hse, 
            is_approved: false,
            date: moment.tz(values.date, "America/New_York")._d.toISOString().split('T')[0],
            start_time: values.startTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
            end_time: values.endTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
            lunch: values.lunch,
            travel_duration: values.travel,
            notes: values.notes
        };
        if(editing){
            updateWorksegment(segment.id, data); // update segment
            handleClose(); // close dialog
            setValues(initialFormValues); // reset form

        }
        else {
            createWorksegment(data); // create segment
            handleClose(); // close dialog
            setValues(initialFormValues); // reset form
        };
    };

    const handleChangeSegmentType = (newValue) => {
        if(newValue){
            setValues({
            ...values,
            segment_type: newValue
            });
        };
    };

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        if(name === 'travel'){
            if (value > -1) {
                setValues({
                    ...values,
                    [name]: value
                    });
            }
        } else {
        setValues({
        ...values,
        [name]: value
        });
    }
    };

    function msToTime(duration) {
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
        return hours + minutes /60;
    };
    
    const handleValidation = () => {
        let formIsValid = true;

        if(values.project === ''){
            setErrors({...errors, project: 'Required field'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, project: null});
            }, 3000);
        }
        else if(values.date > new Date()){
            setErrors({...errors, date: 'Date cannot be in the future.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, date: null});
            }, 3000);
        }
        else if(values.startTime > values.endTime){
            setErrors({...errors, startTime: 'Start time needs to be before end time'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, startTime: null});
            }, 3000);
        }
        else if(values.travel < 0){
            setErrors({...errors, travel: 'Travel time can not be negitive'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, travel: null});
            }, 3000);
        }
        else if(values.travel > msToTime(values.endTime - values.startTime)){
            setErrors({...errors, travel: 'Travel time can not be greater then total time'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, travel: null});
            }, 3000);
        }
        else if(!employee){
            setErrors({...errors, employee: 'Select Employee'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, employee: null});
            }, 3000);
        }
        else{
            setErrors({
                project: null,
                date: null,
                startTime: null,
                endTime: null,
                travel: null,
                employee: null
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
        if(newValue){
            setValues({
            ...values,
            project: newValue.id
            });
        };
    };

    let picker = ''

    switch(menuSelection) {
        case 1:
            picker = 
                <ServicePicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={segment}
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
                    editObject={segment}
                    errors={errors}
                    editProject={values.project}
                />
        break;
        case 3:
            picker = 
                <QuotePicker
                    token={token}
                    // handleChangeQuote={handleChangeQuote}
                    errors={{quote: ''}}
                />
        break;
        default:
            picker = 
                <ProjectPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={segment}
                    errors={errors}
                    editProject={values.project}
                    open={openAdd}
                />
            
    }

    return (
        <div>
            <Dialog 
                // keepMounted
                TransitionComponent={Transition}
                fullWidth
                fullScreen 
                open={openAdd} 
                onClose={handleClose}
                scroll={'body'}
                
                >
                <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            {`${editing ? 'Edit' : 'Add'} Worksegment`}
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
                    <FieldShopOfficeToggle
                        handleChangeSegmentType={handleChangeSegmentType}
                        workTypes={workTypes}
                        values={values}
                    />
                    {user.is_staff ? 
                    <div>
                        <EmployeePicker
                            editing={editing}
                            editObject={segment}
                            employee={employee}
                            errors={errors}
                            user={user}
                            token={token}
                            handleChangeEmployee={handleChangeEmployee}
                        />
                    </div> : ''
                    }
                        <Stack direction="row" spacing={1}>
                            {picker}
                            <ProjectTypeDropdown
                                user={user}
                                menuOptions={menuOptions}
                                menuSelection={menuSelection}
                                setMenuSelection={setMenuSelection}
                            />
                        </Stack>
    {/* 
                        <ProjectPicker
                            editing={editing}
                            editObject={segment}
                            token={token}
                            handleChangeProject={handleChangeProject}
                            errors={errors}
                            editProject={values.project}
                        /> */}
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
                        autoFocus={false}
                        onFocus={event => {
                            event.target.select();
                        }}
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
                        autoFocus={false}
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
}
