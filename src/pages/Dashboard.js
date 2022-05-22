import * as React from 'react';
import LoginMessage from '../components/LoginMessage';
import AdminWorksegments from '../components/AdminWorksegments';



function Dashboard(props){
    const { user, token } = props

    return (
        <div>
            {!user.username  ? 
            <div>
            <LoginMessage/>
            </div>
            : 
            user.isStaff ?
            <div> 
                <AdminWorksegments
                    user={user}
                    token={token} />
            </div> :
            <div> 
                Dashboard
            </div>
            }
        </div>
    )
};

export default Dashboard;