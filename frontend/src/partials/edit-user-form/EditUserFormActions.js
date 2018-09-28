import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

export const START_EDIT_USER = 'START_EDIT_USER';
export const SUCCEED_EDIT_USER = 'SUCCEED_EDIT_USER';
export const FAIL_EDIT_USER = 'FAIL_EDIT_USER';
export const START_FETCH_USER = 'START_FETCH_USER';
export const SUCCEED_FETCH_USER = 'SUCCEED_FETCH_USER';
export const FAIL_FETCH_USER = 'FAIL_FETCH_USER';
export const UPDATE_EDIT_USER_ERRORS = 'UPDATE_EDIT_USER_ERRORS';

export const startEditUser = () => ({
  type: START_EDIT_USER
});

export const succeedEditUser = () => ({
  type: SUCCEED_EDIT_USER
});

export const failEditUser = () => ({
  type: FAIL_EDIT_USER
});

export const startFetchUser = () => ({
  type: START_FETCH_USER
});

export const succeedFetchUser = (user) => ({
  type: SUCCEED_FETCH_USER,
  user
});

export const failFetchUser = () => ({
  type: FAIL_FETCH_USER
});

export const updateEditUserErrors = (errors) => ({
  type: UPDATE_EDIT_USER_ERRORS,
  errors
});

export const validateEditUserInput = (data) => {
  let errors = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (data.password.length > 0 && data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const editUserRequest = (data, history) => {
  return dispatch => {
    let errors = {};

    dispatch(startEditUser());
    dispatch(updateEditUserErrors(errors));

    let formData;

    // If the password was left blank, don't include it in the request.
    if (data.password === "") {
      formData = {
        username: data.username,
        email: data.email,
        is_staff: data.is_staff
      }
    } else {
      formData = {
        ...data
      }
    }
    
    axios.patch('/api/users/edit/' + data.id + '/', formData)
    .then(res => {
      dispatch(succeedEditUser());
      history.push('/admin');
    })
    .catch(err => {
      dispatch(failEditUser());
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
      dispatch(updateEditUserErrors(errors));
    });
  }
}

export const fetchUser = (id, callback) => {
  return dispatch => {
    dispatch(startFetchUser());
    axios.get('/api/users/' + id + '/')
    .then(res => {
      dispatch(succeedFetchUser(res.data));
      callback(res.data);
    })
    .catch(err => {
      dispatch(failFetchUser());
    });
  }
}