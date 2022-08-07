import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function FieldShopOfficeToggle(props) {
    const { segmentType, handleChangeSegmentType } = props
    const [ value, setValue ] = React.useState('');

    React.useEffect(() => {
        setValue(segmentType);
    },[segmentType])

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
        <ToggleButton sx={{width: '100%'}} value="Field">Field</ToggleButton>
        <ToggleButton sx={{width: '100%'}} value="Shop">Shop</ToggleButton>
        <ToggleButton sx={{width: '100%'}} value="Office">Office</ToggleButton>
        </ToggleButtonGroup>
    );
}
