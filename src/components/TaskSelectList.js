import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

export default function TaskSelectlist(props) {
    const { employee, tasks, taskLists, setCurrentList } = props
    const { handleChangeList } = props
    const [ value, setValue ] = React.useState('');
    
    const handleChange = (event) => {
        setCurrentList(event.target.value)
        setValue(event.target.value);
        handleChangeList(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="select-list-label">{employee? "Select Task List" : "Select Employee First"}</InputLabel>
                <Select
                labelId="select-list-label"
                id="select-list"
                value={employee? value : ''}
                disabled={!employee}
                label={employee? "Select Task List" : "Select Employee First"}
                onChange={handleChange}
                >
                
                {taskLists.map(list => (
                    <MenuItem 
                        key={list.id} 
                        value={list}
                        >   {list.title}
                            {tasks[list.title]? tasks[list.title].length === 0 ?
                            '' :
                            <Chip 
                                sx={{ml:1}} 
                                size="small" 
                                label={tasks[list.title]? tasks[list.title].length : ''}
                                color='primary'
                            /> : ''}
                    </MenuItem>
                )
                    )}
                </Select>
            </FormControl>
        </Box>
    );
};