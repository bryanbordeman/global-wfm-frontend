import * as React from 'react';
import AdminDashboardTable from '../components/AdminDashboardTable'
import { Container } from '@mui/material';
import SnackbarAlert from '../components/SnackbarAlert'



function Dashboard(props){
    const { user } = props
    // const { user, token } = props

    return (
        <div>
            {user.is_staff ?
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
                        <SnackbarAlert/>
                    <AdminDashboardTable/>
                </Container>
            </div> :
            <div style={{paddingTop: '1rem'}}> 
                <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%'
                    }}>
                        Dashboard
                </Container>
            </div>
            }
        </div>
    )
};

export default Dashboard;