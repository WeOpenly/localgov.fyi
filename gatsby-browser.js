import React from 'react'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'

import reduxCreateStore from './src/state/createStore';

exports.replaceRouterComponent = ({ history }) => {
  const store = reduxCreateStore();

  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  )

  return ConnectedRouterWrapper
}