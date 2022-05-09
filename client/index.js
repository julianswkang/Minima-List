import React, {useState} from 'react';

import {render, createRoot} from 'react-dom';
import App from './components/app.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './styles.css';


const root = createRoot(document.querySelector('#root'));

root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App />} />
    <Route path='login' element={<Login />} />
    <Route path='signup' element={<Signup />} />
  </Routes>
</BrowserRouter>
)
// render(
//   <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<App />} />
//       <Route path='login' element={<Login />} />
//       <Route path='signup' element={<Signup />} />
//     </Routes>
//   </BrowserRouter>,


 
//   document.querySelector('#root')
// );