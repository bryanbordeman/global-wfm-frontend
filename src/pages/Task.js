import React from 'react';
import { Container } from '@mui/material';

function Task(props) {
    // const { user } = props
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
                    Task
            </Container>
        </div>
    );
}

export default Task;