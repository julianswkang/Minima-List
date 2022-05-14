import React, {useState} from 'react';
import Header from '../containers/header.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//Component that provides functionality to log in
//Houses its own internal state properties for username and password
//props={handleSetUser(), handleSubmit()}
const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try{
      await axios.post('/auth/login', {
        username,
        password
      })
      props.handleSetUser(username);
      setUsername('');
      setPassword('');
      navigate('/');
    }
    catch(err){
      console.log('there was an error signing up user in database! ', err);
    }
  }
  return (
    <div id="login">
      <Header />
      <p style={{textAlign:'center'}}>Log in page!</p>
      <form id='login-inputs' onSubmit={((e) => handleSubmit(e))}>
        <input type='text' id='login-username' placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} required/>
        <input type='password' id='login-password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required/>
        <input type='submit' id='login-button' value='Log in!'/> 
      </form>
    </div>
  )
}

export default Login;