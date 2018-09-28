import * as actions from './AddUserFormActions';

export const defaultState = {
  errors: {},
  loading: false
}

const addUserForm = (state=defaultState, action) => {
  switch(action.type) {
    case actions.START_ADD_USER: {
      return {
        ...state,
        loading: true
      }
    }
    case actions.SUCCEED_ADD_USER:
    case actions.FAIL_ADD_USER: {
      return {
        ...state,
        loading: false
      }
    }
    case actions.UPDATE_ADD_USER_ERRORS: {
      return {
        ...state,
        errors: action.errors
      }
    }
    default: return state;
  }
}

export default addUserForm;