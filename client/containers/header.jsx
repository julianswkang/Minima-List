import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
  return(
    <div>
      <header>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/login">
          <p>Log-in</p>
        </Link>
        <Link to="/signup">
          <p>Sign-up</p>
        </Link>
      </header>
    </div>
    
  )
}

export default Header;