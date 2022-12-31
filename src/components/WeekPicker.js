import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DatePicker } from '@mui/x-date-pickers'
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import moment from 'moment';
import locale from 'date-fns/locale/en-GB'

const CustomPickersDay = styled(PickersDay, {
shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
    backgroundColor: theme.palette.primary.dark,
    },
}),
...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
}),
...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
}),
}));

export default function WeekPicker(props) {
const [value, setValue] = React.useState(new Date());
const [isoWeek, setIsoWeek] = React.useState(moment(new Date()).format('GGGG[W]WW'));

React.useEffect(() => {
    props.getIsoWeek(isoWeek)
    }
);

const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
    return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value);
    start.setDate(startOfWeek(value).getDate() + 1);
    const end = endOfWeek(value);
    end.setDate(endOfWeek(value).getDate() + 1);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
    <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
    />
    );
};

return (
    <LocalizationProvider 
        dateAdapter={AdapterDateFns} 
        locale={locale}
    >
    <DatePicker
        displayStaticWrapperAs="desktop"
        label={isoWeek}
        value={value}
        onChange={(newValue) => {
        setValue(newValue);
        setIsoWeek(moment(newValue).format('GGGG[W]WW'))
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        disableMaskedInput={true}
        inputFormat="'Week 'w"
    />
    </LocalizationProvider>
    );
};
