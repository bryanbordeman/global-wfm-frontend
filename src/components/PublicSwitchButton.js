import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { purple} from '@mui/material/colors';

const MaterialUISwitch = styled(Switch)(({ ispublic }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
            backgroundImage: `url('https://globalshielding.s3.amazonaws.com/public_icon.svg')`

        },
        '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor:  '#8796A5',
        },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: ispublic === 'true' ?  '#1C88B0' : purple[500],
        width: 32,
        height: 32,
        '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('https://globalshielding.s3.amazonaws.com/private_icon.svg')`
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#8796A5',
        borderRadius: 20 / 2,
    },
    }));

export default function PublicSwitchButton(props) {
    const { handleToggleIsPublic, isPublic} = props;
    // const [isPublic, setIsPublic] = React.useState(true); // Initial state is set to "Private"

    
    const toggleSwitch = () => {
        handleToggleIsPublic(!isPublic);
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={<MaterialUISwitch ispublic={isPublic.toString()} sx={{ m: 1 }} />}
                label={isPublic? 'Public' : 'Private'}
                checked={isPublic}
                onChange={toggleSwitch}
            />
        </FormGroup>
    );
};


