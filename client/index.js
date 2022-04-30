import React, {useState} from 'react';
import {render} from 'react-dom';
import App from './components/app.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './styles.css';
import { useReducer } from 'react/cjs/react.development';

const [user, setUser] = useState('');

render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App user={user}/>} />
      <Route path='login' element={<Login handleSetUser={setUser}/>} />
      <Route path='signup' element={<Signup handleSetUser={setUser}/>} />
    </Routes>
  </BrowserRouter>,


 
  document.querySelector('#root')
);