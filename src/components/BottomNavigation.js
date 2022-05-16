import * as React from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddCardIcon from '@mui/icons-material/AddCard';

import Paper from '@mui/material/Paper';


export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            >
            <BottomNavigationAction label="Schedule" icon={<DateRangeIcon />} />
            <BottomNavigationAction label="Timesheets" icon={<MoreTimeIcon />} />
            <BottomNavigationAction label="Expenses" icon={<AddCardIcon />} />
            </BottomNavigation>
        </Paper>
    )
};
