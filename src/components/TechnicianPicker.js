import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function TechnicianPicker(props) {
    const { handleChangeTechnician, errors, user } = props
    const { editing, editObject } = props
    const { employees } = props;
    const [value, setValue] = React.useState(null)

    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        if (editing) {
            handleInputValue(editObject.technician)
        } else {
            handleInputValue(user)
        }
        setIsLoading(false);
    }, []);

    const handleInputValue = (newValue) => {
        setValue(newValue);
        handleChangeTechnician(newValue)
    };

    return (
        <Autocomplete
            clearOnEscape
            disablePortal
            fullWidth
            autoSelect={false}
            blurOnSelect={false}
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
                helperText={errors && errors.employee ? errors.employee : ''}
                error={errors && errors.employee ? true : false}
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
                id="technician"
                name='technician'
                label={isLoading ? "Loading..." : "Search Technicians"}
            />}
        />
    );
};