import axios from 'axios';

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}