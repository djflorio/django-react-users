import * as actions from './AuthActions';
import reducer, { defaultState } from './AuthReducer';

describe('Auth', () => {

  const testUser = {
    username: "testuser",
    email: "test@test.com"
  }

  it('should create an action to set current user', () => {
    expect(actions.setCurrentUser(testUser)).toEqual({
      type: actions.SET_CURRENT_USER,
      user: testUser
    });
  });

  it('should set current user', () => {
    expect(reducer(undefined, actions.setCurrentUser(testUser))).toEqual({
      ...defaultState,
      isAuthenticated: true,
      user: testUser
    });
  });

  it('should return state with unexpected action', () => {
    expect(reducer(undefined, { type: "unexpected" })).toEqual(
      defaultState
    );
  })

});