import { combineReducers } from 'redux'


import { oneUser } from '../components/userReducer';
import { oneServices } from '../components/Services/serviceReducer';
import { oneReceipts } from '../components/Dashboard/receiptReducer';

export default combineReducers({
    oneReceipts,
    oneUser,
    oneServices,
})
