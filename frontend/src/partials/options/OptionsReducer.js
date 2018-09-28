import * as actions from './OptionsActions';

export const defaultState = {
  perPage: 5,
  ordering: "default",
  filterAdmin: "default"
}

const options = (state=defaultState, action) => {
  switch(action.type) {
    case actions.SET_PER_PAGE: {
      return {
        ...state,
        perPage: action.perPage
      }
    }
    case actions.SET_ORDERING: {
      return {
        ...state,
        ordering: action.ordering
      }
    }
    case actions.SET_FILTER_ADMIN: {
      return {
        ...state,
        filterAdmin: action.value
      }
    }
    default: return state;
  }
}

export default options;