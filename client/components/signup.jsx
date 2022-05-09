import React, {useState, useEffect} from 'react';
import Header from '../containers/header.jsx';
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  async function handleSubmit (){
    try{
      let user = await fetch('/auth/signup', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      //props.handleSetUser(user);
      navigate('/');
    }
    catch(err){
      console.log('there was an error signing up user in database! ', err);
    }
  }

  return(
    <div id="signup">
      <Header />
      <p>Sign up</p>
      {/* if successful signup, will need to invoke the props.handleSetUser function to the new user */}
      <div id='signup-inputs'>
        <input type='text' id='signup-username' placeholder='Enter Username' onChange={() => setUsername(e.target.value)}/>
        <input tpye='password' id='signup-password' placeholder='Enter Password' onChange={() => setPassword(e.target.value)}/>
        <button type='submit' id='signup-button' onClick={handleSubmit}>Sign Up!</button>
      </div>
    </div>
    
  )
  
}

export default Signup;