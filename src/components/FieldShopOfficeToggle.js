import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function FieldShopOfficeToggle(props) {
    const { handleChangeSegmentType } = props
    const [ value, setValue ] = React.useState('');
    const { workTypes, values } = props
    const didMount = React.useRef(false);

    React.useLayoutEffect(() => {
        if (didMount.current) {
            // if editing update value
            if(values.segment_type.id === undefined){
                setValue(workTypes.length > 0 ? workTypes[workTypes.length - 1].id : '');
            }else{
                setValue(values.segment_type.id);
            }
        } else {
            didMount.current = true;
        }
    },[]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handleChangeSegmentType(newValue)
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
