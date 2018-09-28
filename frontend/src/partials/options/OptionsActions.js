export const SET_PER_PAGE = 'SET_PER_PAGE';
export const SET_ORDERING = 'SET_ORDERING';
export const SET_FILTER_ADMIN = 'SET_FILTER_ADMIN';

export const setPerPage = (perPage) => ({
  type: SET_PER_PAGE,
  perPage
});

export const setOrdering = (ordering) => ({
  type: SET_ORDERING,
  ordering
});

export const setFilterAdmin = (value) => ({
  type: SET_FILTER_ADMIN,
  value
});