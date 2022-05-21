import React from 'react';
import LoginMessage from '../components/LoginMessage';


function Dashboard(props){
    const { user } = props
    return (
        <div>
            {!user ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            <div> 
                Dashboard
            </div>
            }
        </div>
    )
};

export default Dashboard;