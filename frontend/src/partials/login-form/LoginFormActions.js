import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import { setAuthorizationToken, setCurrentUser } from '../auth/AuthActions';
import jwt from 'jsonwebtoken';

export const START_LOGIN = 'START_LOGIN';
export const SUCCEED_LOGIN = 'SUCCEED_LOGIN';
export const FAIL_LOGIN = 'FAIL_LOGIN';
export const UPDATE_LOGIN_ERRORS = 'UPDATE_LOGIN_ERRORS';

export const startLogin = () => ({
  type: START_LOGIN
});

export const succeedLogin = () => ({
  type: SUCCEED_LOGIN
});

export const failLogin = () => ({
  type: FAIL_LOGIN
});

export const updateLoginErrors = (errors) => ({
  type: UPDATE_LOGIN_ERRORS,
  errors
});

export const validateLoginInput = (data) => {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export const loginRequest = (formData, history) => {
  return dispatch => {
    let errors = {};

    dispatch(startLogin());
    dispatch(updateLoginErrors(errors));
    
    axios.post('/api/token/', formData)
    .then(res => {
      dispatch(succeedLogin());
      const token = res.data.access;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch(failLogin());

      errors = {
        username: "Username or password incorrect.",
        password: "Username or password incorrect."
      };
      
      dispatch(updateLoginErrors(errors));
    });
  }
}