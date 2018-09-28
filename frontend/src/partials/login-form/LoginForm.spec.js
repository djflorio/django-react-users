import * as actions from './LoginFormActions';
import reducer, { defaultState } from './LoginFormReducer';


describe('Login Form', () => {

  it('should create action to start login', () => {
    expect(actions.startLogin()).toEqual({
      type: actions.START_LOGIN
    });
  });

  it('should create action to succeed Login', () => {
    expect(actions.succeedLogin()).toEqual({
      type: actions.SUCCEED_LOGIN
    });
  });

  it('should create action to fail Login', () => {
    expect(actions.failLogin()).toEqual({
      type: actions.FAIL_LOGIN
    });
  });

  it('should create action to update errors', () => {
    expect(actions.updateLoginErrors({ email: "error" })).toEqual({
      type: actions.UPDATE_LOGIN_ERRORS,
      errors: { email: "error" }
    });
  });

  it('should set loading to true with startLogin', () => {
    expect(reducer(defaultState, actions.startLogin())).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('should set loading to false with succeedLogin', () => {
    const loadingState = {
      ...defaultState,
      loading: true
    };
    expect(reducer(loadingState, actions.succeedLogin())).toEqual({
      ...loadingState,
      loading: false
    });
  });

  it('should set loading to false with failLogin', () => {
    const loadingState = {
      ...defaultState,
      loading: true
    };
    expect(reducer(loadingState, actions.failLogin())).toEqual({
      ...loadingState,
      loading: false
    });
  });

  it('should update errors with updateLoginErrors', () => {
    const errors = {
      email: "error",
      username: "error"
    };
    expect(reducer(defaultState, actions.updateLoginErrors(errors))).toEqual({
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

describe('validateLoginInput', () => {

  const testData = {
    username: "test",
    password: "password"
  }

  it('should enforce required username', () => {
    const noUsername = {
      ...testData,
      username: ""
    }
    const test = actions.validateLoginInput(noUsername);
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
    const test = actions.validateLoginInput(noPassword);
    expect(test).toEqual({
      errors: expect.objectContaining({ password: 'Password is required' }),
      isValid: false
    });
  });

});