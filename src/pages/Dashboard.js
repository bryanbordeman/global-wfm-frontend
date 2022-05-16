import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';
import WorksegmentList from '../components/WorksegmentList';

function Dashboard(props){
    const { user, token } = props
    return (
        <div>
            {!props.user ? 
            <div>
            <Alert severity="warning">Please login to access Dashboard <Link to={'/login'}>
                Login
            </Link>
            </Alert>
            </div>
            : 
            <div> 
                <WorksegmentList
                    user={user}
                    token={token}
                />
            </div>
            }
        </div>
    )
};

export default Dashboard;