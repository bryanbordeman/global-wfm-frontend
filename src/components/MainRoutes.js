import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

function MainRoutes(props) {
    const { user, token, login } = props
    
    return (
        <div>
            <Routes>
                <Route 
                    exact 
                    path='/' 
                    element={
                        <Dashboard
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


                <Route render={() => <h1>Error 404</h1>}/>
            </Routes>
        </div>
    );
};

export default MainRoutes;