import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, Chip } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRef } from 'react';
import { parseISO } from 'date-fns';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const currentDate = new Date()

function DueDate(props) {
    const { list, updateTask } = props
    const [ isForcePickerOpen, setIsOpen ] = React.useState(false);
    const [ value, setValue ] = React.useState(list.due)
    const customInputRef = useRef();

    const handleDateChange = (newDate) => {
        // const day = newDate.getUTCDate() - 1; // day in is off by one day after it is converted
        // const month = newDate.getUTCMonth() + 1; // Return Value is 0 indexed
        // const year = newDate.getUTCFullYear();

        const pythonDate = newDate.toISOString().split('T')[0]

 
        let data = 
        {
            "title": list.title,
            "notes": list.notes,
            "due": pythonDate,
            "created": list.created,
            "is_complete": list.is_complete,
            "is_deleted": list.is_deleted,
            "is_read": list.is_read,
            "completed": list.completed,
            "updated": list.updated,
            "created_by": list.created_by.id,
            "assignee": list.assignee.id,
            "tasklist": list.tasklist.id,
            "project": list.project.id,
            "subtasks": list.subtasks.id
        }
        console.log(list.subtasks)
        updateTask(list.id, data)
        setValue(pythonDate)
    }

    let dateDelta = Math.ceil((new Date(value).getTime()-currentDate.getTime())/(1000 * 3600 * 24))
        let dueMessage = ''

        switch(true) {
            case (dateDelta === 0):
                dueMessage = 'Today'
            break;
            case (dateDelta === 1):
                dueMessage = 'Tomorrow'
            break;
            case (dateDelta < 0 && dateDelta !== -1):
                dueMessage = `${Math.abs(dateDelta)} days ago`
            break;
            case (dateDelta === -1):
                // dueMessage = `${Math.abs(dateDelta)} day ago`
                dueMessage = 'Yesterday'
            break;
            case (dateDelta > 1):
                dueMessage = `In ${dateDelta} days`
            break;

            default:
                dueMessage = ''
        }
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
            open={isForcePickerOpen}
            onClose={() => {
                setIsOpen(false);
            }}
            value={parseISO(value)}
            onChange={(newDate) => {
                handleDateChange(newDate);
            }}
            PopperProps={{ anchorEl: customInputRef.current }}
            renderInput={({
                ref,
                inputProps,
                disabled,
                onChange,
                value
            }) => (
                <div ref={ref}>
                <input
                    style={{ opacity: 0, width: 0, height: 0 }}
                    value={parseISO(value)}
                    onChange={onChange}
                    disabled={disabled}
                    ref={customInputRef}
                    {...inputProps}
                />
                <Button
                    sx={{mr: 1, textTransform: 'none', borderColor: 'rgba(0, 0, 0, 0.12)'}}
                    size='small'
                    variant="outlined"
                    color={dateDelta < 0? 'warning' : 'primary'}
                    onClick={() => {
                        setIsOpen(isOpen => !isOpen);
                        
                    }}
                    startIcon={<EventAvailableIcon />}
                >
                    {dueMessage}
                </Button>
                </div>
            )}
            />
        </LocalizationProvider>
    );
};

export default function TaskList(props) {
    const { selectedList, updateTask, handleOpenAddTask } = props
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    // const [checked, setChecked] = React.useState([0]);

    // const handleToggle = (value) => () => {
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //     newChecked.push(value);
    // } else {
    //     newChecked.splice(currentIndex, 1);
    // }
    //     setChecked(newChecked);
    // };
    

return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {selectedList.map((list, i) => {
        const labelId = `checkbox-list-label-${list.title}`;
        let subtasks = list.subtasks.map(sublist => (sublist))
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
            <ListItemButton
                onClick={handleOpenAddTask}>
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
            <DueDate
                list={list}
                updateTask={updateTask}
            />
        </ListItem>
        {subtasks.length > 0 ? 
        <div>
        <ListItemButton onClick={handleClick}>
            <ListItemText 
                // primary={
                //     <Chip 
                //         sx={{ml:1}} 
                //         size="small" 
                //         label={subtasks.length}
                //         color='primary'
                //     />
                // } 
                secondary={
                    subtasks.length > 1 ? 
                    <span>
                        <Chip 
                        as="span"
                        sx={{borderColor: 'rgba(0, 0, 0, 0.12)'}} 
                        size="small" 
                        label={subtasks.length}
                        variant='outlined'
                        color='primary'
                    />
                    <span>{` Subtasks`}</span>
                    </span> : 
                    <span>
                        <Chip
                        as="span" 
                        sx={{borderColor: 'rgba(0, 0, 0, 0.12)'}} 
                        size="small" 
                        label={subtasks.length}
                        variant='outlined'
                        color='primary'
                    />
                    <span>{` Subtask`}</span>
                    </span>
                }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse 
            in={open} 
            timeout="auto" 
            unmountOnExit
        > {subtasks.map(subT => (
            <List key={subT.id} component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemText secondary={`${subT.title}`} />
            </ListItemButton>
            </List>
        ))}
        </Collapse> </div>: ''}
        {i < selectedList.length - 1 && <Divider/>}
        </div>
        );
    })}
    </List>
    
);
};

