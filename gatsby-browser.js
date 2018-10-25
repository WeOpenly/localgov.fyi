import 'babel-polyfill';

import React from 'react'
import {Provider} from 'react-redux'
import Auth, {isLoggedIn} from './src/components/Account/Auth';

import reduxCreateStore from './src/state/createStore';

const auth = new Auth();

export const wrapRootElement = ({ element }) => {
  const store = reduxCreateStore();

  const ConnectedRouterWrapper = (
    <Provider store={store}>
      {element}
    </Provider>
  )

  return ConnectedRouterWrapper
}


export const onRouteUpdate = (state, page, pages) => {
  if (!isLoggedIn){
    auth.logout();
  }
}
