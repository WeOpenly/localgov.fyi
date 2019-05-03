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


export const shouldUpdateScroll = ({routerProps: {
    location
  }, getSavedScrollPosition}) => {

  return getSavedScrollPosition(location)
}

export const onInitialClientRender = () =>{
 if (typeof window !== `undefined`) {
   window.allCallBacks = function() {
     window.initIndex && window.initIndex();
     window.initHeader && window.initHeader();
     window.initTemplate && window.initTemplate();
   };
   
 }
}

export const onRouteUpdate = (state, page, pages) => {

  if (typeof window !== `undefined`) {
    window.scrollTo(0, 0)
  }
    
  if (!isLoggedIn){
    auth.logout();
  }
  
}
