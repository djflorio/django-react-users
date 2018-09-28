import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

export const START_SIGNUP = 'START_SIGNUP';
export const SUCCEED_SIGNUP = 'SUCCEED_SIGNUP';
export const FAIL_SIGNUP = 'FAIL_SIGNUP';
export const UPDATE_SIGNUP_ERRORS = 'UPDATE_SIGNUP_ERRORS';

export const startSignup = () => ({
  type: START_SIGNUP
});

export const succeedSignup = () => ({
  type: SUCCEED_SIGNUP
});

export const failSignup = () => ({
  type: FAIL_SIGNUP
});

export const updateSignupErrors = (errors) => ({
  type: UPDATE_SIGNUP_ERRORS,
  errors
});

export const validateSignupInput = (data) => {
  let errors = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  } else {
    if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const signupRequest = (formData, history) => {
  return dispatch => {
    let errors = {};

    dispatch(startSignup());
    dispatch(updateSignupErrors(errors));

    // If a token is sent with the signup request, it will
    // cause an error. To avoid this, we ensure there's no
    // authorization header in the axios request.
    delete axios.defaults.headers.common['Authorization'];

    axios.post('/api/users/new/', formData)
    .then(res => {
      dispatch(succeedSignup());
      history.push('/register-success');
    })
    .catch(err => {
      dispatch(failSignup());
      const usernameError = err.response.data.username;
      const emailError = err.response.data.email;
      if (usernameError && usernameError[0] === "This field must be unique.") {
        errors = {
          ...errors,
          username: "Username taken."
        };
      }
      if (emailError && emailError[0] === "This field must be unique.") {
        errors = {
          ...errors,
          email: "Email taken."
        };
      }
      dispatch(updateSignupErrors(errors));
    });
  }
}