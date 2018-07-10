import { UAParser } from "ua-parser-js";

let Fingerprint2 = null;


// track user events
// event types - seen , clicked
// seen type [pageview]
// clicked type [suggestion, card(page item), external]

const windowGlobal = typeof window !== 'undefined' && window
const fpOptions = {
    excludeWebGL: true,
    excludeAudioFP: true,
    excludeJsFonts: true,
    excludeFlashFonts: true,
    excludePlugins: true,
    excludeWebGLVendorAndRenderer: true,
}

if (windowGlobal){
    try {
        Fingerprint2 = require('fingerprintjs2');
    } catch (e) {
        console.log(e)
    }
}

function getUrlParameter(name) {
    name = name
        .replace(/[\[]/, '\\[')
        .replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null
        ? ''
        : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


// page_view [layout type]
export const trackView = (page_layout_type, viewing_entity_type, viewing_entity_id, viewing_entity_name, ...extra)  => async (dispatch, getState) => {
if (!Fingerprint2){
    return
}
new Fingerprint2(fpOptions)
    .get(function (result, components) {
        try {
            const source = getUrlParameter('src');
            const {pathname} = windowGlobal.location;
            let ua = {}

            try{
                ua = UAParser(components[0].value);
            } catch (e) {
                console.log(e)
            }
          

            const eventParams = {
                e: 'page_view',
                path : pathname,
                t: page_layout_type,
                psrc: source,
                v_e_t: viewing_entity_type,
                v_e_id: viewing_entity_id,
                v_e_n: viewing_entity_name,
                fp: result,
                ua: ua,
                ...extra,
            }

            const payloadParams = Object
                .keys(eventParams)
                .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(eventParams[k])}`)
                .join('&');

            fetch(`https://d3qlx9ss0mi45s.cloudfront.net/localgov.fyi/track.png?${payloadParams}`, {}).then((data) => { }).catch((err) => { });
        } catch (e) {
            console.log(e);
        }
    });
};

// input_type ['search']
export const trackInput = (input_type, text) => async(dispatch, getState) => {
    if (!Fingerprint2) {
        return
    }
new Fingerprint2(fpOptions)
    .get(function (result, components) {
        try {
            const source = getUrlParameter('src');
            const { pathname } = windowGlobal.location;
            let ua = {}

            try {
                ua = UAParser(components[0].value);
            } catch (e) {
                console.log(e)
            }

            const eventParams = {
                e: 'input',
                t: input_type,
                s: text,
                path : pathname,
                psrc: source,
                fp: result,
                ua, 
            }

            const payloadParams = Object
                .keys(eventParams)
                .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(eventParams[k])}`)
                .join('&');

            fetch(`https://d3qlx9ss0mi45s.cloudfront.net/localgov.fyi/track.png?${payloadParams}`, {}).then((data) => { }).catch((err) => { });
        } catch (e) {
            console.log(e);
        }
    });
};

// clicked type [suggestion, card(page item), external]
export const trackClick = (click_type, clicked_entity_type, clicked_entity_id, clicked_entity_name, pos_in_list=0) => async(dispatch, getState) => {
    if (!Fingerprint2) {
        return
    }
new Fingerprint2(fpOptions)
    .get(function (result, components) {
        try {

            const source = getUrlParameter('src');
            const { pathname } = windowGlobal.location;
            let ua = {}

            try {
                ua = UAParser(components[0].value);
            } catch (e) {
                console.log(e)
            }

            const eventParams = {
                e: 'click',
                t: click_type,
                path: pathname,
                psrc: source,
                pos_in_list: pos_in_list,
                c_e_t: clicked_entity_type,
                c_e_id: clicked_entity_id,
                c_e_n: clicked_entity_name,
                fp: result,
                ua,
            }


            const payloadParams = Object
                .keys(eventParams)
                .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(eventParams[k])}`)
                .join('&');

            fetch(`https://d3qlx9ss0mi45s.cloudfront.net/localgov.fyi/track.png?${payloadParams}`, {}).then((data) => { }).catch((err) => { });
        } catch (e) {
            console.log(e);
        }
    });
};