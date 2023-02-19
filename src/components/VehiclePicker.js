import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function VehiclePicker(props) {
    const { vehicles, errors } = props; // all vehicles
    const [ value, setValue ] = React.useState('') // picker value
    const { values, setValues } = props; // form values

    const handleChange = (event) => {
        setValue(event.target.value);
        setValues({...values, vehicle: event.target.value.id })
    };
    
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={errors.vehicle}>
                <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
                <Select
                    // disabled={propVehicle.lenght > 0? true : false}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Vehicle"
                    onChange={handleChange}
                >
                    {vehicles.map(v => (
                        <MenuItem 
                            key={v.id} 
                            value={v}
                            >   {v.nickname}
                        </MenuItem>
                    )
                        )}
                </Select>
                {errors.vehicle && <FormHelperText error={errors.vehicle? true : false}>This is required!</FormHelperText>}
            </FormControl>
        </Box>
    );
}