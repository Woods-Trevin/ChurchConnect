import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

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
    <div>
      <div>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
      <div>
        <button type='button' className="demoBtn" onClick={handleDemoLogin} >
          DEMO
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
