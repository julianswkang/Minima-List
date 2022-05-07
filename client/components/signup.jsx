import React, {useState, useEffect} from 'react';

const Signup = (props) => {
  return(
    <div id="signup">
      <Header />
      <p>Sign up</p>
      {/* if successful signup, will need to invoke the props.handleSetUser function to the new user */}
    </div>
    
  )
  
}

export default Signup;