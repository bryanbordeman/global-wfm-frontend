import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import Navbar from './components/Navbar'
import UserService from "./services/User.services";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toolbar } from '@mui/material';
import SnackbarAlert from './components/SnackbarAlert';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1C88B0',
        },
        secondary: {
            main: '#D1DF45',
        },
        darkBlue: {
            main: '#11495F',
        },
        
        },
});

function App() {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || {})
    const [ token, setToken ] = useState(localStorage.getItem('token') || null)
    const [ error, setError ] = useState('')
    const [ loginErrors, setLoginErrors ] = useState({username: null, password: null})

    const [ openSnackbar, setOpenSnackbar ] = React.useState(false);
    const [ snackbarSeverity, setSnackbarSeverity ] = React.useState('')
    const [ snackbarMessage, setSnackbarMessage ] = React.useState('')

    useEffect(() => {
        // add background to app
        document.body.style.backgroundColor = "#f8f8ff"
    },[])

    async function login(user= null){
        UserService.login(user)
        .then(response => {
            setLoginErrors({username: null, password: null});
            setToken(response.data.token);
            setUser(JSON.parse(response.data.userObject))
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(JSON.parse(response.data.userObject)));
            setError('');
        })
        .catch( e => {
            console.log('login', e.toString());
            setLoginErrors({username: 'Username', password: 'Password'});
        });
    };
    async function logout(){
        const userData = Object.keys(user);
        setToken('');
        setUser(userData);
        localStorage.setItem('token', '');
        localStorage.setItem('user', JSON.stringify(userData));
    };
    async function signup(user= null){
        UserService.signup(user)
        .then(response => {
            setToken(response.data.token);
            setUser(user.username);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', user.username);
        })
        .catch( e => {
            console.log('login', e);
            setError(e.toString());
        });
    };

    const handleOpenSnackbar = (severity, message) => {
        setOpenSnackbar(true);
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);

    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                {user.username? 
                <>
                <Navbar
                    user={user}
                    logout={logout}/>
                <Toolbar />
                </> : ''}
                <MainRoutes
                    user={user}
                    token={token}
                    login={login}
                    signup={signup}
                    logout={logout}
                    error={error}
                    loginErrors={loginErrors}
                    handleOpenSnackbar={handleOpenSnackbar}/>
                <SnackbarAlert
                    openSnackbar={openSnackbar}
                    handleCloseSnackbar={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    message={snackbarMessage}/>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
