import * as React from 'react';
// import AdminDashboardTable from '../components/AdminDashboardTable'
import { Container } from '@mui/material';



function Dashboard(props){
    const { user } = props
    // const { user, token } = props

    return (
        <div>
            {user.isStaff ?
            <div style={{paddingTop: '1rem'}}> 
                <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%'
                    }}>
                        Admin Dashboard
                    {/* <AdminDashboardTable/> */}
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