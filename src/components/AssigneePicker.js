import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AssigneePicker(props) {
    const { handleChangeAssignee, errors } = props;
    const { user, employees } = props;
    const { task, editing } = props;
    const [ value, setValue ] = React.useState(null);
    const [ inputValue, setInputValue ] = React.useState('');

    React.useEffect(() => {
        //! errors when reload
        if(employees.length > 0 && user){
            let newValue = employees.find((e) => e.id === user.id)
            handleInputValue(newValue)
        }
        if(editing){
            handleInputValue(task.assignee);
        };
    },[]);

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
                                helperText={errors && errors.assignee? errors.assignee : ''}
                                error={errors && errors.assignee? true : false}
                                {...params} 
                                id="assignee"
                                name='assignee'
                                label="Search Assignees" 
                                />}
        />
    );
};