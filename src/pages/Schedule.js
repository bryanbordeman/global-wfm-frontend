import React from 'react';
import { Container } from '@mui/material';
import ScheduleList from '../components/ScheduleList';
import Typography from '@mui/material/Typography';

function Schedule(props) {
    // const { user } = props
    return ( 
        <div style={{paddingTop: '1rem'}}> 
            <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%'
                    }}>
                 <Typography style={{fontWeight: '700'}} mb={1} variant="h4" component="div">
                    2022W25
                </Typography>
                <ScheduleList/>
            </Container>
        </div>
    );
}

export default Schedule;