import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logout } from '../../store/session';
import './LogoutButton.css'

const LogoutButton = ({ setLoggedIn }) => {
  const history = useHistory()

  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    setLoggedIn(false);
    history.push('/')
  };

  return <button className='logoutBtn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
