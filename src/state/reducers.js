import { combineReducers } from 'redux'
import {search} from '../components/Search/reducer';
import {account} from '../components/Account/reducer';
import {profile} from '../components/Profile/reducer';
import {delivery} from '../components/Delivery/reducer';
import {userRequests} from '../components/UserRequests/reducer';

import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    form: formReducer,
    search,
    account,
    profile,
    delivery,
    userRequests
})
