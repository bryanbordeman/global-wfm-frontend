import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { projectType } from './ToggleObjects';

export default function QuoteProjectToggle(props) {
    const { choosePicker, handleChangePicker } = props
    const [value, setValue] = React.useState('projects');

    React.useEffect(() => {
        projectType.forEach((project) => {
            if(choosePicker === project.name)
                setValue(project.id)
        })
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(projectType.find(x => x.id === newValue))
            handleChangePicker(projectType.find(x => x.id === newValue).name)
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
            {projectType.map(project => (
                <ToggleButton key={project.id} sx={{width: '100%', pt:0, pb:0}} value={project.id}>{project.name}</ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
