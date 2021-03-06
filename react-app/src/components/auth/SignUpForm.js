import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupFormComponent.css';

const SignUpForm = ({ setLoggedIn }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [history, setHistory] = useState(useHistory());
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const Phase = {
    Typing: "Typing",
    Pausing: "Pausing",
    Deleting: "Deleting",
  }

  const [typedCallToAction, setTypedCallToAction] = useState('');
  const [phase, setPhase] = useState(Phase.Typing)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      } else {
        setLoggedIn(true)
      }
    }
    // history.push('/');
    // setHistory({ ...history })

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const callToActionText = "Connect With Your Church. Sign Up Now!!!"

  var splash_to_animate = 1;

  useEffect(() => {
    const errors = [];

    if (!username) errors.push('Username must be included.')
    if (username.length > 40) errors.push('Username is too long.');
    if (!email) errors.push('Email must be included.')
    if (email.length > 255) errors.push('Email is too long.')
    if (!password) errors.push('Password must be included.')
    if (!repeatPassword) errors.push('Repeat password must be included.')
    if (password !== repeatPassword) errors.push('Password and Repeat Password does not match.')

    let regexTwo = /\S+@\S+\.\S+/;
    if (!regexTwo.test(email)) errors.push('Email is invalid.')

    setValidationErrors(errors)


    const TYPING_INTERVAL = 150;
    const PAUSE_DELAY = 5000;
    const DELETING_INTERVAL = 50;

    switch (phase) {
      case Phase.Typing:
        {
          const nextTypedCallToAction = callToActionText.slice(0, typedCallToAction.length + 1)
          if (nextTypedCallToAction === typedCallToAction) {
            setPhase(Phase.Pausing)
            return;
          }

          const timeout = setTimeout(() => {
            setTypedCallToAction(nextTypedCallToAction)
          }, TYPING_INTERVAL)

          return () => clearTimeout(timeout)
        }
      case Phase.Deleting:
        {
          if (!typedCallToAction) {
            setPhase(Phase.Typing)
            return;
          }
          const nextDeletedText = callToActionText.slice(0, typedCallToAction.length - 1)

          const timeout = setTimeout(() => {
            setTypedCallToAction(nextDeletedText)
          }, DELETING_INTERVAL)

          return () => clearTimeout(timeout)
        }
      case Phase.Pausing:
      default:
        const timeout = setTimeout(() => {
          setPhase(Phase.Deleting)
        }, PAUSE_DELAY)

        return () => clearTimeout(timeout)
    }


    if (phase === Phase.Pausing) return;







  }, [dispatch, username, email, password, repeatPassword, history, typedCallToAction, phase]);


  if (user) {
    return <Redirect to='/' />;
  }







  return (
    <div className="signupForm_outmost_ctnr">
      <ul className="signupForm_errors">
        {validationErrors.map((error, idx) =>
          <li key={idx}>{error}</li>
        )}
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </ul>
      <div className="signupForm_outer_wrapper">
        <div className="signup_label blinking-cursor">
          {typedCallToAction}
        </div>
        <form className="signupForm_inner_wrapper" onSubmit={onSignUp}>
          <div className="signupForm_username_ctnr" >
            <label className="signupForm_username_label">
              Username
            </label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              className="signupForm_username_input"
              value={username}
            ></input>
          </div>
          <div className="signupForm_email_ctnr" >
            <label className="signupForm_email_label">
              Email
            </label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              className="signupForm_email_input"
              value={email}
            ></input>
          </div>
          <div className="signupForm_password_ctnr" >
            <label className="signupForm_password_label" >
              Password
            </label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              className="signupForm_password_input"
              value={password}
            ></input>
          </div>
          <div className="signupForm_repeatpassword_ctnr" >
            <label className="signupForm_repeatpassword_label" >
              Repeat Password
            </label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              className="signupForm_repeatpassword_input"
              required={true}
            ></input>
          </div>
          <div className="signupForm_submitBtn_ctnr">
            <button className="signupForm_submitBtn" type='submit' disabled={validationErrors.length > 0} >Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
