import axios from 'axios';

export const START_FETCH_USERS = 'START_FETCH_USERS';
export const SUCCEED_FETCH_USERS = 'SUCCEED_FETCH_USERS';
export const FAIL_FETCH_USERS = 'FAIL_FETCH_USERS';

export const startFetchUsers = () => ({
  type: START_FETCH_USERS
});

export const succeedFetchUsers = (data) => ({
  type: SUCCEED_FETCH_USERS,
  users: data.results,
  total: data.count
});

export const failFetchUsers = () => ({
  type: FAIL_FETCH_USERS
});

export const retrieveUsers = (page, options) => {
  const perPage = options.perPage;
  const offset = (page-1) * perPage;

  let params = {
    limit: perPage,
    offset: offset
  };

  if (options.ordering !== "default") {
    params = {
      ...params,
      ordering: options.ordering
    }
  }

  if (options.filterAdmin !== "default") {
    params = {
      ...params,
      is_staff: options.filterAdmin
    }
  }

  return dispatch => {
    dispatch(startFetchUsers());
    axios.get('/api/users/', {
      params: params
    })
    .then(res => {
      dispatch(succeedFetchUsers(res.data));
    })
    .catch(err => {
      dispatch(failFetchUsers());
    });
  }
}

export const deleteUser = (id, curPage, options) => {
  return dispatch => {
    axios.delete('/api/users/delete/' + id + '/')
    .then(res => {
      dispatch(retrieveUsers(curPage, options));
    });
  }
}