import React from 'react';
import LoginMessage from '../components/LoginMessage';

function Schedule(props) {
    const { user } = props
    return ( 
        <div>
            {!user.username  ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <div> 
                Schedule
            </div>
            }
        </div>
    );
}

export default Schedule;