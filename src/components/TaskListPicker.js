import * as React from 'react';
import TaskDataService from '../services/Task.services';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function TaskListPicker(props) {
    const [ taskLists, setTaskLists ] = React.useState([]);
    const { handleOpenSnackbar } = props;
    const { handleChangeList, token } = props;
    const { editing, task, errors } = props;
    const [ value, setValue ] = React.useState('');
    const [ isLoading, setIsLoading ] = React.useState(false);

    React.useEffect(() => {
        retrieveTaskList();
        if(editing){
            setValue(task.tasklist);
            handleChangeList(task.tasklist);
        };
    },[])
    

    const retrieveTaskList = () => {
        setIsLoading(true);
        TaskDataService.getAllTaskList(token)
            .then(response => {
                setTaskLists(response.data.sort((a, b) => (a.title > b.title) ? 1 : -1));
            })
            .catch( e => {
                console.log(e);
                setIsLoading(false);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    
    const handleChange = (event) => {
        setValue(event.target.value);
        handleChangeList(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={errors.tasklist}>
                <InputLabel 
                    id="select-list-label"
                >
                    Select Task List
                </InputLabel>
                <Select
                disabled={isLoading}
                labelId="select-list-label"
                id="select-list"
                // value={editing? task.tasklist : value}
                renderValue={(v)=> <span>{v.title}</span>}
                value={value}
                label="Select Task List"
                onChange={handleChange}
                >
                
                {taskLists.map(list => (
                    <MenuItem 
                        key={list.id} 
                        value={list}
                    >   
                        {list.title}
                    </MenuItem>
                )
                    )}
                </Select>
                {errors.tasklist && <FormHelperText error={errors.tasklist? true : false}>This is required!</FormHelperText>}
            </FormControl>
        </Box>
    );
};