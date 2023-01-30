import React from 'react';
import { Container } from '@mui/material';
import ScheduleList from '../components/ScheduleList';
import Typography from '@mui/material/Typography';

export default function Schedule(props) {
    const { user, token, handleOpenSnackbar, darkState} = props
    return ( 
        <Container
            component="span"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection:'column',
                height: '100%'
            }}>
                Coming Soon
        </Container>
    );
};