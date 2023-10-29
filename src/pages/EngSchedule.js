import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// import Loading from '../components/Loading';

export default function EngSchedule(props) {
    // const { user, token, handleOpenSnackbar, darkState} = props;
    // const [ isLoading, setIsLoading ] = React.useState(false); // wait until API returns promise

    return ( 
        <div>
            <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection:'column',
                        height: '100%',
                    }}
            
            variant="h5" gutterBottom>
                DRAWING SCHEDULE
            </Typography>
            <Divider sx={{mb:3}}/>
            {/* <Loading
                open={isLoading}
            /> */}
        </div>
    );
};