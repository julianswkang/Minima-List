import React, {useState, useEffect} from 'react';
import Header from '../containers/header.jsx';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try{
      // const response = await fetch('/auth/login', {
      //   method: 'POST',
      //   headers:{
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     username,
      //     password
      //   })
      // });
      const response = await axios.post('/auth/login', {
        username,
        password
      })
      console.log('here!')
      if (response.status === 200){
        console.log('back from logging in')
        props.handleSetUser(username);
        navigate('/')
      }
      
    }
    catch(err){
      console.log('there was an error signing up user in database! ', err);
    }
  }
  //console.log('At log in!');
  return (
    <div id="login">
    <Header />
      <p style={{textAlign:'center'}}>Log in page!</p>
      {/* if successful login, will need to invoke the props.handleSetUser function to the new user */}
      <form id='login-inputs' onSubmit={((e) => handleSubmit(e))}>
        <input type='text' id='login-username' placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' id='login-password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/>
        <input type='submit' id='login-button' value='Log in!'/> 
      </form>
    </div>
    
  )
}

export default Login;