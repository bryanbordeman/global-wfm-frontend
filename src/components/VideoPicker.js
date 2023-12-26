import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function VideoPicker(props) {
    const { categories, setCategory } = props;
    const [value, setValue] = React.useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
        setCategory(event.target.value)
    };

    return (
        <FormControl fullWidth >
            <InputLabel id="video-picker-label">Video Categories</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="video-picker"
                value={value}
                label="Video Categories"
                onChange={handleChange}
            >
                {categories.map(v => (
                    <MenuItem
                        key={v.id}
                        value={v}
                    >   {v.description}
                    </MenuItem>
                )
                )}
            </Select>
        </FormControl>
    );
};