import React from 'react';
import ProfileCard from '../components/ProfileCard'
import { Container } from '@mui/material';
import SoftwareCard from '../components/SoftwareCard';

function Profile(props) {
    const { user } = props
    return ( 
        <div>
            <Container 
            sx={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column',
                    height: '100%'}}> 
                <ProfileCard user={user}/>
                <SoftwareCard/>
            </Container>
        </div>
    );
}

export default Profile;