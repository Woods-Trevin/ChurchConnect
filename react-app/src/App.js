import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import UserNavbar from './components/UserNavbar';
import { authenticate } from './store/session';
import DashboardComponent from './components/DashboardComponent';
import Footer from './components/Footer';
import CreateEventComponent from './components/CreateEventComponent';
import CreateAnnouncementComponent from './components/CreateAnnouncementComponent';
import Profile from './components/Profile';
import EventDisplay from './components/EventDisplay';
import AnnouncementDisplay from './components/AnnouncementDisplay';
import UpdateEventComponent from './components/UpdateEventComponent';
import UpdateAnnouncementComponent from './components/UpdateAnnouncementComponent';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [updateAnnouncement, setUpdateAnnouncement] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();

  }, [dispatch]);


  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      {!loggedIn && <NavBar setLoggedIn={setLoggedIn} />}
      {loggedIn && <UserNavbar setLoggedIn={setLoggedIn} />}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm setLoggedIn={setLoggedIn} />
          <Footer />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
          <Footer />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route exact path='/' >
          <DashboardComponent setUpdateAnnouncement={setUpdateAnnouncement} />
          {/* <Footer /> */}
        </Route>
        <ProtectedRoute path='/event' exact={true} >
          <CreateEventComponent />
          {/* <Footer /> */}
        </ProtectedRoute>
        <ProtectedRoute path='/announcement' exact={true} >
          <CreateAnnouncementComponent />
          {/* <Footer /> */}
        </ProtectedRoute>
        <Route path='/profile' exact={true} >
          <Profile />
          {/* <Footer /> */}
        </Route>
        <Route path='/event/:eventId' exact={true} >
          {!updateEvent && <EventDisplay setUpdateEvent={setUpdateEvent} />}
          {updateEvent && <UpdateEventComponent setUpdateEvent={setUpdateEvent} />}
          {/* <Footer /> */}
        </Route>
        <Route path='/announcement/:announcementId' exact={true} >
          {!updateAnnouncement && <AnnouncementDisplay setUpdateAnnouncement={setUpdateAnnouncement} />}
          {updateAnnouncement && <UpdateAnnouncementComponent setUpdateAnnouncement={setUpdateAnnouncement} />}
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
