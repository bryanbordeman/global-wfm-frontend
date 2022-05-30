import React from 'react';
import { Container } from '@mui/material';

function Expenses(props) {
    const { user } = props
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
                    Expenses
            </Container>
        </div>
    );
}

export default Expenses;