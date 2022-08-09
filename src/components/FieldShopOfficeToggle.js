import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { workTypes } from './ToggleObjects';

export default function FieldShopOfficeToggle(props) {
    const { segmentType, handleChangeSegmentType } = props
    const [ value, setValue ] = React.useState('');

    React.useEffect(() => {
        setValue(segmentType);
    },[segmentType]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(workTypes.find(x => x.id === newValue))
            handleChangeSegmentType(workTypes.find(x => x.id === newValue).name);
    };

    return (
        <ToggleButtonGroup
        sx={{width: '100%'}}
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
        >
            {workTypes.map(work => (
                <ToggleButton key={work.id} sx={{width: '100%'}} value={work.id}>{work.name}</ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
