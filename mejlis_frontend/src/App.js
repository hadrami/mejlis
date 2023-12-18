import { useEffect } from 'react';
import React from 'react';
//import logo from './assets/mejlis-logo.png';
//import './App.css';
import {Routes, Route, useNavigate}  from 'react-router-dom' ;
import Login from './components/Login';
import Home from './container/Home';
import { fetchUser } from './utils/fetchUser';

function App() {
  const navigate = useNavigate();
  const User = fetchUser();

  useEffect(() => {

    if ( User === null ){
      
       navigate('/login');
    }
  }, [User]); 

  return (
    <Routes>
      
         <Route path='/login' element={<Login />}/>
         <Route path='/*' element={<Home />}/>
      
    </Routes>
  );
}

export default App; 

