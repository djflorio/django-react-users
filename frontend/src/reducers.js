import { combineReducers } from 'redux';

import signupForm from './partials/signup-form/SignupFormReducer';
import loginForm from './partials/login-form/LoginFormReducer';
import auth from './partials/auth/AuthReducer';
import userList from './partials/user-list/UserListReducer';
import addUserForm from './partials/add-user-form/AddUserFormReducer';
import editUserForm from './partials/edit-user-form/EditUserFormReducer';
import options from './partials/options/OptionsReducer';

export default combineReducers({
  signupForm,
  loginForm,
  auth,
  userList,
  addUserForm,
  editUserForm,
  options
});