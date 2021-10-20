import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './LogoutButton.css'

const LogoutButton = ({ setLoggedIn }) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    setLoggedIn(false);
  };

  return <button className='logoutBtn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
