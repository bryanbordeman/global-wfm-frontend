import React from 'react';
import { Container } from '@mui/material';
import SoftwareCard from '../components/SoftwareCard';

function Settings(props) {
    const { user } = props
    return ( 
        <div>
            <Container 
            sx={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column',
                    height: '100%'}}> 
                <SoftwareCard/>
            </Container>
        </div>
    );
}

export default Settings;