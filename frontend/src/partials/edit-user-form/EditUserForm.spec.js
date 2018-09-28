import * as actions from './EditUserFormActions';
import reducer, { defaultState } from './EditUserFormReducer';


describe('EditUser Form', () => {

  it('should create action to start edit user', () => {
    expect(actions.startEditUser()).toEqual({
      type: actions.START_EDIT_USER
    });
  });

  it('should create action to succeed edit user', () => {
    expect(actions.succeedEditUser()).toEqual({
      type: actions.SUCCEED_EDIT_USER
    });
  });

  it('should create action to fail edit user', () => {
    expect(actions.failEditUser()).toEqual({
      type: actions.FAIL_EDIT_USER
    });
  });

  it('should create action to start fetch user', () => {
    expect(actions.startFetchUser()).toEqual({
      type: actions.START_FETCH_USER
    });
  });

  it('should create action to succeed fetch user', () => {
    expect(actions.succeedFetchUser()).toEqual({
      type: actions.SUCCEED_FETCH_USER
    });
  });

  it('should create action to fail fetch user', () => {
    expect(actions.failFetchUser()).toEqual({
      type: actions.FAIL_FETCH_USER
    });
  });

  it('should create action to update edit user errors', () => {
    expect(actions.updateEditUserErrors({ email: "error" })).toEqual({
      type: actions.UPDATE_EDIT_USER_ERRORS,
      errors: { email: "error" }
    });
  });

  it('should set loading to true with startEditUser', () => {
    expect(reducer(defaultState, actions.startEditUser())).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('should set loading to false with succeedEditUser', () => {
    const loadingState = {
      ...defaultState,
      loading: true
    };
    expect(reducer(loadingState, actions.succeedEditUser())).toEqual({
      ...loadingState,
      loading: false
    });
  });

  it('should set loading to false with failEditUser', () => {
    const loadingState = {
      ...defaultState,
      loading: true
    };
    expect(reducer(loadingState, actions.failEditUser())).toEqual({
      ...loadingState,
      loading: false
    });
  });

  it('should set fetching to true with startFetchUser', () => {
    expect(reducer(defaultState, actions.startFetchUser())).toEqual({
      ...defaultState,
      fetching: true
    });
  });

  it('should set fetching to false with succeedFetchUser', () => {
    const fetchingState = {
      ...defaultState,
      fetching: true
    };
    expect(reducer(fetchingState, actions.succeedFetchUser("user"))).toEqual({
      ...fetchingState,
      user: "user",
      fetching: false
    });
  });

  it('should set fetching to false with failFetchUser', () => {
    const fetchingState = {
      ...defaultState,
      fetching: true
    };
    expect(reducer(fetchingState, actions.failFetchUser())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should update errors with updateEditUserErrors', () => {
    const errors = {
      email: "error",
      username: "error"
    };
    expect(reducer(defaultState, actions.updateEditUserErrors(errors))).toEqual({
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

describe('validateEditUserInput', () => {

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
    const test = actions.validateEditUserInput(invalidEmail);
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
    const test = actions.validateEditUserInput(noUsername);
    expect(test).toEqual({
      errors: { username: 'Username is required' },
      isValid: false
    });
  });

  it('should enforce required password length', () => {
    const shortPassword = {
      ...testData,
      password: "short"
    }
    const test = actions.validateEditUserInput(shortPassword);
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
    const test = actions.validateEditUserInput(passwordMismatch);
    expect(test).toEqual({
      errors: { passwordConfirmation: 'Passwords must match' },
      isValid: false
    });
  });

});