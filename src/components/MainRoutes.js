import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import WorksegmentList from '../pages/Worksegments';
import Schedule from '../pages/Schedule';
import Projects from '../pages/Projects';
import Announcements from '../pages/Announcements';
import Expenses from '../pages/Expenses';
import Profile from '../pages/Profile'
import LoginMessage from './LoginMessage';

function MainRoutes(props) {
    const { user, users, token, login, signup } = props
    
    return (
        <div>
            <Routes>
                <Route 
                    exact 
                    path='/' 
                    element={
                        !user.username  ? 
                        <LoginMessage/>
                        : 
                        <Dashboard
                        user={user}
                        users={users}
                        token={token}
                        />
                    }/>
                <Route 
                    exact 
                    path='/worksegments' 
                    element={
                        !user.username  ? 
                        <LoginMessage/>
                        :
                        <WorksegmentList
                        user={user}
                        users={users}
                        token={token}
                        />
                }/>
                <Route 
                    exact 
                    path='/schedule' 
                    element={
                        !user.username  ? 
                        <LoginMessage/>
                        :
                        <Schedule
                        user={user}
                        token={token}
                        /> 
                    }/>
                <Route 
                    exact 
                    path='/projects' 
                    element={
                        !user.username  ? 
                        <LoginMessage/>
                        :
                        <Projects
                        user={user}
                        token={token}
                        /> 
                }/>
                <Route 
                    exact 
                    path='/announcements' 
                    element={
                        !user.username  ? 
                        <LoginMessage/>
                        :
                        <Announcements
                        user={user}
                        token={token}
                        />
                }/>
                <Route 
                    exact 
                    path='/expenses' 
                    element={
                        !user.username  ? 
                        <LoginMessage/>
                        :
                        <Expenses
                        user={user}
                        token={token}
                        />
                }/>
                    <Route 
                    exact 
                    path='/profile' 
                    element={
                        !user.username  ? 
                        <LoginMessage/>
                        :
                        <Profile
                        user={user}
                        token={token}
                        />
                }/>
                <Route 
                    exact 
                    path='/login' 
                    element={
                        <Login 
                            login={login} 
                        />
                    }/>
                <Route 
                    exact 
                    path='/signup' 
                    element={
                        <Signup 
                            signup={signup} 
                        />
                    }/>


                <Route render={() => <h1>Error 404</h1>}/>
            </Routes>
        </div>
    );
};

export default MainRoutes;