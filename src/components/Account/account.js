import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
import {GetApi} from './api';
import {trackInput} from './tracking';

export function toggleSearchResultLayout() {
    return {type: types.TOGGLE_SEARCH_RESULTS_LAYOUT};
}

function requestAppMeta() {
    return {type: types.REQUEST_APP_META};
}

export function toggleRegister(){

}

export function toggleLogin(){

}
