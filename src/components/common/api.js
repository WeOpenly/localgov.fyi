import fetch from 'isomorphic-fetch'

const windowGlobal = typeof window !== 'undefined' && window
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
    if (response.status === 200 || response.status === 201 || response.status === 302)
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

export function YusufApi(lang = undefined, endPoint, headers = {}) {

    // if (lang){
    //     BACKEND = `${BACKEND}/${lang}`;
    // }

    let headersForGet = {
        credentials: 'include',
        'Access-Control-Allow-Origin': true,
        redirect: 'follow'
    }

    if (headers) {
        headersForGet = {
            ...headersForGet,
            ...headers
        }
    }

    return fetch(`${YUSUF_BACKEND}/${endPoint}`, headers).then(checkStatus)
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


const FETCH_TIMEOUT = 4000;
let didTimeOut = false;

export const fetchLocWithTO  = () => {
new Promise(function (resolve, reject) {
    const timeout = setTimeout(function () {
        didTimeOut = true;
        reject(new Error('Request timed out'));
    }, FETCH_TIMEOUT);

    fetch(`${YUSUF_BACKEND}/auto_locate`).then(function (response) {
        // Clear the timeout as cleanup
        clearTimeout(timeout);
        if (!didTimeOut) {
            console.log('fetch good! ', response);
            resolve(response);
            }
        })
        .catch(function (err) {
            console.log('fetch failed! ', err);

            // Rejection already happened with setTimeout
            if (didTimeOut) 
                return;
            
            // Reject with error
            reject(err);
        });
})
    .then(function () {
        // Request success and no timeout
        console.log('good promise, no timeout! ');
    })
    .catch(function (err) {
        // Error: response error, request timeout or runtime error
        console.log('promise error! ', err);
    });

}

