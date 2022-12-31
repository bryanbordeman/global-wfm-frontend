import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserService from '../services/User.services';
import CircularProgress from '@mui/material/CircularProgress';

export default function AssigneePicker(props) {
    const { handleChangeAssignee, errors, token, handleOpenSnackbar} = props;
    const { task, editing } = props;
    const [ value, setValue ] = React.useState(null);
    const [ assignees, setAssignees ] = React.useState([{}]);
    const [ inputValue, setInputValue ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);

    React.useEffect(() => {
        retrieveEmployees()
    },[]);


    const retrieveEmployees = () => {
        setIsLoading(true);
        UserService.getUsers(token)
        .then(response => {
            setAssignees(response.data);
            if(editing){
                handleInputValue(task.assignee);
            };
        })
        .catch( e => {
            console.log(e);
            setIsLoading(false);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

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
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                    <React.Fragment>
                                        {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                    ),
                                }}
                                id="assignee"
                                name='assignee'
                                label="Search Assignees" 
                                />}
        />
    );
};