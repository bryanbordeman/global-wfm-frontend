import React, { useState } from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import UserService from "./services/User.services";

function App() {
  const [ user, setUser ] = useState(localStorage.getItem('user') || null)
  const [ token, setToken ] = useState(localStorage.getItem('token') || null)
  const [ error, setError ] = useState('')

  async function login(user= null){
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
    <div className="App">
      <BrowserRouter>
          <MainRoutes/>
        </BrowserRouter>
    </div>
  );
}

export default App;
