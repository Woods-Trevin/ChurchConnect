import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginFormComponent.css';

const LoginForm = ({ setLoggedIn }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    setLoggedIn(true);

  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const demo = await dispatch(login("demo@aa.io", "password"));
    if (demo) {
      return
    } else {
      setLoggedIn(true);
    }
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="loginForm_outmost_ctnr">
      <p className="ChurchConnect">
        ChurchConnect
      </p>
      <p className="ChurchConnect_Login_Instruction" >
        Login
      </p>
      <div className="loginForm_inner_ctnr">
        <form className="loginForm_wrapper" onSubmit={onLogin}>
          <div className="loginForm_errors" >
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="loginForm_email_ctnr" >
            <label className="loginForm_email_label" htmlFor='email'>
              Email
            </label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              className="loginForm_email_input"
              onChange={updateEmail}
            />
          </div>
          <div className="loginForm_password_ctnr" >
            <label className="loginForm_password_label" htmlFor='password'>
              Password
            </label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              className="loginForm_password_input"
              onChange={updatePassword}
            />
          </div>
          <div className="loginForm_submitBtn_ctnr">
            <button className="loginForm_submitBtn" type='submit'>Login</button>
          </div>
          <div className="loginForm_demoBtn_ctnr">
            <button type='button' className="demoBtn" onClick={handleDemoLogin} >
              DEMO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
