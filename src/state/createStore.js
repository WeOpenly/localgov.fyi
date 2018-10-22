import { createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form';

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

const composedReducer = combineReducers({
    rootReducer,
    form: formReducer
})

const reduxCreateStore = () => createStore(
    composedReducer,
    initialState,
    composedEnhancers
)

export default reduxCreateStore