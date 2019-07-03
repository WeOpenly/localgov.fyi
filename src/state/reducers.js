import { combineReducers } from 'redux'

import { quickPay} from '../pages/quick_pay/reducer'
import {delivery} from '../components/Delivery/reducer';
import {userRequests} from '../components/UserRequests/reducer';
import {serTemplate} from '../components/ServiceTemplatePage/reducer';
import {indexPage} from '../components/IndexPage/reducer';
import {searchPage} from '../components/SearchPage/reducer';
import { nearbyOrgs} from '../components/Nearby/reducer'
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    form: formReducer,
    quickPay,
    delivery,
    userRequests,
    serTemplate,
    indexPage,
    searchPage,
    nearbyOrgs
})
