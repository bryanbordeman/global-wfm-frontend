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
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

import { styled, alpha } from '@mui/material/styles';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        {...props}
    />
    ))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
        padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
        },
        '&:active': {
            backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
            ),
        },
        },
    },
    }));

const currentDate = new Date()

function DueDate(props) {
    const { list, updateTask } = props
    const [ isForcePickerOpen, setIsOpen ] = React.useState(false);
    const [ value, setValue ] = React.useState(list.due)
    const customInputRef = useRef();

    const handleDateChange = (newDate) => {
        const pythonDate = newDate.toISOString().split('T')[0];
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
                    sx={{mr: 1, whiteSpace: 'nowrap', textTransform: 'none', borderColor: 'rgba(0, 0, 0, 0.12)'}}
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
    const { selectedList, 
            updateTask, 
            handleOpenTaskForm, 
            handleOpenSubtaskForm,
            setEditing, 
            completeSubtask } = props
    const [open, setOpen] = React.useState({});
    const style = { textDecoration: 'line-through'};

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };



    const handleClick = (id) => {
        setOpen((prevState => ({...prevState, [id]: !prevState[id]})));
    };


    const handleSubtaskCompleted = (id) => {
        completeSubtask(id)
    }
    
return (
    <List 
        sx={{ mb: 3, pb: 0, pt:0, width: '100%', bgcolor: 'background.paper', border: 1, borderRadius:2, borderColor: 'grey.500' }}
        
    >
    {selectedList.map((list, i) => {
        const labelId = `list-label-${list.title}`;
        let subtasks = list.subtasks.map(sublist => (sublist))
        
        return (
        <div key={list.id}>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
            >
                <MenuItem 
                    // sx={{color: 'primary.main'}} 
                    onClick={handleMenuClose} 
                    disableRipple
                >
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem 
                    // sx={{color: 'primary.main'}} 
                    onClick={handleMenuClose} 
                    disableRipple
                >
                    <PlaylistAddIcon />
                    Add Subtask
                </MenuItem>
                <MenuItem 
                    sx={{mb:2}} 
                    onClick={handleMenuClose} 
                    disableRipple
                >
                    <CheckCircleIcon />
                    Complete Task
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem 
                    sx={{color: 'error.dark', mt:2}} 
                    onClick={handleMenuClose} 
                    disableRipple
                >
                <DeleteIcon style={{ fill: '#B00020'}}/>
                    Delete
                </MenuItem>
            </StyledMenu>
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
                // onClick={() => {
                //     handleOpenTaskForm();
                //     setEditing(true);
                //     }}
                onClick={handleMenuClick}
            >
                <ListItemIcon>
                <Chip 
                    sx={{mr:1}} 
                    variant='outlined'
                    size='small' 
                    color='primary' 
                    label={`${list.project.number}`} 
                />
                </ListItemIcon>
                <ListItemText 
                    primaryTypographyProps={{ 
                        style: {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }
                    }}
                    id={labelId} 
                    primary={`${list.title}`}
                    />
            </ListItemButton>
            <Grid 
                xs="auto"
                item
                container 
                justifyContent="flex-end" 
                alignItems="flex-end">
            <DueDate
                list={list}
                updateTask={updateTask}
            />
            </Grid>
        </ListItem>
        {subtasks.length > 0 ? 
        <div>
        <ListItemButton onClick={() => handleClick(list.id)}>
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
            in={open[list.id]}
            timeout="auto" 
            unmountOnExit
        > {subtasks.map((subT, j) => {
            const sublistIndex = [list.id, subT.id]
            const subLabelId = `checkbox-list-label-${subT.title}`;
            // const [checked, setChecked] = React.useState([]);

            // const handleToggle = (value) => () => {
            // const currentIndex = checked.indexOf(value);
            // const newChecked = [...checked];

            // if (currentIndex === -1) {
            //     newChecked.push(value);
            // } else {
            //     newChecked.splice(currentIndex, 1);
            // }
            //     setChecked(newChecked);
            //     setIsComplete(!isComplete)
            // };
    
            return (
            <List 
                dense
                key={subT.id} 
                component="div" 
                disablePadding
            >
                <Divider/>
                <ListItem
                    sx={{ borderRadius: 2 }} 
                    // sx={{bgcolor: 'grey.100', borderRadius: 2}} 

                    secondaryAction={
                    <Checkbox
                    edge="end"
                    onClick={() => handleSubtaskCompleted(subT.id)}
                    checked={subT.is_complete}
                    // checked={subT.is_complete}
                    inputProps={{ 'aria-labelledby': subLabelId }}
                />
                }
                >
            <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => {
                    handleOpenSubtaskForm(subT.id);
                    setEditing(true);
                }}
            >
                <ListItemText 
                    sx={subT.is_complete? style : {}}
                    secondary={`${subT.title}`} 
                />
            </ListItemButton>
            </ListItem>
            </List>
            
            )
    })}
        </Collapse> </div>: ''}
        {i < selectedList.length - 1 && <Divider  sx={{ borderColor: 'grey.500' }}
/>}
        </div>
        );
    })}
    </List>
    
);
};

