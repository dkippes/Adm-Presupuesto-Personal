import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
      <React.Fragment>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </React.Fragment>
    );
}

export default NavBar
