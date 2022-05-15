import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';

function Dashboard(props){
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
            <h3>Welcome {props.user}</h3> 
            </div>
            }
            
        </div>
    )
};

export default Dashboard;