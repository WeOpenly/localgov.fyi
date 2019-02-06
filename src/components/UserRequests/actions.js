import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
const windowGlobal = typeof window !== 'undefined' && window

//  flow dialog actions
export function toggleLocationRequestDialog(toggle) {
    return {type: types.TOGGLE_LOC_REQUEST_DIALOG, toggle}
}


