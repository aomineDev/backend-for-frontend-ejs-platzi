import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import reducer from '../reducers';
import initialState from '../initialState';

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));
const history = createBrowserHistory();

const ProviderMock = ({ children }) => (
  <Provider store={store}>
    <Router history={history}>
      {children}
    </Router>
  </Provider>
);

export default ProviderMock;

