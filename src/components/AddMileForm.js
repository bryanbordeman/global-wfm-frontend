import * as React from 'react';
import ExpenseDataService from '../services/Expense.services'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField, Divider } from '@mui/material';
import EmployeePicker from './EmployeePicker';
import ProjectPicker from './ProjectPicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AddMileForm(props) {
    const { user, token } = props
    const { openMiles, setOpenMiles } = props;
    const { editing, expense, updateMiles } = props
    const { employee, handleChangeEmployee } = props
    const { handleOpenSnackbar, createMiles } = props
    const [ currentRate, setCurrentRate ] = React.useState('')
    const [ values, setValues ] = React.useState({});
    const [ errors, setErrors ] = React.useState({
        project: null,
        miles: null,
        date_purchased: null,
        employee: null
    })
    const [ isValid, setIsValid ] = React.useState(true)

    const initialFormValues = {
        project: '',
        miles: '',
        date_purchased: new Date(),
        notes: ''
    }

    const editFormValues = {
        project: editing ? expense.project.id : expense.project,
        miles: expense.miles,
        date_purchased: editing ? new Date(expense.date_purchased.replace('-', '/').replace('-', '/')) : new Date(),
        notes: expense.notes
    }

    React.useEffect(() => {
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
        if(newValue){
            setValues({
            ...values,
            project: newValue.id
            });
        }
    };

    const handleSubmit = () => {
        const data = {
            project: values.project, 
            rate: currentRate.id,
            miles: values.miles,
            is_approved: false,
            date_purchased: String(values.date_purchased)? values.date_purchased : values.date_purchased.toISOString().split('T')[0],
            notes: ''
        };

        if(editing){
            updateMiles(expense.id, data);
            setOpenMiles(false);

        }
        else {
            createMiles(data);
            setOpenMiles(false);
        };

    };

    const handleClose = () => {
        setOpenMiles(!openMiles)
    };

    return (
        <div>
        <Dialog
            fullWidth
            open={openMiles}
            onClose={handleClose}
        >
            <DialogTitle>{`Add Miles | $${parseFloat(currentRate.rate).toFixed(2)} mile`} </DialogTitle>
            <Divider/>
            <DialogContent>
                <Stack direction="column" spacing={2}>
                {user.is_staff ?
                <div>
                {editing ?
                    <TextField
                        autoFocus={false}
                        margin="dense"
                        disabled
                        id="employee"
                        name='employee'
                        label="Employee"
                        value={`${expense.user.first_name} ${expense.user.last_name}`}
                        type="text"
                        fullWidth
                        variant="outlined"
                    /> 
                    :
                <EmployeePicker
                    employee={employee}
                    errors={errors}
                    user={user}
                    token={token}
                    handleChangeEmployee={handleChangeEmployee}
                />
                }
                </div> : ''}     
                {editing ?
                <TextField
                    autoFocus={false}
                    margin="dense"
                    disabled
                    id="project"
                    name='project'
                    label="Project"
                    value={expense.project.number}
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
                onClick={handleSubmit}
                color={`${isValid? 'primary' : 'error'}`}
            >
                {/* {editing ? 'Update' : 'Submit'} */}
                Submit
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}