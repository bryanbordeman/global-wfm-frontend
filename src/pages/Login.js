import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import logo from '../assets/GPS_Logo.png'
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    let navigate = useNavigate();

    const onChangeUsername = e => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    };

    const login = (e) => {
        e.preventDefault()
        props.login({username: username, password: password});
        navigate('/');
    };

    return ( 
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        sx={{
            // marginTop: 5,
            paddingTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
        }}
        >
        <img style={{width: '20rem'}} src={logo} alt="GPS Logo"/>
        <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={onChangeUsername}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChangePassword}
            />
            <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Sign In
            </Button>
            <div style={{display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            justifyContent: 'center'}}>
                <Grid item
                    sx={{marginTop: '10px'}}>
                    <Link href="/signup/" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </div>
        </Box>
        </Box>
    </Container>
    );
}

export default Login;