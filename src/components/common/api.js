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
    return response.json()
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
let BACKEND = `${process.env.SEARCH_BACKEND}`

export function GetApi(lang = undefined, endPoint, headers = {}) {

    // if (lang){
    //     BACKEND = `${BACKEND}/${lang}`;
    // }

    let headersForGet = {
        credentials: 'include',
        'Access-Control-Allow-Origin': '*',
    }

    if (headers) {
        headersForGet = {
            ...headersForGet,
            ...headers
        }
    }

    return fetch(`${BACKEND}/${endPoint}`, headers).then(checkStatus)
        .then(parseJSON)
        .then((data) => data)
}
