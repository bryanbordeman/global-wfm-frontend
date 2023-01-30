import React from 'react';
import { Container } from '@mui/material';
import FieldTabs from '../components/FieldTabs';

export default function Field(props) {
    const { user, token, handleOpenSnackbar, darkState} = props
    return ( 
        <div style={{paddingTop: '1rem'}}> 
            <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%'
                    }}>
                        <FieldTabs
                            user={user}
                            token={token}
                            darkState={darkState}
                            handleOpenSnackbar={handleOpenSnackbar}                  
                        />
            </Container>
        </div>
    );
};