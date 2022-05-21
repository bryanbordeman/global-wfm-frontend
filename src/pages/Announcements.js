import React from 'react';
import LoginMessage from '../components/LoginMessage';

function Announcements(props) {
    const { user } = props
    return ( 
        <div>
            {!user ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <div> 
                Announcements
            </div>
            }
        </div>
     );
}

export default Announcements;