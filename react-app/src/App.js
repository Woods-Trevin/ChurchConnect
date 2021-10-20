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

function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  // const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    // if (!user) {
    //   setLoggedIn(false)
    //   console.log(loggedIn)
    // } else {
    //   setLoggedIn(true)
    //   console.log(loggedIn)
    // }
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
        <Route path='/' exact={true} >
          <DashboardComponent />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
