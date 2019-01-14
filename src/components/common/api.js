import fetch from 'isomorphic-fetch'


export function checkStatus(response) {

    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
    if (response.status === 200 || response.status === 201) 
        return response.json()
    return response
}

export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


// const BACKEND = 'http://127.0.0.1:8090/dashboard/api';
// console.log(BACKEND);
const YUSUF_BACKEND = `${process.env.SEARCH_BACKEND}`
let controller;
let signal;
export function YusufApi(lang = undefined, endPoint, headers = {}) {

    // if (lang){
    //     BACKEND = `${BACKEND}/${lang}`;
    // }
    if ("AbortController" in window) {
        controller = new AbortController;
        signal = controller.signal;
    }

    if (controller !== undefined) {
        // Cancel the previous request
        setTimeout(() => controller.abort(), 3000);
    }

    let headersForGet = {
        credentials: 'include',
        'Access-Control-Allow-Origin': true,
    }

    if (headers) {
        headersForGet = {
            ...headersForGet,
            ...headers
        }
    }

    return fetch(`${YUSUF_BACKEND}/${endPoint}`, {signal},
    headers).then(checkStatus)
            .then(parseJSON)
            .then((data) => data)
}




export function authHeader() {
    const token = localStorage.getItem('access_token');
    return token
        ? {
            'Authorization': `Bearer ${token}`
        }
        : {};
}


const DSP_BACKEND = `${process.env.DSP_BACKEND}`
// const DSP_BACKEND = 'https://dsp.localgov.fyi'

export function DspApi(endPoint, method = "GET", headers = null, data = null) {

    let callParams = {
        credentials: "include",
        method: method,
        headers: authHeader()
    };

    callParams = {
        ...callParams,
        headers: {
            ...callParams.headers,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }

    if (method !== "GET") {
        callParams = {
            ...callParams,
            headers: {
                ...callParams.headers,
                "Origin": "*",
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        };

        if (headers) {
            callParams = {
                ...callParams,
                headers: {
                    ...callParams.headers,
                    ...headers,
                    "Origin": "*",
                    "X-CSRFToken": getCookie("csrftoken"),
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            };
        }

        if (data) {
            callParams = {
                ...callParams,
                body: JSON.stringify(data)
            };
        }
    }

    if (headers) {
        callParams = {
            ...callParams,
            ...headers
        };

        if (method !== "GET") {
            callParams = {
                ...callParams,
                headers: {
                    ...callParams.headers,
                    ...headers,
                    "X-CSRFToken": getCookie("csrftoken"),
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            };
        }
    }

    console.log(callParams);

    return fetch(`${DSP_BACKEND}${endPoint}`, callParams)
        .then(checkStatus)
        .then(parseJSON)
        .then(resp => resp);
}

