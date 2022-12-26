import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Chip } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function TaskCompletedList(props) {
    const { selectedCompleteList, uncompleteTask, user } = props
    const { setTask, setOpenTaskDialog, setEditing } = props
    const [open, setOpen] = React.useState(false);
    
    React.useEffect(() => {
        // if you change list completed is closed when new list appears.
        if(open === true){
            setOpen(false)
        };
    },[selectedCompleteList]);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleTaskNotCompleted = (id) => {
        uncompleteTask(id) 
    };

    const handleOpenTask = (task) => {
        setEditing(false);
        setTask(task);
        setOpenTaskDialog(true);
    };
    
    return ( 
        <div>
            {selectedCompleteList.length > 0? 
            <List
                sx={{ mb: 3, pb: 0, pt:0, width: '100%', bgcolor: 'background.paper', border: 1, borderRadius:2, borderColor: 'grey.300' }}
            >
                <ListItemButton onClick={() => handleClick()}>
            <ListItemText 
                // sx={{textDecoration: 'line-through'}}
                secondary={
                    <span>{`Completed (${selectedCompleteList.length})`}</span>
                    }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse 
            in={open}
            timeout="auto" 
            unmountOnExit
        > {selectedCompleteList.map((task, j) => {
            const subLabelId = `checkbox-list-label-${task.title}`;
            let number = ''
            // set number based on type
            if(task.project){
                number =task.project.number
            }
            if(task.service){
                number =task.service.number
            }
            if(task.hse){
                number =task.hse.number
            }
            if(task.quote){
                number =task.quote.number
            }
            return (
                <List 
                    dense
                    key={task.id} 
                    component="div" 
                    disablePadding
                >
                    <Divider sx={{ mr:1, ml:1 }}/>
                    <ListItem
                        sx={{ borderRadius: 2 }} 
                        // sx={{bgcolor: 'grey.100', borderRadius: 2}} 
                        secondaryAction=
                        {user.id === task.assignee.id? 
                        <Checkbox
                        edge="end"
                        onClick={() => handleTaskNotCompleted(task.id)}
                        checked={task.is_complete}
                        inputProps={{ 'aria-labelledby': subLabelId }}
                        /> : ''}
                        
                    >
                        <ListItemButton 
                            sx={{ pl: 4 }}
                            onClick={() => {
                                handleOpenTask(task);
                                // setEditing(true);
                                // handleOpenSubtaskForm(subT.id);
                            }}
                        >
                            <ListItemIcon>
                                <Chip 
                                    sx={{mr:1, color: 'gray'  }} 
                                    variant='outlined'
                                    size='small' 
                                    label={number}
                                />
                            </ListItemIcon>
                            <ListItemText 
                                sx={{ textDecoration: 'line-through'}}
                                secondary={`${task.title}`} 
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            )
    })}
        </Collapse> 
        </List> : ''}
            </div>
    );
};