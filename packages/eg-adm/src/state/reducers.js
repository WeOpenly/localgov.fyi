import { combineReducers } from 'redux'


import { oneUser } from '../components/login/userReducer';
import {admOneUserReducer} from '../components/One/admOneUserReducer'

export default combineReducers({
  oneUser,
  admOneUserReducer
});
