import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MonthPicker(props) {
    const [value, setValue] = React.useState(new Date());
    const { handleChangeMonth } = props

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
            views={['year', 'month']}
            label="Year and Month"
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
                handleChangeMonth(newValue)
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
            />
        </LocalizationProvider>
    );
}
