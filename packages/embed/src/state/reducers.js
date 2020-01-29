import { combineReducers } from "redux";

import { SerLocations } from "../components/SerLocations/reducer";
import { dynamicSearch } from "../components/Search/reducer";

export default combineReducers({
  SerLocations,
  dynamicSearch
});
