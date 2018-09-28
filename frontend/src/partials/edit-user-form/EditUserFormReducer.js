import * as actions from './EditUserFormActions';

export const defaultState = {
  errors: {},
  user: {},
  loading: false,
  fetching: false
}

const editUserForm = (state=defaultState, action) => {
  switch(action.type) {
    case actions.START_EDIT_USER: {
      return {
        ...state,
        loading: true
      }
    }
    case actions.SUCCEED_EDIT_USER:
    case actions.FAIL_EDIT_USER: {
      return {
        ...state,
        loading: false
      }
    }
    case actions.START_FETCH_USER: {
      return {
        ...state,
        fetching: true
      }
    }
    case actions.SUCCEED_FETCH_USER: {
      return {
        ...state,
        user: action.user,
        fetching: false
      }
    }
    case actions.FAIL_FETCH_USER: {
      return {
        ...state,
        fetching: false
      }
    }
    case actions.UPDATE_EDIT_USER_ERRORS: {
      return {
        ...state,
        errors: action.errors
      }
    }
    default: return state;
  }
}

export default editUserForm;