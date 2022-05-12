import React, {useState, useEffect} from 'react';
import Header from '../containers/header.jsx';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try{
      // console.log('clicking submit!')
      // let response = await fetch('/auth/signup', {
      //   method: 'POST',
      //   headers:{
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     username,
      //     password
      //   })
      // });
      const response = await axios.post('/auth/signup', {
        username,
        password
      })
      console.log('here!!!');
      if (response.status === 200){
        console.log('back from signing up!')
        props.handleSetUser(username);
        navigate('/');
      }
      
    }
    catch(err){
      console.log('there was an error signing up user in database! ', err);
    }
  }
  //console.log("at sign up!");
  return(
    <div id="signup">
      <Header />
      <p style={{textAlign:'center'}}>Sign up</p>
      {/* if successful signup, will need to invoke the props.handleSetUser function to the new user */}
      <form id='signup-inputs' onSubmit={(e) => handleSubmit(e)}>
        <input type='text' id='signup-username' placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' id='signup-password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/>
        <input type='submit' id='signup-button' onClick={handleSubmit} value='Sign up!'/>
      </form>
    </div>
  )
}

export default Signup;