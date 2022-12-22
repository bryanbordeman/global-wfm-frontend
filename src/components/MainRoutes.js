import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import WorksegmentList from '../pages/WorksegmentsRef';
import Schedule from '../pages/Schedule';
import Projects from '../pages/Projects';
import Announcements from '../pages/Announcements';
import Expenses from '../pages/Expenses';
import Profile from '../pages/Profile'
import Task from '../pages/Task'

function MainRoutes(props) {
    const { user, token, login, signup, loginErrors, darkState, handleOpenSnackbar } = props
    return (
        <div>
            <Routes>
                <Route 
                    exact 
                    path='/' 
                    element={
                        !user.username  ? 
                        <Navigate to="/login" />
                        : 
                        <Dashboard
                        user={user}
                        token={token}
                        />
                    }/>
                <Route 
                    exact 
                    path='/worksegments' 
                    element={
                        !user.username  ? 
                        <Navigate to="/login" />
                        :
                        <WorksegmentList
                        user={user}
                        token={token}
                        handleOpenSnackbar={handleOpenSnackbar}
                        />
                }/>
                <Route 
                    exact 
                    path='/schedule' 
                    element={
                        !user.username  ? 
                        <Navigate to="/login" />
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
                        <Navigate to="/login" />
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
                        <Navigate to="/login" />
                        :
                        <Announcements
                        user={user}
                        token={token}
                        handleOpenSnackbar={handleOpenSnackbar}
                        />
                }/>
                <Route 
                    exact 
                    path='/expenses' 
                    element={
                        !user.username  ? 
                        <Navigate to="/login" />
                        :
                        <Expenses
                        user={user}
                        token={token}
                        handleOpenSnackbar={handleOpenSnackbar}
                        />
                }/>
                <Route 
                    exact 
                    path='/task' 
                    element={
                        !user.username  ? 
                        <Navigate to="/login" />
                        :
                        <Task
                        user={user}
                        token={token}
                        darkState={darkState}
                        handleOpenSnackbar={handleOpenSnackbar}
                        />
                }/>
                    <Route 
                    exact 
                    path='/profile' 
                    element={
                        !user.username  ? 
                        <Navigate to="/login" />
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
                        user.username  ? 
                        <Navigate to="/" />
                        :
                        <Login 
                            login={login} 
                            errors={loginErrors}
                            darkState={darkState}
                        /> 
                    }
                    />
                <Route 
                    exact 
                    path='/signup' 
                    element={
                        <Signup 
                            signup={signup} 
                            darkState={darkState}
                        />
                    }/>

                <Route render={() => <h1>Error 404</h1>}/>
            </Routes>
        </div>
    );
};

export default MainRoutes;