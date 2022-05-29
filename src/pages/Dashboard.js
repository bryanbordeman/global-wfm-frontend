import * as React from 'react';
import LoginMessage from '../components/LoginMessage';
import AdminDashboardTable from '../components/AdminDashboardTable'
import { Container } from '@mui/material';



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
                {/* Admin Dashboard */}
                <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%'
                    }}>
                    <AdminDashboardTable/>
                </Container>
            </div> :
            <div style={{paddingTop: '1rem'}}> 
                Dashboard
            </div>
            }
        </div>
    )
};

export default Dashboard;