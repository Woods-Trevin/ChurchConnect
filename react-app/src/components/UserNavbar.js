import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './UserNavbar.css'

const UserNavBar = ({ loggedIn, setLoggedIn }) => {

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (!user) {
            setLoggedIn(false)
        } else {
            setLoggedIn(true)
        }
    }, [])

    return (
        <nav className="userNav_outmost_ctnr" >
            <ul className="userNav_innermost_ctnr">
                <li className="userNav_home_ctnr">
                    <NavLink to='/' exact={true} activeClassName='active' className='userNav_Home'>
                        ChurchConnect
                    </NavLink>
                </li>
                <li className="userNav_CreateEvent_ctnr">
                    <NavLink to='/event' className='userNav_CreateEvent' >
                        Create Event
                    </NavLink>
                </li>
                <li className="userNav_CreateAnnouncement_ctnr">
                    <NavLink to='/announcement' className='userNav_CreateAnnouncement' >
                        Create Announcement
                    </NavLink>
                </li>
                <li className="userNav_Profile_ctnr">
                    <NavLink to='/profile' className='userNav_Profile' >
                        Profile
                    </NavLink>
                </li>
                <li className="userNav_logout_ctnr">
                    <LogoutButton setLoggedIn={setLoggedIn} className='userNav_logout' />
                </li>

            </ul>
        </nav>
    );
}

export default UserNavBar;