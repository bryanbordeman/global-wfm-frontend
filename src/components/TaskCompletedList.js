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

export default function TaskCompletedList(props) {
    const { selectedCompleteList, uncompleteTask } = props
    const [open, setOpen] = React.useState(false);
    

    const handleClick = () => {
        setOpen(!open);
    }

    const handleTaskNotCompleted = (id) => {
        uncompleteTask(id) 
    }
    
    return ( 
        <div>
            {selectedCompleteList.length > 0? 
            <List
                sx={{ mb: 3, pb: 0, pt:0, width: '100%', bgcolor: 'background.paper', border: 1, borderRadius:2, borderColor: 'grey.500' }}
            >
                <ListItemButton onClick={() => handleClick()}>
            <ListItemText 
                sx={{textDecoration: 'line-through'}}
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
            return (
                <List 
                    dense
                    key={task.id} 
                    component="div" 
                    disablePadding
                >
                    <Divider />
                    <ListItem
                        sx={{ borderRadius: 2 }} 
                        // sx={{bgcolor: 'grey.100', borderRadius: 2}} 
                        secondaryAction={
                        <Checkbox
                        edge="end"
                        onClick={() => handleTaskNotCompleted(task.id)}
                        checked={task.is_complete}
                        inputProps={{ 'aria-labelledby': subLabelId }}
                        />
                        }
                    >
                        <ListItemButton 
                            sx={{ pl: 4 }}
                            // onClick={() => {
                            //     handleTaskCompleted(task);
                            //     // setEditing(true);
                            //     // handleOpenSubtaskForm(subT.id);
                            // }}
                        >
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