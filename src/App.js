import React, { useEffect, useState } from 'react'
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
    // background: {
    //     paper: 'red',
    //     default: 'red'
    // }
});

function App() {
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [ users, setUsers ] = useState('')
    const [ token, setToken ] = useState(localStorage.getItem('token') || null)
    const [ error, setError ] = useState('')

    useEffect(() => {
        try {
            setUsers(JSON.parse(localStorage.getItem('users')))
        } catch (e) {
            setUsers({})
        }
    },[])

    useEffect(() => {
        // add background to app
        document.body.style.backgroundColor = "#f8f8ff"
    },[])

    async function login(user= null){
        // console.log('App Login Function')
        UserService.login(user)
        .then(response => {
            setToken(response.data.token);
            // setUser(user.username);
            const userData = {
                username: response.data.user,
                email: response.data.user_email,
                firstName: response.data.user_first_name,
                lastName: response.data.user_last_name,
                isStaff: response.data.user_is_staff.toLowerCase() === 'true'
            }
            try {
                setUsers(JSON.parse(response.data.users))
            } catch (e) {
                setUsers({})
            }
        
            setUser(userData)
            localStorage.setItem('users', response.data.users)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(userData));
            setError('');
        })
        .catch( e => {
            console.log('login', e);
            setError(e.toString());
        });
    };
    async function logout(){
        const userData = {
            username: '',
            email: '',
            firstName: '',
            lastName:  '',
            isStaff: ''
        }
        
        setToken('');
        setUser(userData);
        localStorage.setItem('token', '');
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('users', '');
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
                <div style={{marginTop: '3em',}}></div>
                <MainRoutes
                    user={user}
                    users={users}
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
