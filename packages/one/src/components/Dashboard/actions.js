import { navigate } from "@reach/router";
import { log } from "util";

import * as types from "./ActionTypes";


export function toggleSidebar(toggle) {
  return {
    type: types.TOGGLE_SIDEBAR,
    toggle
  };
}

