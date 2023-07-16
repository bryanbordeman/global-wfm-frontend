import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import Navbar from './components/Navbar'
import UserService from "./services/User.services";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toolbar } from '@mui/material';
import SnackbarAlert from './components/SnackbarAlert';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Loading from './components/Loading';

import WorksegmentDataService from './services/Worksegment.services';
import PTOServices from './services/PTO.services';
import moment from 'moment';

import { purple} from '@mui/material/colors';

// export const UserContext = React.createContext();

export default function App() {
    const [ user, setUser ] = useState(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : '' || {})
    const [ token, setToken ] = useState(localStorage.getItem('token') || null)
    const [ error, setError ] = useState('')
    const [ loginErrors, setLoginErrors ] = useState({username: null, password: null})
    const [ isLoading, setIsLoading ] = React.useState(true);

    const [ openSnackbar, setOpenSnackbar ] = React.useState(false);
    const [ snackbarSeverity, setSnackbarSeverity ] = React.useState('')
    const [ snackbarMessage, setSnackbarMessage ] = React.useState('')

    const getTheme = localStorage.getItem('theme');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkState, setDarkState] = useState(prefersDarkMode);     
    let palletType = darkState ? "dark" : "light";

    const [ worksegments, setWorksegments ] = React.useState([]);
    const [ PTOsegments, setPTOsegments ] = useState([]);
    const [ employees, setEmployees ] = React.useState([])

    const [ totals, setTotals ] = React.useState([]);
    const [ isoWeek, setIsoWeek ] = React.useState(moment(new Date()).format('GGGG[W]WW'));
    const didMount = React.useRef(false);

    const theme = createTheme({
        palette: {
            background: 
                {
                    default: darkState? '#0C192A' : "#f8f8ff",
                    paper: darkState? '#0C192A' : '#ffff'
                },
                mode: palletType,
                primary: {
                    main: '#1C88B0',
                },
                secondary: {
                    main: purple[500],
                },
                darkBlue: {
                    main: '#11495F',
                },
                
            },
    });

    useEffect(()=> {
        if(getTheme){
            getTheme === 'dark'? setDarkState(true) : setDarkState(false)
        }
    },[])

    useEffect(() => {
        localStorage.setItem('theme', palletType)
    },[palletType])

    const handleChangeMode = () =>{
        setDarkState(!darkState);
    }

    function loadWindow(){
        window.onload = function() {
            if(!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        }
    }

    async function login(user= null){
        setIsLoading(true);
        UserService.login(user)
        .then(response => {
            setLoginErrors({username: null, password: null});
            setToken(response.data.token);
            setUser(JSON.parse(response.data.userObject))
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(JSON.parse(response.data.userObject)));
            setError('');
            //TODO hack to get dashboard tab highlighted as active page. Need to figure out better solution.
            loadWindow()
            
        })
        .catch( e => {
            handleOpenSnackbar('error', 'Unauthorized User')
            window.location.reload();
            console.log('login', e.toString());
            setLoginErrors({username: 'Username', password: 'Password'});
        })
        .finally(() => {
            setIsLoading(false);
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

    async function isActive(){
        // check if user is active
        setIsLoading(true);
        // if(user)
        UserService.isActive({'username': user.username})
        .then(response => {
            if(response.data){
                let active = response.data.user_is_active
                if(active === 'True'){
                    recieveTotals();
                    retrieveEmployees();
                }else{
                    // if user is not active anymore logout.
                    setToken('')
                    localStorage.setItem('token', '')
                    localStorage.setItem('user', '');
                    handleOpenSnackbar('error', 'Unauthorized User')
                    window.location.reload();
                }
            }
            
        })
        .catch( e => {
            // console.log(e);
            // handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
    })
        .finally(() => {
            setIsLoading(false);
        });
    };

    // -------- worksegments --------- //

    React.useEffect(() => {
        if (typeof user === 'object' &&
        !Array.isArray(user) &&
        user !== null) {
            isActive();
        }else{
            setIsLoading(false)
        }
    },[isoWeek, user]);

    const recieveTotals = () => {
        // get total hours for all users in isoweek.
        setIsLoading(true);
        WorksegmentDataService.getTotals(token, isoWeek)
            .then(response => {
                setTotals(response.data);
                retrieveWorksegments();
            })
            .catch(e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
    };

    const retrieveWorksegments = () => {
        // get segments from API
        const isAdmin = user.is_staff ? true : false;
        if(isAdmin){
            // if admin get all users segments for the week.
            WorksegmentDataService.adminGetWeek(token, isoWeek)
                .then(response => {
                    setWorksegments(response.data);
                    retrievePTOs();
                })
                .catch( e => {
                    console.log(e);
                    handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
                })
        }else{
            // else get only segemnts for current user
            // setIsLoading(true);
            WorksegmentDataService.getWeek(token, isoWeek)
                .then(response => {
                    setWorksegments(response.data);
                    retrievePTOs();
                })
                .catch( e => {
                    console.log(e);
                    handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
                })
        }
    };

    const retrievePTOs = () => {
        // get PTO segments from API
        user.is_staff? 
        PTOServices.adminGetWeek(token, isoWeek)
            .then(response => {
                let data = response.data
                setPTOsegments(data); 
            })
            .catch( e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            })
        :
        PTOServices.getWeek(token, isoWeek)
            .then(response => { 
                let data = response.data
                setPTOsegments(data);
            })
            .catch( e => {
                console.log(e);
                handleOpenSnackbar('error', 'Something Went Wrong!! Please try again.')
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const retrieveEmployees = () => {
        setIsLoading(true);
        UserService.getUsers(token)
        .then(response => {
            setEmployees(response.data);
        })
        .catch( e => {
            console.log(e);
            setIsLoading(false);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                {user.username? 
                <>
                <Navbar
                    handleChangeMode={handleChangeMode}
                    darkState={darkState}
                    user={user}
                    logout={logout}/>
                <Toolbar />
                </> : ''}
                <MainRoutes
                    user={user}
                    token={token}
                    setToken={setToken}
                    login={login}
                    signup={signup}
                    logout={logout}
                    error={error}
                    loginErrors={loginErrors}
                    darkState={darkState}
                    handleOpenSnackbar={handleOpenSnackbar}
                    handleChangeMode={handleChangeMode}
                    worksegments={worksegments}
                    setWorksegments={setWorksegments}
                    totals={totals}
                    setTotals={setTotals}
                    PTOsegments={PTOsegments}
                    setPTOsegments={setPTOsegments}
                    isoWeek={isoWeek}
                    setIsoWeek={setIsoWeek}

                    employees={employees}
                    />
                <SnackbarAlert
                    openSnackbar={openSnackbar}
                    handleCloseSnackbar={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    message={snackbarMessage}/>
            </BrowserRouter>
            <Loading
                open={isLoading}
            />
        </ThemeProvider>
    );
};
