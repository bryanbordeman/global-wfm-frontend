import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import WorksegmentList from '../pages/Worksegments';
import Schedule from '../pages/Schedule';
import Projects from '../pages/Projects';
import Announcements from '../pages/Announcements';
import Expenses from '../pages/Expenses';
import Profile from '../pages/Profile'
import Task from '../pages/Task'
import Field from '../pages/Field';
import Shop from '../pages/Shop';

function MainRoutes(props) {
    const { user, token, setToken, login, signup, loginErrors, darkState, handleOpenSnackbar } = props
    const { worksegments, setWorksegments } = props;
    const { totals, setTotals } = props;
    const { isoWeek, setIsoWeek } = props;
    const { PTOsegments, setPTOsegments } = props;
    const { employees } = props;


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
                        setToken={setToken}
                        handleOpenSnackbar={handleOpenSnackbar}
                        
                        worksegments={worksegments}
                        setWorksegments={setWorksegments}
                        PTOsegments={PTOsegments}
                        totals={totals}
                        setTotals={setTotals}
                        isoWeek={isoWeek}
                        setIsoWeek={setIsoWeek}

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
                        darkState={darkState}
                        worksegments={worksegments}
                        setWorksegments={setWorksegments}
                        PTOsegments={PTOsegments}
                        setPTOsegments={setPTOsegments}
                        totals={totals}
                        setTotals={setTotals}
                        isoWeek={isoWeek}
                        setIsoWeek={setIsoWeek}

                        employees={employees}

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
                        employees={employees}
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
                        employees={employees}
                        />
                }/>
                <Route 
                    exact 
                    path='/field' 
                    element={
                        !user.username  ? 
                        <Navigate to="/login" />
                        :
                        <Field
                        user={user}
                        token={token}
                        darkState={darkState}
                        handleOpenSnackbar={handleOpenSnackbar}
                        />
                }/>
                <Route 
                    exact 
                    path='/shop' 
                    element={
                        !user.username  ? 
                        <Navigate to="/login" />
                        :
                        <Shop
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