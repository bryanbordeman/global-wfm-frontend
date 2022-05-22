import React from 'react';
import LoginMessage from '../components/LoginMessage';

function Announcements(props) {
    const { user } = props
    return ( 
        <div>
            {!user.username ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <div style={{paddingTop: '1rem'}}> 
                Announcements
            </div>
            }
        </div>
     );
}

export default Announcements;