import * as React from 'react';
import ExpenseDataService from '../services/Expense.services'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField, Divider, IconButton } from '@mui/material';
import EmployeePicker from './EmployeePicker';
import ProjectPicker from './ProjectPicker';
import QuotePicker from './QuotePicker';
import ServicePicker from './ServicePicker';
import HSEPicker from './HSEPicker';
import ProjectTypeDropdown from './ProjectTypeDropdown';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment-timezone';
import Transition from './DialogTransistion'

export default function AddMileForm(props) {
    const { user, token } = props
    const { openMiles, setOpenMiles } = props;
    const { editing, expense, updateMiles } = props
    const { employee, handleChangeEmployee } = props
    const { handleOpenSnackbar, createMiles } = props
    const [ currentRate, setCurrentRate ] = React.useState('');
    const [ values, setValues ] = React.useState({});
    const [ errors, setErrors ] = React.useState({
        project: null,
        miles: null,
        date_purchased: null,
        employee: null
    });
    const [ isValid, setIsValid ] = React.useState(true);
    const [ menuOptions, setMenuOptions ] = React.useState(['Projects', 'Services', "HSE's"]);
    const [ menuSelection, setMenuSelection ] = React.useState(0);
    const didMount = React.useRef(false);

    React.useEffect(() => {
        if(user.groups.filter(group => (group.name === 'SALES')).length > 0){
            setMenuOptions(['Projects', 'Services', "HSE's", 'Quotes']);
        }
    },[])

    React.useEffect(() => {
        if (didMount.current) {
            if(editing){
                if(expense.service !== null){
                    setMenuSelection(1)
                }
                if(expense.hse !== null){
                    setMenuSelection(2)
                }
                if(expense.quote !== null){
                    setMenuSelection(3)
                }
                if(expense.project !== null){
                    setMenuSelection(0)
                }
            }
        } else {
            didMount.current = true;
        }
    },[props]);
    
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
    },[menuSelection])

    const initialFormValues = {
        project: '',
        service: '',
        hse: '',
        quote:'',
        miles: '',
        date_purchased: new Date(),
        notes: ''
    }

    const editFormValues = {
        quote: editing && expense.quote != null ? expense.quote.id : expense.quote,
        project: editing && expense.project != null ? expense.project.id : expense.project,
        service: editing && expense.service != null? expense.service.id : expense.service,
        hse: editing && expense.hse != null ? expense.hse.id : expense.hse,
        miles: expense.miles,
        date_purchased: editing ? new Date(expense.date_purchased.replace('-', '/').replace('-', '/')) : new Date(),
        notes: expense.notes
    }

    React.useLayoutEffect(() => {
        retrieveMileRates()
        setValues(editing ? editFormValues : initialFormValues)
    },[openMiles])

    const retrieveMileRates= () => {
        ExpenseDataService.getAllMileRates(token)
        .then(response => {
            setCurrentRate(response.data.reverse().find(rate => rate.is_current === true))
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
    }

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        if(name === 'miles'){
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

    const handleSubmit = () => {
        const data = {
            quote: values.quote,
            project: values.project, 
            service: values.service, 
            hse: values.hse, 
            rate: currentRate.id,
            miles: values.miles,
            is_approved: false,
            date_purchased: moment.tz(values.date_purchased, "America/New_York")._d.toISOString().split('T')[0],
            // date_purchased: String(values.date_purchased)? String(values.date_purchased) : values.date_purchased.toISOString().split('T')[0],
            notes: values.notes
        };

        if(editing){
            updateMiles(expense.id, data);
            setOpenMiles(false);

        }
        else {
            // console.log(data)
            createMiles(data);
            setOpenMiles(false);
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
        else if(values.date_purchased > new Date()){
            setErrors({...errors, date_purchased: 'Date cannot be in the future.'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, date_purchased: null});
            }, 3000);
        }
        else if(!values.miles){
            setErrors({...errors, miles: 'Enter valid Miles'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, miles: null});
            }, 3000);
        }
        else if(isNaN(values.miles)){
            setErrors({...errors, miles: 'Miles needs to be a number'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, miles: null});
            }, 3000);
        }
        else if(values.miles <= 0){
            setErrors({...errors, miles: 'Miles needs to be greater then 0'});
            formIsValid = false;
            setTimeout(() => {
                formIsValid = true;
                setErrors({...errors, miles: null});
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
                miles: null,
                date_purchased: null,
                employee: null
            });
            formIsValid = true;
        }
        setIsValid(formIsValid)
        setTimeout(() => {
            setIsValid(true);
        }, 3000);
        return formIsValid ? handleSubmit() : null
    }

    const handleClose = () => {
        setOpenMiles(!openMiles)
    };

    let picker = <div></div>

    switch(menuSelection) {
        case 1:
            picker = 
                <ServicePicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={expense}
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
                    editObject={expense}
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
                    editObject={expense}
                    // editProject={values.project}
                />
        break;
        default:
            picker = 
                <ProjectPicker
                    token={token}
                    handleChangeProject={handleChangeProject}
                    editing={editing}
                    editObject={expense}
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
            open={openMiles}
            onClose={handleClose}
        >
            <DialogTitle>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                    {`${editing? 'Update' : 'Add'} Miles | $${parseFloat(currentRate.rate).toFixed(2)} mile`} 
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
                {user.is_staff ?
                <EmployeePicker
                    editing={editing}
                    editObject={expense}
                    employee={employee}
                    errors={errors}
                    user={user}
                    token={token}
                    handleChangeEmployee={handleChangeEmployee}
                />
                : ''}     
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
                        label="Date"
                        id="date_purchased"
                        name="date_purchased"
                        value={values.date_purchased}
                        onChange={(date) => {setValues({...values, date_purchased: date})}}
                        renderInput={(params) => <TextField {...params} helperText={errors.date_purchased === null ? '' : errors.date_purchased}
                        error={errors.date_purchased? true : false} />}
                        fullWidth
                    />
                </LocalizationProvider>
                <TextField
                    autoFocus={false}
                    onFocus={event => {
                        event.target.select();
                    }}
                    margin="dense"
                    id="miles"
                    name="miles"
                    onChange={handleInputValue}
                    value={values.miles}
                    label="Miles"
                    type="number"
                    fullWidth
                    variant="outlined"
                    helperText={errors.miles === null ? '' : errors.miles}
                    error={errors.miles? true : false}
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
}