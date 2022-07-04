import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, Chip } from '@mui/material';
import moment from 'moment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const currentDate = new Date()

export default function TaskList(props) {
    const { selectedList } = props
    const [checked, setChecked] = React.useState([0]);
    const [isForcePickerOpen, setIsOpen] = React.useState(false);
    const [selectedDate, handleDateChange] = React.useState(new Date());

    const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
    newChecked.push(value);
    } else {
    newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
};

return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {selectedList.map((list, i) => {
        const labelId = `checkbox-list-label-${list.title}`;
        let dateDelta = Math.ceil((new Date(list.due).getTime()-currentDate.getTime())/(1000 * 3600 * 24))
        let dueMessage = ''

        switch(true) {
            case (dateDelta === 0):
                dueMessage = 'Today'
            break;
            case (dateDelta === 1):
                dueMessage = 'Tomorrow'
            break;
            case (dateDelta < 0):
                dueMessage = `${Math.abs(dateDelta)} days ago`
            break;
            case (dateDelta > 1):
                dueMessage = `In ${dateDelta} days`
            break;

            default:
                dueMessage = ''
        }

        return (
        <div key={list.id}>
        <ListItem
            // secondaryAction={
            //     <Checkbox
            //     edge="end"
            //     onChange={handleToggle(i)}
            //     checked={checked.indexOf(i) !== -1}
            //     inputProps={{ 'aria-labelledby': labelId }}
            // />
            // }
            disablePadding
        >
            <ListItemButton>
            <ListItemIcon>
            <Chip 
                sx={{mr:1}} 
                variant='outlined'
                size='small' 
                color='primary' 
                label={`${list.project.number}`} 
            />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${list.title}`} />
            </ListItemButton>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                open={isForcePickerOpen}
                onClose={() => setIsOpen(false)}
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={({
                    ref,
                    inputProps,
                    disabled,
                    onChange,
                    value,
                    ...other
                }) => (
                    <div ref={ref} {...other}>
                    <input
                        style={{ display: "none" }}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        {...inputProps}
                    />
                    <Button
                        sx={{mr: 1, textTransform: 'none', borderColor: 'rgba(0, 0, 0, 0.12)'}}
                        size='small'
                        variant="outlined"
                        color={dateDelta < 0? 'warning' : 'primary'}
                        onClick={() => setIsOpen(isOpen => !isOpen)}
                        startIcon={<EventAvailableIcon />}
                    >
                        {dueMessage}
                    </Button>
                    </div>
                )}
                />
            </LocalizationProvider>
        </ListItem>
        {i < selectedList.length - 1 && <Divider/>}
        </div>
        );
    })}
    </List>
);
}

