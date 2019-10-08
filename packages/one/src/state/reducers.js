import { combineReducers } from 'redux'

import {dashboard} from '../components/Dashboard/reducer';

import { oneUser } from "../components/User/reducer";

import { oneUserServices } from '../components/Services/reducer';

import { oneUserReceipts } from '../components/Dashboard/receiptReducer';

import { oneServices } from "../components/Landing/allSerReducer";

import { oneUserPayment } from '../components/Payment/reducer'

export default combineReducers({
  oneServices, //from landing
  oneUser, // for onboarding and user details
  oneUserReceipts, // for user receipts
  oneUserServices, //for user services
  oneUserPayment,
  dashboard // for dashboard ui
});
