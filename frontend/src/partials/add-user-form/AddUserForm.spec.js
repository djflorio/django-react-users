import * as actions from './AddUserFormActions';
import reducer, { defaultState } from './AddUserFormReducer';


describe('AddUser Form', () => {

  it('should create action to start add user', () => {
    expect(actions.startAddUser()).toEqual({
      type: actions.START_ADD_USER
    });
  });

  it('should create action to succeed add user', () => {
    expect(actions.succeedAddUser()).toEqual({
      type: actions.SUCCEED_ADD_USER
    });
  });

  it('should create action to fail add user', () => {
    expect(actions.failAddUser()).toEqual({
      type: actions.FAIL_ADD_USER
    });
  });

  it('should create action to update add user errors', () => {
    expect(actions.updateAddUserErrors({ email: "error" })).toEqual({
      type: actions.UPDATE_ADD_USER_ERRORS,
      errors: { email: "error" }
    });
  });

  it('should set loading to true with startAddUser', () => {
    expect(reducer(defaultState, actions.startAddUser())).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('should set loading to false with succeedAddUser', () => {
    const loadingState = {
      ...defaultState,
      loading: true
    };
    expect(reducer(loadingState, actions.succeedAddUser())).toEqual({
      ...loadingState,
      loading: false
    });
  });

  it('should set loading to false with failAddUser', () => {
    const loadingState = {
      ...defaultState,
      loading: true
    };
    expect(reducer(loadingState, actions.failAddUser())).toEqual({
      ...loadingState,
      loading: false
    });
  });

  it('should update errors with updateAddUserErrors', () => {
    const errors = {
      email: "error",
      username: "error"
    };
    expect(reducer(defaultState, actions.updateAddUserErrors(errors))).toEqual({
      ...defaultState,
      errors: errors
    });
  });

  it('should return state with unrecognized action', () => {
    expect(reducer(defaultState, { type: "unrecognized" })).toEqual(
      defaultState
    );
  });

});

describe('validateAddUserInput', () => {

  const testData = {
    email: "test@test.com",
    username: "test",
    password: "password",
    passwordConfirmation: "password"
  }

  it('should enforce valid email', () => {
    const invalidEmail = {
      ...testData,
      email: "invalid"
    }
    const test = actions.validateAddUserInput(invalidEmail);
    expect(test).toEqual({
      errors: { email: 'Email is invalid' },
      isValid: false
    });
  });

  it('should enforce required username', () => {
    const noUsername = {
      ...testData,
      username: ""
    }
    const test = actions.validateAddUserInput(noUsername);
    expect(test).toEqual({
      errors: { username: 'Username is required' },
      isValid: false
    });
  });

  it('should enforce required password', () => {
    const noPassword = {
      ...testData,
      password: ""
    }
    const test = actions.validateAddUserInput(noPassword);
    expect(test).toEqual({
      errors: expect.objectContaining({ password: 'Password is required' }),
      isValid: false
    });
  });

  it('should enforce required password length', () => {
    const shortPassword = {
      ...testData,
      password: "short"
    }
    const test = actions.validateAddUserInput(shortPassword);
    expect(test).toEqual({
      errors: expect.objectContaining({ password: 'Password must be at least 8 characters' }),
      isValid: false
    });
  });

  it('should enforce matching passwords', () => {
    const passwordMismatch = {
      ...testData,
      password: "password1",
      passwordConfirmation: "password2"
    }
    const test = actions.validateAddUserInput(passwordMismatch);
    expect(test).toEqual({
      errors: { passwordConfirmation: 'Passwords must match' },
      isValid: false
    });
  });

});