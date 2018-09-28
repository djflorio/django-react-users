// Node modules
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Assets
import './Signup.css';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

// Components
import SignupForm from '../../partials/signup-form/SignupFormContainer';


const Signup = () => (
  <div className="signup">
    <Link to="/" className="signup__back">
      <FontAwesomeIcon icon={faBackward} />&nbsp;home
    </Link>
    <SignupForm />
    <div className="signup__login">
      Have an account?
      <Link to="/login" className="signup__login-link">
        Login
      </Link>
    </div>
  </div>
);

export default Signup;