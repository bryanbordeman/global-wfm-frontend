import React, { useState } from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import Navbar from './components/Navbar'
import UserService from "./services/User.services";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import  BottomNavigation  from './components/BottomNavigation';

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
    const [ user, setUser ] = useState(localStorage.getItem('user') || null)
    const [ token, setToken ] = useState(localStorage.getItem('token') || null)
    const [ error, setError ] = useState('')

    async function login(user= null){
        // console.log('App Login Function')
        UserService.login(user)
        .then(response => {
            setToken(response.data.token);
            setUser(user.username);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', user.username);
            setError('');
        })
        .catch( e => {
            console.log('login', e);
            setError(e.toString());
        });
    };
    async function logout(){
        setToken('');
        setUser('');
        localStorage.setItem('token', '');
        localStorage.setItem('user', '');
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

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar
                    user={user}
                    logout={logout}/>
                <MainRoutes
                    user={user}
                    token={token}
                    login={login}
                    signup={signup}
                    logout={logout}/>
                {/* <BottomNavigation/> */}
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
