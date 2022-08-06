import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function QuoteProjectToggle(props) {
    const { handleChangePicker } = props
    const [value, setValue] = React.useState('projects');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handleChangePicker(newValue);
    };

    return (
        <ToggleButtonGroup
        sx={{width: '100%'}}
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
        >
        <ToggleButton sx={{width: '100%'}} value="projects">Projects</ToggleButton>
        <ToggleButton sx={{width: '100%'}} value="quotes">Quotes</ToggleButton>
        </ToggleButtonGroup>
    );
}
