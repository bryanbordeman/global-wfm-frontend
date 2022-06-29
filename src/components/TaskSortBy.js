import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TaskSortBy() {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
            labelId="sort-by-label"
            id="sort-by"
            value={value}
            label="Value"
            onChange={handleChange}
            >
            <MenuItem value={1}>Date</MenuItem>
            <MenuItem value={2}>Project</MenuItem>
            <MenuItem value={3}>Task</MenuItem>
            </Select>
        </FormControl>
        </Box>
    );
    }
