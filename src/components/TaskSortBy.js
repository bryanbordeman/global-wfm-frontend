import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TaskSortBy(props) {
    const { setSortBy } = props
    // const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        // setValue(event.target.value);
        setSortBy(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
            labelId="sort-by-label"
            id="sort-by"
            // value={value}
            defaultValue={1}
            label="Sort By"
            onChange={handleChange}
            >
            <MenuItem value={1}>Due Date (Oldest to Newest)</MenuItem>
            <MenuItem value={2}>Due Date (Newest to Oldest)</MenuItem>
            <MenuItem value={3}>Project (Descending)</MenuItem>
            <MenuItem value={4}>Task (Alphabetically)</MenuItem>
            </Select>
        </FormControl>
        </Box>
    );
    }
