import React, {useState} from 'react';
import {createRoot} from 'react-dom';
import App from './containers/app.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './styles.css';


//Index component which houses state of current user
//Will provide setUser functionality to login and signup components
//User will be provided to the App component
const Index = () => {
  const [user, setUser] = useState('');

  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App user={user}/>} />
      <Route path='login' element={<Login handleSetUser={setUser}/>} />
      <Route path='signup' element={<Signup handleSetUser={setUser}/>} />
    </Routes>
  </BrowserRouter>
  )
}

const root = createRoot(document.querySelector('#root'));
root.render(<Index />);
  

