import { combineReducers } from 'redux'

import { quickPay } from '../components/reducer'

import {quickPayStatus} from '../components/Status/reducer';

export default combineReducers({
  quickPay,
  quickPayStatus
});
