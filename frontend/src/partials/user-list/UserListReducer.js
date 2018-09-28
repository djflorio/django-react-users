import * as actions from './UserListActions';

export const defaultState = {
  users: [],
  fetching: false
};

const userList = (state=defaultState, action) => {
  switch(action.type) {
    case actions.START_FETCH_USERS: {
      return {
        ...state,
        fetching: true
      }
    }
    case actions.SUCCEED_FETCH_USERS: {
      return {
        ...state,
        users: action.users,
        total: action.total,
        fetching: false
      }
    }
    case actions.FAIL_FETCH_USERS: {
      return {
        ...state,
        fetching: false
      }
    }
    default: return state;
  }
}

export default userList;