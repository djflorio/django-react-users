import * as actions from './LoginFormActions';

export const defaultState = {
  errors: {},
  loading: false
}

const loginForm = (state=defaultState, action) => {
  switch(action.type) {
    case actions.START_LOGIN: {
      return {
        ...state,
        loading: true
      }
    }
    case actions.SUCCEED_LOGIN:
    case actions.FAIL_LOGIN: {
      return {
        ...state,
        loading: false
      }
    }
    case actions.UPDATE_LOGIN_ERRORS: {
      return {
        ...state,
        errors: action.errors
      }
    }
    default: return state;
  }
}

export default loginForm;