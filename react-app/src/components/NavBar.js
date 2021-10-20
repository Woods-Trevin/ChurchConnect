import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './Navbar.css'

const NavBar = ({ loggedIn, setLoggedIn }) => {

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    if (!user) {
      setLoggedIn(false)
    } else {
      setLoggedIn(true)
    }
  }, [])


  return (
    <nav>
      {!loggedIn &&
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */}
          {/* <li>
            <LogoutButton setLoggedIn={setLoggedIn} />
          </li> */}
        </ul>
      }
    </nav>
  );
}

export default NavBar;
