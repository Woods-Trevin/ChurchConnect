import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import LogoutButton from './auth/LogoutButton';
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
    <nav className="navbar_outmost_ctnr" >
      <ul className="navbar_innermost_ctnr" >
        <li className="navbar_home_ctnr" >
          <NavLink to='/' exact={true} activeClassName='active' className="navbar_Home" >
            ChurchConnect
          </NavLink>
        </li>
        <li className="navbar_login_ctnr" >
          <NavLink to='/login' exact={true} activeClassName='active' className="navbar_Login" >
            Login
          </NavLink>
        </li>
        <li className="navbar_signup_ctnr" >
          <NavLink to='/sign-up' exact={true} activeClassName='active' className="navbar_Signup" >
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
