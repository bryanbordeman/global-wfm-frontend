import * as React from 'react';
import { Container } from '@mui/material';
import SnackbarAlert from '../components/SnackbarAlert'
import WorksegmentTable from '../components/WorksegmentTable';

function Dashboard(props){
    const { user, token, setToken, handleOpenSnackbar } = props
    
    const { worksegments, setWorksegments } = props
    const { PTOsegments } = props;
    const { totals, setTotals } = props
    const { isoWeek, setIsoWeek } = props
    
    return (
        <div>
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
                        setToken={setToken}
                        handleOpenSnackbar={handleOpenSnackbar}
                        
                        
                        worksegments={worksegments}
                        setWorksegments={setWorksegments}
                        totals={totals}
                        setTotals={setTotals}
                        PTOsegments={PTOsegments}
                        isoWeek={isoWeek}
                        setIsoWeek={setIsoWeek}
                    />
                </Container>
            </div> 
            <SnackbarAlert/>
        </div>
    )
};

export default Dashboard;