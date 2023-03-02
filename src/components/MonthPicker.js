import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MonthPicker(props) {
    const [ value, setValue ] = React.useState(new Date());
    const { handleChangeMonth } = props

    const today = new Date();
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
            views={['year', 'month']}
            label="Year and Month"
            minDate={today.setFullYear(today.getFullYear() - 1)}
            maxDate={today.setFullYear(today.getFullYear() + 1)}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
                handleChangeMonth(newValue)
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
            />
        </LocalizationProvider>
    );
};
