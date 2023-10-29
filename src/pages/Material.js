import React from 'react';
import { Container } from '@mui/material';

export default function Material(props) {
    // const { user, token, handleOpenSnackbar, darkState} = props
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