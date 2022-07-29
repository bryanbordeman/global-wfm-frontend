import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserService from '../services/User.services'

export default function AssigneePicker(props) {
    const { handleChangeAssignee, errors} = props;
    const { task, editing } = props;
    const [ value, setValue ] = React.useState(null);
    const [ assignees, setAssignees ] = React.useState([{}]);
    const [ inputValue, setInputValue ] = React.useState('');

    React.useEffect(() => {
        retrieveEmployees()
    },[])

    const retrieveEmployees = () => {
        UserService.getUsers(props.token)
        .then(response => {
            setAssignees(response.data);
            if(editing){
                handleInputValue(task.assignee);
            };
        })
        .catch( e => {
            console.log(e);
        })
    }
    const handleInputValue = (newValue) => {
        setValue(newValue);
        handleChangeAssignee(newValue);
    };

    return (
        <Autocomplete
        clearOnEscape
        disablePortal
        fullWidth
        autoSelect = {false}
        blurOnSelect = 'touch'
        // value={editing? task.assignee : value}
        value={value}
        onChange={(event, newValue) => {
            handleInputValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
        }}
        options={assignees}
        getOptionLabel={(option) => (`${option.first_name} ${option.last_name}`)}
        isOptionEqualToValue={(option, newValue) => {
            return option.id === newValue.id;
        }}
        renderInput={(params) => <TextField 
                                helperText={errors && errors.assignee? errors.assignee : ''}
                                error={errors && errors.assignee? true : false}
                                {...params} 
                                // value={employee}
                                id="assignee"
                                name='assignee'
                                label="Search Assignees" 
                                />}
        />
    );
};