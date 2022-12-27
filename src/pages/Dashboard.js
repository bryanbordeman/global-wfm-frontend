import * as React from 'react';
import { Container } from '@mui/material';
import SnackbarAlert from '../components/SnackbarAlert'
import WorksegmentTable from '../components/WorksegmentTable';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function Dashboard(props){
    const { user, token, handleOpenSnackbar } = props
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
                        {/* <div style={{width: '100%'}}>
                        <Typography variant="h4" gutterBottom sx={{ textAlign:"center"}}>
                            Dashboard
                        </Typography>
                        <Divider sx={{mb: 2}}/>
                        </div> */}
                    <WorksegmentTable
                        user={user}
                        token={token}
                        handleOpenSnackbar={handleOpenSnackbar}
                    />
                    <SnackbarAlert/>
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