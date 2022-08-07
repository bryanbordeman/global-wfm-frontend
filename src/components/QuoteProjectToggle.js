import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function QuoteProjectToggle(props) {
    const { choosePicker, handleChangePicker } = props
    const [value, setValue] = React.useState('projects');

    React.useEffect(() => {
        if(choosePicker === 'projects'){
            setValue('projects')
        }else{
            setValue('quotes')
        }
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handleChangePicker(newValue);
    };

    return (
        <ToggleButtonGroup
        orientation="vertical"
        sx={{width: '7rem'}}
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
        >
        <ToggleButton sx={{width: '100%', pt:0, pb:0}} value="projects">Projects</ToggleButton>
        <ToggleButton sx={{width: '100%',  pt:0, pb:0}} value="quotes">Quotes</ToggleButton>
        </ToggleButtonGroup>
    );
}
