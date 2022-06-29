import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TaskDataService from '../services/Task.services';

export default function TaskSelectlist(props) {
    const { token } = props
    const { handleOpenSnackbar, handleChangeList } = props
    const [value, setValue] = React.useState('');
    const [ taskLists, setTaskLists ] = React.useState([]);

    React.useEffect(() => {
        retrieveTaskList();
    },[])

    const retrieveTaskList = () => {
        TaskDataService.getAllTaskList(token)
        .then(response => {
            setTaskLists(response.data.sort((a, b) => (a.title > b.title) ? 1 : -1));
        })
        .catch( e => {
            console.log(e);
            handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
        })
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        handleChangeList(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="select-list-label">Select Task List</InputLabel>
            <Select
            labelId="select-list-label"
            id="select-list"
            value={value}
            label="Select Task List"
            onChange={handleChange}
            >
            {taskLists.map(list => (
                <MenuItem value={list}>{list.title}</MenuItem>
            )
                )}
            </Select>
        </FormControl>
        </Box>
    );
    }
