import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserService from '../services/User.services'

export default function EmployeePicker(props) {
    const { handleChangeEmployee, errors} = props
    const [ value, setValue ] = React.useState(null)
    const [ employees, setEmployees ] = React.useState([{}])
    const [ inputValue, setInputValue ] = React.useState('');

    React.useEffect(() => {
        retrieveEmployees()
        handleChangeEmployee(value)
    },[])

    const retrieveEmployees = () => {
        UserService.getUsers(props.token)
        .then(response => {
            setEmployees(response.data);
        })
        .catch( e => {
            console.log(e);
        })
    }
    const handleInputValue = (newValue) => {
        setValue(newValue);
        handleChangeEmployee(newValue)
    };

    return (
        <Autocomplete
        disablePortal
        fullWidth
        autoSelect = {false}
        blurOnSelect = 'touch'
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
        renderInput={(params) => <TextField 
                                helperText={errors && errors.employee? errors.employee : ''}
                                error={errors && errors.employee? true : false}
                                {...params} 
                                id="employee"
                                name='employee'
                                label="Search Employees" 
                                />}
        />
    );
};