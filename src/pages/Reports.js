import * as React from 'react';
import { Container } from '@mui/material';
import ReportTabs from '../components/ReportTabs';
import Loading from '../components/Loading';

export default function Reports(props) {
    const { user, token, handleOpenSnackbar, employees} = props
    const [ isLoading, setIsLoading ] = React.useState(false);

    React.useEffect(() => {
        handleOpenSnackbar('success', 'Lets work together to set a new record!')
    },[])


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
                    <ReportTabs
                        user={user}
                        token={token}
                        handleOpenSnackbar={handleOpenSnackbar} 
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        employees={employees}
                    />
            </Container>
            <Loading
                open={isLoading}
            />
        </div>
    );
};

