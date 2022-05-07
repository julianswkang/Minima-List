import React, {useState, useEffect} from 'react';
import Header from '../containers/header.jsx';
import {Redirect} from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit (){
    try{
      let user = await fetch('/auth/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      props.handleSetUser(user);
      <Redirect to='/' />
    }
    catch(err){
      console.log('there was an error signing up user in database! ', err);
    }
  }
  return (
    <div id="login">
      <Header />
      <p>Log in page!</p>
      {/* if successful login, will need to invoke the props.handleSetUser function to the new user */}
      <div id='login-inputs'>
        <input type='text' id='login-username' placeholder='Enter Username' onChange={() => setUsername(e.target.value)}/>
        <input tpye='password' id='login-password' placeholder='Enter Password' onChange={() => setPassword(e.target.value)}/>
        <button type='submit' id='login-button' onClick={handleSubmit}> Log In! </button>
      </div>
    </div>
    
  )
}

export default Login;