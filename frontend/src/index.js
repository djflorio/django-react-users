import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

import jwt from 'jsonwebtoken';
import { setAuthorizationToken } from './partials/auth/AuthActions';
import { setCurrentUser } from './partials/auth/AuthActions';

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware = [ ...middleware, createLogger() ]
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
