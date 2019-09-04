import { combineReducers } from 'redux'

import { quickPay } from '../components/QuickPay/reducer'
import {delivery} from '../components/Delivery/reducer';
import {userRequests} from '../components/UserRequests/reducer';
import {serTemplate} from '../components/ServiceTemplatePage/reducer';
import {indexPage} from '../components/IndexPage/reducer';
import {searchPage} from '../components/SearchPage/reducer';
import { nearbyOrgs} from '../components/Nearby/reducer';
import { oneUser } from '../components/One/userReducer';
import { oneServices } from '../components/One/serviceReducer';
import { oneReceipts } from '../components/One/receiptReducer';

import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    form: formReducer,
    oneReceipts,
    oneUser,
    oneServices,
    quickPay,
    delivery,
    userRequests,
    serTemplate,
    indexPage,
    searchPage,
    nearbyOrgs
})
