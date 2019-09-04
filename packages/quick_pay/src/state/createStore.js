import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const initialState = {}
const enhancers = [];
let middleware = [thunk, logger];

if (process.env.NODE_ENV !== 'development') {
    middleware = [thunk];
}
// if (process.env.NODE_ENV === 'development') {

//     const devToolsExtension = window.devToolsExtension;
//     middleware = [thunk, logger];
//     if (typeof devToolsExtension === 'function') {
//         enhancers.push(devToolsExtension())
//     }
// }

const composedEnhancers = compose(
    ...enhancers,
    applyMiddleware(...middleware),
)

const reduxCreateStore = () => createStore(
    rootReducer,
    initialState,
    composedEnhancers
)

export default reduxCreateStore