import { combineReducers } from 'redux'


import { oneUser } from '../components/login/userReducer';
import { admOneUserReducer } from '../components/One/admOneUserReducer'
import { admOneUserSerReducer } from "../components/One/admOneUserSerReducer";

export default combineReducers({
  oneUser,
  admOneUserReducer,
  admOneUserSerReducer
});
