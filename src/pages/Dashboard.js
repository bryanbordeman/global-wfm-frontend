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
            <div style={{paddingTop: '1rem'}}> 
                {/* <AdminWorksegments
                    user={user}
                    token={token} /> */}
                Admin Dashboard
            </div> :
            <div style={{paddingTop: '1rem'}}> 
                Dashboard
            </div>
            }
        </div>
    )
};

export default Dashboard;