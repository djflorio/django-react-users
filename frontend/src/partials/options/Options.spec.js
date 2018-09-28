import * as actions from './OptionsActions';
import reducer, { defaultState } from './OptionsReducer';


describe('Options', () => {

  it('should create action to set limit per page', () => {
    expect(actions.setPerPage(50)).toEqual({
      type: actions.SET_PER_PAGE,
      perPage: 50
    });
  });

  it('should set limit per page with setPerPage', () => {
    expect(reducer(undefined, actions.setPerPage(50))).toEqual({
      ...defaultState,
      perPage: 50
    });
  });

  it('should return default state with unexpected action', () => {
    expect(reducer(undefined, { type: "unexpected" })).toEqual(
      defaultState
    );
  });

  it('should create action to set ordering', () => {
    expect(actions.setOrdering("username")).toEqual({
      type: actions.SET_ORDERING,
      ordering: "username"
    });
  });

  it('should set ordering with setOrdering', () => {
    expect(reducer(undefined, actions.setOrdering("username"))).toEqual({
      ...defaultState,
      ordering: "username"
    });
  });

  it('should create action to set admin filter', () => {
    expect(actions.setFilterAdmin(true)).toEqual({
      type: actions.SET_FILTER_ADMIN,
      value: true
    });
  });

  it('should set admin filter with setAdminFilter', () => {
    expect(reducer(undefined, actions.setFilterAdmin(true))).toEqual({
      ...defaultState,
      filterAdmin: true
    });
  });

});