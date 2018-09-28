import * as actions from './SignupFormActions';
import reducer, { defaultState } from './SignupFormReducer';


describe('Signup Form', () => {

  it('should create action to start signup', () => {
    expect(actions.startSignup()).toEqual({
      type: actions.START_SIGNUP
    });
  });

  it('should create action to succeed signup', () => {
    expect(actions.succeedSignup()).toEqual({
      type: actions.SUCCEED_SIGNUP
    });
  });

  it('should create action to fail signup', () => {
    expect(actions.failSignup()).toEqual({
      type: actions.FAIL_SIGNUP
    });
  });

  it('should create action to update signup errors', () => {
    expect(actions.updateSignupErrors({ email: "error" })).toEqual({
      type: actions.UPDATE_SIGNUP_ERRORS,
      errors: { email: "error" }
    });
  });

  it('should set loading to true with startSignup', () => {
    expect(reducer(defaultState, actions.startSignup())).toEqual({
      ...defaultState,
      loading: true
    });
  });

  it('should set loading to false with succeedSignup', () => {
    const loadingState = {
      ...defaultState,
      loading: true
    };
    expect(reducer(loadingState, actions.succeedSignup())).toEqual({
      ...loadingState,
      loading: false
    });
  });

  it('should set loading to false with failSignup', () => {
    const loadingState = {
      ...defaultState,
      loading: true
    };
    expect(reducer(loadingState, actions.failSignup())).toEqual({
      ...loadingState,
      loading: false
    });
  });

  it('should update errors with updateSignupErrors', () => {
    const errors = {
      email: "error",
      username: "error"
    };
    expect(reducer(defaultState, actions.updateSignupErrors(errors))).toEqual({
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

describe('validateSignupInput', () => {

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
    const test = actions.validateSignupInput(invalidEmail);
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
    const test = actions.validateSignupInput(noUsername);
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
    const test = actions.validateSignupInput(noPassword);
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
    const test = actions.validateSignupInput(shortPassword);
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
    const test = actions.validateSignupInput(passwordMismatch);
    expect(test).toEqual({
      errors: { passwordConfirmation: 'Passwords must match' },
      isValid: false
    });
  });

});