import React, {useState} from 'react';
import Header from '../containers/header.jsx';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

//Component that provides functionality to sign up
//Houses its own internal state properties for username and password
//props={handleSetUser(), handleSubmit()}
const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try{
      await axios.post('/auth/signup', {
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
  return(
    <div id="signup">
      <Header />
      <p style={{textAlign:'center'}}>Sign up</p>
      <form id='signup-inputs' onSubmit={(e) => handleSubmit(e)}>
        <input type='text' id='signup-username' placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} required/>
        <input type='password' id='signup-password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required/>
        <input type='submit' id='signup-button' onClick={handleSubmit} value='Sign up!'/>
      </form>
    </div>
  )
}

export default Signup;