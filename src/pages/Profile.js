import React from 'react';
import ProfileCard from '../components/ProfileCard'
import { Container } from '@mui/material';
import PTOTable from '../components/PTOTable';

function Profile(props) {
    const { user, token, handleOpenSnackbar } = props
    return ( 
        <div>
            <Container 
            sx={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'column',
                    height: '100%'}}> 
                <ProfileCard 
                    user={user}
                    token={token}
                />
                <PTOTable
                    user={user}
                    token={token}
                    handleOpenSnackbar={handleOpenSnackbar}
                />
            </Container>
        </div>
    );
}

export default Profile;