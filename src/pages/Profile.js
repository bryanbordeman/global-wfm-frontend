import React from 'react';
import LoginMessage from '../components/LoginMessage';
import ProfileCard from '../components/ProfileCard'
import { Container } from '@mui/material';

function Profile(props) {
    const { user } = props
    return ( 
        <div>
            {!user.username ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <Container 
            sx={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column',
                    height: '100%'}}> 
                <ProfileCard user={user}/>
            </Container>
            }
        </div>
    );
}

export default Profile;