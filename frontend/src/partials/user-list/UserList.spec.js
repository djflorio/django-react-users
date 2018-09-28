import * as actions from './UserListActions';
import reducer, { defaultState } from './UserListReducer';


describe('UserList', () => {

  it('should create action to start fetch users', () => {
    expect(actions.startFetchUsers()).toEqual({
      type: actions.START_FETCH_USERS
    });
  });

  it('should create action to succeed fetch users', () => {
    const data = {
      results: "users",
      count: 10
    };
    expect(actions.succeedFetchUsers(data)).toEqual({
      type: actions.SUCCEED_FETCH_USERS,
      users: "users",
      total: 10
    });
  });

  it('should create action to fail fetch users', () => {
    expect(actions.failFetchUsers()).toEqual({
      type: actions.FAIL_FETCH_USERS
    });
  });

  it('should set fetching to true with startFetchUsers', () => {
    expect(reducer(defaultState, actions.startFetchUsers())).toEqual({
      ...defaultState,
      fetching: true
    });
  });

  it('should set fetching to false with succeedFetchUsers', () => {
    const fetchingState = {
      ...defaultState,
      fetching: true
    };
    const data = {
      results: "users",
      count: 10
    };
    expect(reducer(fetchingState, actions.succeedFetchUsers(data))).toEqual({
      ...fetchingState,
      users: "users",
      total: 10,
      fetching: false
    });
  });

  it('should set fetching to false with failFetchUsers', () => {
    const fetchingState = {
      ...defaultState,
      fetching: true
    };
    expect(reducer(fetchingState, actions.failFetchUsers())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

});