import React, {useState, useEffect} from 'react';
import Header from '../containers/header.jsx';

const Login = (props) => {
  return (
    <div id="login">
      <Header />
      <p>Log in page!</p>
      {/* if successful login, will need to invoke the props.handleSetUser function to the new user */}
    </div>
    
  )
}

export default Login;