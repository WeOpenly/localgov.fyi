import 'regenerator-runtime/runtime';
import queryString from 'query-string'
import * as types from './ActionTypes';

import {DspApi} from '../common/api';


function requestUserSavedItems(){
    return {
        type : types.REQUEST_USER_SAVED_ITEMS
    }
}

function recvUserSavedItems(items){
    const orgs = items.filter((item) => (item.service === null && item.organization !== null));
    const orgsFullDetails = orgs.map((org) => {
        return ({
            id: org.organization.id,
            'heading': `${org.organization.classification} - ${org.organization.area.name}`,
            'subheading': '',
        })
    });
    const orgIds = orgs.map((org) => org.organization.id);
    const sers = items.filter((item) => (item.organization === null && item.service !== null));
    const sersFullDetails = sers.map((ser) => {
        return ({
            id: ser.service.id,
            'heading': `${ser.service.name}`,
            'subheading':  `${ser.service.offered_in.classification} - ${ser.service.offered_in.area.name}`,
        })
    });
    const serIds = sers.map((ser) => ser.service.id);

    return {
        type: types.RECV_USER_SAVED_ITEMS,
        savedOrgs: orgIds,
        savedServices: serIds,
        orgsFullDetails: orgsFullDetails,
        sersFullDetails : sersFullDetails,
    }
}

function failedRecvUserSavedItems(){
    return {
        type: types.FAILED_RECV_USER_SAVED_ITEMS,
    }
}

export function getUserSavedItems(){
    return async(dispatch, getState) => {
        dispatch(requestUserSavedItems());
        
        try {
            const data = await DspApi(`/dashboard/api/user/saved_items/`, "GET", null, null);
 
            const {results} = data;
            dispatch(recvUserSavedItems(results));

        } catch (e) {

            dispatch(failedRecvUserSavedItems());
        }
    }
};


function saveRequest(){
    return {
        type: types.REQUEST_USER_SAVE_ITEM
    }
}

function saveSuccess(){
    return {
        type: types.SUCCESS_USER_SAVE_ITEM
    }
}

function saveFailire(){
    return {
        type: types.FAILED_USER_SAVE_ITEM
    }
}

export function saveItem(organization=null, service=null){
    return async(dispatch, getState) => {
        dispatch(saveRequest());

        const allValues = { organization: organization, service: service };

        try {
            await DspApi(`/dashboard/api/user/saved_items/save`, "POST", null, allValues);
            dispatch(saveSuccess());
            dispatch(getUserSavedItems());
        } catch (e) {
            dispatch(saveFailire());
        }
    }
}

export function unSaveItem(organization=null, service=null){
    return async(dispatch, getState) => {
        dispatch(saveRequest());
        let param = {}
        if (organization){
            param['organization'] = organization
        }
        if (service){
            param['service'] = service
        }
        const params = queryString.stringify(param);

        try {
            await DspApi(`/dashboard/api/user/saved_items/delete/?${params}`, "DELETE", null, null);
            dispatch(saveSuccess());
            dispatch(getUserSavedItems());
        } catch (e) {
            dispatch(saveFailire());
        }
    }
}

export function addLocalItem(organization, service){
    if(organization){
         return {
            type: types.ADD_LOCAL_SAVED_ORG,
            organization,
        }
    }
    if (service){
         return {
            type: types.ADD_LOCAL_SAVED_SERVICE,
            service,
        }
    }
   
}

export function removeLocalItem(organization, service){
     if(organization){
         return {
            type: types.REMOVE_LOCAL_SAVED_ORG,
            organization,
        }
    }
    if (service){
         return {
            type: types.REMOVE_LOCAL_SAVED_SERVICE,
            service,
        }
    }
}


