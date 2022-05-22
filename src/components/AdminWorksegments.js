import * as React from 'react';
import WorksegmentDataService from '../services/Worksegment.services'
import moment from 'moment';
import { Button } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';


function AdminWorksegments(props){
    const { user, token } = props

    const [ worksegments, setWorksegments ] = React.useState([]);
    const [ isoWeek, setIsoWeek ] = React.useState(moment(new Date()).format('GGGG[W]WW'));
    const [ error, setError ] = React.useState(false);
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


    const retrieveWorksegments = () => {
        WorksegmentDataService.adminGetWeek(token, isoWeek)
        .then(response => {
            setWorksegments(response.data);
            console.log(response.data)
        })
        .catch( e => {
            console.log(e);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        })
    };

    return (
        <Container>
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
            <ListItem
                key={value}
                secondaryAction={
                    <Stack direction="row" spacing={2}>
                        <IconButton edge="end" aria-label="edit" color='primary'>
                            <Edit />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" color='error'>
                            <Delete />
                        </IconButton>
                    </Stack>
                }
                disablePadding
            >
                
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                    <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText 
                    id={labelId} 
                    primary={
                        <Stack direction="row" spacing={1}>
                            <div>Bryan Bordeman</div>
                            <div>Project: 12345</div>

                        </Stack>} 
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                10 Hrs
                            </Typography>
                            {" — 6:00 AM to 4:00 PM"}
                        </React.Fragment>
                        }
                />
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
        </Container>
    )
};

export default AdminWorksegments;

