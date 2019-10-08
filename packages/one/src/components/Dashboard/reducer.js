import * as types from "./ActionTypes";

const initialState = {
  openSideBar: false
};

export function dashboard(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        openSideBar: action.toggle
      };
    default:
      return state;
  }
}
