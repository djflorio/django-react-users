import * as actions from './SignupFormActions';

export const defaultState = {
  errors: {},
  loading: false
}

const signupForm = (state=defaultState, action) => {
  switch(action.type) {
    case actions.START_SIGNUP: {
      return {
        ...state,
        loading: true
      }
    }
    case actions.SUCCEED_SIGNUP:
    case actions.FAIL_SIGNUP: {
      return {
        ...state,
        loading: false
      }
    }
    case actions.UPDATE_SIGNUP_ERRORS: {
      return {
        ...state,
        errors: action.errors
      }
    }
    default: return state;
  }
}

export default signupForm;