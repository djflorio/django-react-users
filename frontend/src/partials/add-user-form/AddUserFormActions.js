import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

export const START_ADD_USER = 'START_ADD_USER';
export const SUCCEED_ADD_USER = 'SUCCEED_ADD_USER';
export const FAIL_ADD_USER = 'FAIL_ADD_USER';
export const UPDATE_ADD_USER_ERRORS = 'UPDATE_ADD_USER_ERRORS';

export const startAddUser = () => ({
  type: START_ADD_USER
});

export const succeedAddUser = () => ({
  type: SUCCEED_ADD_USER
});

export const failAddUser = () => ({
  type: FAIL_ADD_USER
});

export const updateAddUserErrors = (errors) => ({
  type: UPDATE_ADD_USER_ERRORS,
  errors
});

export const validateAddUserInput = (data) => {
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

export const addUserRequest = (formData, history) => {
  return dispatch => {
    let errors = {};

    dispatch(startAddUser());
    dispatch(updateAddUserErrors(errors));
    
    // Send request to the admin-new endpoint instead of new.
    // This allows the ability to create a superuser.
    axios.post('/api/users/admin-new/', formData)
    .then(res => {
      dispatch(succeedAddUser());
      history.push('/admin');
    })
    .catch(err => {
      dispatch(failAddUser());
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
      dispatch(updateAddUserErrors(errors));
    });
  }
}