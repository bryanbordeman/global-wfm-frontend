import React from 'react';
import LoginMessage from '../components/LoginMessage';

function Profile(props) {
    const { user } = props
    return ( 
        <div>
            {!user ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <div> 
                Profile
            </div>
            }
        </div>
    );
}

export default Profile;