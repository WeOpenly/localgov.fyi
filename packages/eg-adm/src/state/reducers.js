import { combineReducers } from 'redux'


import { oneUser } from '../components/login/userReducer';
import { admOneUserReducer } from '../components/One/admOneUserReducer'
import { admOneUserSerReducer } from "../components/One/admOneUserSerReducer";
import { admOneSerReducer } from "../components/One/admOneSerReducer";
import { admOneSerDetailReducer } from "../components/One/admOneSerDetailReducer";
import { admOnePackReducer } from "../components/One/admOnePackReducer";
import { admOnePackDetailReducer } from "../components/One/admOnePackDetailReducer";
import { admOneUserSerTxnReducer } from "../components/One/admOneUserSerTxnReducer";

export default combineReducers({
  oneUser,
  admOneUserReducer,
  admOneUserSerReducer,
  admOneSerReducer,
  admOneSerDetailReducer,
  admOnePackReducer,
  admOnePackDetailReducer,
  admOneUserSerTxnReducer
});
