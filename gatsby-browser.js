import 'babel-polyfill';

import React from 'react'
import {Provider} from 'react-redux'

import reduxCreateStore from './src/state/createStore';

export const wrapRootElement = ({ element }) => {
  const store = reduxCreateStore();

  const ConnectedRouterWrapper = (
    <Provider store={store}>
      {element}
    </Provider>
  )

  return ConnectedRouterWrapper
}

