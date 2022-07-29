import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserService from '../services/User.services'

export default function EmployeePicker(props) {
    const { handleChangeEmployee, errors} = props
    const { editing, editObject } = props
    const [ value, setValue ] = React.useState(null)
    const [ employees, setEmployees ] = React.useState([{}])
    const [ inputValue, setInputValue ] = React.useState('');

    React.useEffect(() => {
        retrieveEmployees()
        // if(editing){
        //     handleInputValue(editObject.user);
        //     handleChangeEmployee(editObject.user);
        // };
        // if(value !== null){
        //     handleChangeEmployee(value)
        //     setInputValue('')
        // }
    },[])

    // React.useEffect(() => {
    //     if(employee === null){
    //         setInputValue({});
    //         setValue({});
    //     }
    // },[])

    const retrieveEmployees = () => {
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
        blurOnSelect = 'touch'
        
        value={value}
        onChange={(event, newValue) => {
            handleInputValue(newValue);
        }}
        // onInputChange={(event, newInputValue, reason) => {
        //     if (reason === 'reset') {
        //         setValue('')
        //         return
        //         } else {
        //         setValue(newInputValue)
        //         }
        //     }}
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
                                // value={employee}
                                id="employee"
                                name='employee'
                                label="Search Employees" 
                                />}
        />
    );
};