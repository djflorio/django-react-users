import * as actions from './AuthActions';
import isEmpty from 'lodash/isEmpty';

export const defaultState = {
  isAuthenticated: false,
  user: {}
}

export default (state=defaultState, action) => {
  switch(action.type) {
    case actions.SET_CURRENT_USER: {
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }
    }
    default: return state;
  }
}