import * as types from "./ActionTypes";

const initialState = {
    loadingUserSavedItems: false,
    savedOrgs: [],
    savedServices: [],
    failedLoadingUserSavedItems: false,
    saveRequest: false,
    saveSuccess: false,
    saveFailure: false,
    saveSuccessMsg: '',
    orgsFullDetails :[],
    sersFullDetails : [],
};


export function profile(state = initialState, action) {
    switch (action.type) {
        case types.REQUEST_USER_SAVED_ITEMS:
            return {
                ...state,
                loadingUserSavedItems: true
            }
        case types.RECV_USER_SAVED_ITEMS:
            return {
                ...state,
                loadingUserSavedItems: false,
                savedOrgs: action.savedOrgs,
                savedServices: action.savedServices,
                orgsFullDetails: action.orgsFullDetails,
                sersFullDetails: action.sersFullDetails,
            }
        case types.FAILED_RECV_USER_SAVED_ITEMS:
            return {
                ...state,
                loadingUserSavedItems: false,
                failedLoadingUserSavedItems: true,
            }
        case types.REQUEST_USER_SAVE_ITEM:
            return {
                ...state,
                saveRequest: true
            }
        case types.SUCCESS_USER_SAVE_ITEM:
            return {
                ...state,
                saveRequest: false,
                saveSuccess: true,
            };
        case types.FAILED_USER_SAVE_ITEM:
            return {
                ...state,
                saveRequest: false,
                saveFailure: true,
            };
        case types.ADD_LOCAL_SAVED_ORG:
            return {
                ...state,
                savedOrgs: state.savedOrgs.concat(action.organization)
            }
        case types.REMOVE_LOCAL_SAVED_ORG:
            const savedOrgs = state.savedOrgs;
            const filteredOrgs = savedOrgs.filter((org) => (org === action.organization))
            return {
                ...state,
                savedOrgs: filteredOrgs
            }
        case types.ADD_LOCAL_SAVED_SERVICE:
            return {
                ...state,
                savedServices: state.savedServices.concat(action.service)
            }
        case types.REMOVE_LOCAL_SAVED_SERVICE:
            const savedServices = state.savedServices;
            const filteredSers = savedServices.filter((ser) => (ser === action.service ))
            return {
                ...state,
                savedServices: filteredSers
            }
        default:
            return state;
    }
}
