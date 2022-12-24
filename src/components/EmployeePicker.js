import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserService from '../services/User.services'
import CircularProgress from '@mui/material/CircularProgress';

export default function EmployeePicker(props) {
    const { handleChangeEmployee, errors} = props
    const { editing, editObject } = props
    const [ value, setValue ] = React.useState(null)
    const [ employees, setEmployees ] = React.useState([{}])
    const [ inputValue, setInputValue ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);

    React.useEffect(() => {
        retrieveEmployees()
    },[]);

    const retrieveEmployees = () => {
        setIsLoading(true);
        UserService.getUsers(props.token)
        .then(response => {
            setEmployees(response.data);
            if(editing){
                handleInputValue(editObject.user);
                handleChangeEmployee(editObject.user);
            };
        })
        .catch( e => {
            console.log(e);
        })
        .finally(() => {
            // setTimeout(() => {
                setIsLoading(false);
            // }, 3000);
        });
    }
    const handleInputValue = (newValue) => {
        setValue(newValue);
        handleChangeEmployee(newValue)
    };

    return (
        <Autocomplete
            clearOnEscape
            disablePortal
            fullWidth
            autoSelect = {false}
            blurOnSelect = {false}
            // blurOnSelect = 'touch'
            loading={isLoading}
            disabled={isLoading}
            value={value}
            onChange={(event, newValue) => {
                handleInputValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            options={employees}
            getOptionLabel={(option) => (`${option.first_name} ${option.last_name}`)}
            isOptionEqualToValue={(option, newValue) => {
                return option.id === newValue.id;
            }}
            renderInput={(params) => <TextField 
                        helperText={errors && errors.employee? errors.employee : ''}
                        error={errors && errors.employee? true : false}
                        {...params} 
                        InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                                ),
                            }}
                        id="employee"
                        name='employee'
                        label={isLoading? "Loading..." : "Search Employees"}
                        />}
        />
    );
};