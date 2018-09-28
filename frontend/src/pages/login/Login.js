// Node modules
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Assets
import './Login.css';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

// Components
import LoginForm from '../../partials/login-form/LoginFormContainer';


const Login = () => (
  <div className="login">
    <Link to="/" className="login__back">
      <FontAwesomeIcon icon={faBackward} />&nbsp;home
    </Link>
    <LoginForm />
    <div className="login__signup">
      Need an account?
      <Link to="/signup" className="signup__login-link">
        Sign up
      </Link>
    </div>
  </div>
);

export default Login;