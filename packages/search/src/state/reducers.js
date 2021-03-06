import { combineReducers } from 'redux'


import {delivery} from '../components/Delivery/reducer';
import {userRequests} from '../components/UserRequests/reducer';
import {serTemplate} from '../components/ServiceTemplatePage/reducer';
import {indexPage} from '../components/IndexPage/reducer';
import {searchPage} from '../components/SearchPage/reducer';
import { nearbyOrgs} from '../components/Nearby/reducer';
import {serPack} from '../components/SerPack/reducer';
import { dynamicSearch } from "../components/SearchHeader/reducer";

import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  form: formReducer,
  delivery,
  userRequests,
  serTemplate,
  indexPage,
  searchPage,
  nearbyOrgs,
  serPack,
  dynamicSearch
});
