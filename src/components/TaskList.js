import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
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
import { v4 as uuidv4 } from 'uuid';

import { styled, alpha } from '@mui/material/styles';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import moment from 'moment-timezone';
import Tooltip from '@mui/material/Tooltip';

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
            fontSize: '1.25rem',
            // color: theme.palette.text.secondary,
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


const currentDate = moment.tz(new Date(), "America/New_York")._d

// const offset = currentDate.getTimezoneOffset();
// console.log(offset);    // 240

function DueDate(props) {
    const { list, updateTask, darkState} = props
    const [ isForcePickerOpen, setIsOpen ] = React.useState(false);
    const [ value, setValue ] = React.useState(list.due)
    const customInputRef = useRef();

    React.useLayoutEffect(() => {
        setValue(list.due)
    },[list])

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
            "project": list.project? list.project.id : '',
            "quote": list.quote? list.quote.id : '',
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
                    sx={{mr: 1, whiteSpace: 'nowrap', textTransform: 'none', borderColor: !darkState? 'rgba(0, 0, 0, 0.12)' : ''}}
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
    const { user,
            selectedList, 
            updateTask,
            setTask, 
            task,
            handleOpenTaskForm, 
            handleOpenSubtaskForm,
            setEditing, 
            completeSubtask,
            completeTask,
            readTask,
            setOpenTaskDialog,
            darkState } = props;
    const { setOpenDelete } = props;

    const [open, setOpen] = React.useState({});
    const style = { textDecoration: 'line-through'};

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    
    const handleMenuClick = (event, list) => {
        setAnchorEl(event.currentTarget);
        setTask(list);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDeleteTask = () => {
        setOpenDelete(true);
    }

    const handleClick = (id) => {
        setOpen((prevState => ({...prevState, [id]: !prevState[id]})));
    };


    const handleSubtaskCompleted = (id) => {
        completeSubtask(id)
    }

return (
    <List
        sx={{ mb: 3, pb: 0, pt:0, width: '100%', bgcolor: 'background.paper', border: 1, borderRadius:2, borderColor: "#1C88B0 !important" }}
    >
    {selectedList.map((list, i) => {
        const labelId = `list-label-${list.title}`;
        let subtasks = list.subtasks.map(sublist => (sublist))
        let number = ''
        let name = ''
        // set number based on type
        if(list.project){
            number =list.project.number
            name =list.project.name
        }
        if(list.service){
            number =list.service.number
            name =list.service.name
        }
        if(list.hse){
            number =list.hse.number
            name =list.hse.name
        }
        if(list.quote){
            number =list.quote.number
            name =list.quote.name
        }
        return (
            <div key={list.id}>
                <StyledMenu
                    key={list.id}
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                >
                    <MenuItem 
                        sx={{color: 'primary.main'}} 
                        onClick={() => {
                            setEditing(true);
                            setOpenTaskDialog(true);
                            handleMenuClose();
                            if (task.is_read === false && user.id === task.assignee.id) {
                                readTask(task.id);
                            } 
                        }} 
                        disableRipple
                    >
                        <PreviewIcon />
                        Preview
                    </MenuItem>
                    {task && task.assignee && task.assignee.id && (user.id === task.assignee.id || user.id === task.created_by.id)?
                    <MenuItem 
                        sx={{color: 'primary.main'}} 
                        onClick={() => {
                            setEditing(true);
                            handleOpenTaskForm();
                            handleMenuClose();
                            if (task.is_read === false && user.id === task.assignee.id) {
                                readTask(task.id);
                            } 
                        }} 
                        disableRipple
                    >
                        <EditIcon />
                        Edit
                    </MenuItem>
                    :''}
                    {task && task.assignee && task.assignee.id && (user.id === task.assignee.id || user.id === task.created_by.id)?
                    <MenuItem 
                        sx={{color: 'primary.main'}} 
                        onClick={() => {
                            handleMenuClose();
                            handleOpenSubtaskForm();
                            }} 
                        disableRipple
                    >
                        <PlaylistAddIcon />
                        Add Subtask
                    </MenuItem>
                    :''}
                    {task && task.assignee && task.assignee.id && (user.id === task.assignee.id)?
                    <MenuItem 
                        sx={{mb:2, color: 'success.main'}} 
                        onClick={() => {
                            handleMenuClose();
                            completeTask();
                        }}
                        disableRipple
                    >
                        <CheckCircleIcon />
                        Complete Task
                    </MenuItem> : ''}
                    {task && task.assignee && task.assignee.id && (user.id === task.assignee.id || user.id === task.created_by.id)?
                    <div>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem 
                            sx={{color: 'error.dark', mt:2}} 
                            onClick={() => {
                                handleMenuClose();
                                handleOpenDeleteTask();
                            }} 
                            disableRipple
                        >
                        <DeleteIcon/>
                            Delete
                        </MenuItem>
                    </div>
                    : ''}
                </StyledMenu>
                <ListItem
                    disablePadding
                >
                <ListItemButton
                    onClick={(e) => {
                        // use event to set task 
                        handleMenuClick(e, list);
                    }}
                >
                    <Tooltip title={name} enterTouchDelay={0}>
                    <ListItemIcon >
                        <Badge 
                            color={list.assignee.id === list.created_by.id ? 'secondary' : 'warning'}
                            // variant='dot'
                            badgeContent=" "
                            invisible={list.is_read}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Chip 
                                sx={{mr:1}} 
                                size='small' 
                                color={list.is_public? 'primary' : 'success'} 
                                label={number}
                            />
                        </Badge>
                    </ListItemIcon>
                    </Tooltip>
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
                    darkState={darkState}
                    updateTask={updateTask}
                />
                </Grid>
                </ListItem>
                {subtasks.length > 0 ? 
            <div>
        <ListItemButton onClick={() => handleClick(list.id)}>
            <ListItemText 
                secondary={
                    subtasks.length > 1 ? 
                    <span>
                        <Chip 
                        as="span"
                        sx={{borderColor: !darkState? 'rgba(0, 0, 0, 0.12)' : ''}} 
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
                        sx={{borderColor: !darkState? 'rgba(0, 0, 0, 0.12)' : ''}} 
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
        > {subtasks.map((subT) => {
            const subLabelId = `checkbox-list-label-${subT.title}`;
            return (
                <List 
                    dense
                    key={uuidv4()} 
                    component="div" 
                    disablePadding
                >
                    <Divider sx={{ mr:1, ml:1 }}/>
                    <ListItem
                        sx={{ borderRadius: 2 }} 
                        // sx={{bgcolor: 'grey.100', borderRadius: 2}} 
                        secondaryAction={
                        <Checkbox
                        edge="end"
                        onClick={() => handleSubtaskCompleted(subT.id)}
                        checked={subT.is_complete}
                        inputProps={{ 'aria-labelledby': subLabelId }}
                        />
                        }
                    >
                        <ListItemButton 
                            sx={{ pl: 4 }}
                            onClick={() => {
                                setEditing(true);
                                handleOpenSubtaskForm(subT.id);
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
        </Collapse> 
            </div>
            : ''}
        {i < selectedList.length - 1 && <Divider  sx={{ borderColor: "#1C88B0 !important" }}
    />}
        </div>
        );
        })}
    </List>
    
    );
};

