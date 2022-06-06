import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Edit from '@mui/icons-material/Edit'
import { Button } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

export default function CheckboxList(props) {
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const items = [0,1,2,3]

    return (
        <List sx={{ width: '100%', margin: 0, padding: 0, bgcolor: 'background.paper' }}>
        {items.map((value, i) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
            <div key={value}>
            <ListItem
                secondaryAction={
                        <IconButton
                            edge="end" 
                            color='primary'
                            >
                            <Edit/>
                        </IconButton>
                }
                disablePadding
            >
                <ListItemButton role={undefined} dense>
                <ListItemIcon>
                    <Checkbox
                    onClick={handleToggle(value)}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText 
                    id={labelId} 
                    primary={`12222 | ${props.values} item ${value + 1}`}
                    secondary={
                        <Button sx={{mt:1, pt:0, pb: 0}} size='small' variant="outlined" startIcon={<EventAvailableIcon />}>
                            in 5 days
                        </Button>
                    } 
                />
                </ListItemButton>
            </ListItem>
            {i < items.length - 1 && <Divider/>}
            </div>
            );
        })}
        </List>
    );
    }
