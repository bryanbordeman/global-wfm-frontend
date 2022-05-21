import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';

function LoginMessage() {
    return ( 
        <Alert severity="warning">Please login to access site <Link to={'/login'}>
                Login
            </Link>
        </Alert>
    );
}

export default LoginMessage;