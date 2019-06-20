/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/
import {UAParser} from "ua-parser-js";

let Fingerprint2 = null;

// track user events event types - seen , clicked seen type [pageview] clicked
// type [suggestion, card(page item), external]

const windowGlobal = typeof window !== 'undefined' && window
const fpOptions = {
    excludeWebGL: true,
    excludeAudioFP: true,
    excludeJsFonts: true,
    excludeFlashFonts: true,
    excludePlugins: true,
    excludeWebGLVendorAndRenderer: true
}

if (windowGlobal) {
    try {
        Fingerprint2 = require('fingerprintjs2');
    } catch (e) {
        console.log(e)
    }
}

// function getUrlParameter(name) {
//     name = name
//         .replace(/[\[]/, '\\[')
//         .replace(/[\]]/, '\\]');
//     var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//     var results = regex.exec(location.search);
//     return results === null
//         ? ''
//         : decodeURIComponent(results[1].replace(/\+/g, ' '));
// };

// eg ['no_results_found', {search_method: 'search page'}]
// ['no_results_found', {search_method: 'glossary page'}]
export const trackEvent = (event_type, event_props) => async(dispatch, getState) => {
    if (!Fingerprint2) {
        return
    }
    Fingerprint2.getPromise(fpOptions).then(function (result, components) {
            try {

                if (windowGlobal && windowGlobal.mixpanel) {
                    windowGlobal
                        .mixpanel
                        .identify(result);
                    windowGlobal.mixpanel.people.set({"$distinct_id": result });
                    windowGlobal
                        .mixpanel
                        .track(`event_${event_type}`, event_props);
                }

            } catch (e) {}
        });
};

export const trackView = (page_layout_type, viewing_entity_type, viewing_entity_id, viewing_entity_name, ...extra) => async(dispatch, getState) => {
    if (!Fingerprint2) {
        return
    }
    Fingerprint2.getPromise(fpOptions).then(function (result, components) {
            try {
       
                const eventParams = {
                    v_e_t: viewing_entity_type,
                    v_e_id: viewing_entity_id,
                    v_e_n: viewing_entity_name,
                    ...extra
                }

    

                if (windowGlobal && windowGlobal.mixpanel) {
                    windowGlobal
                        .mixpanel
                        .identify(result);
                    windowGlobal.mixpanel.people.set({"$distinct_id": result });
                    windowGlobal
                        .mixpanel
                        .track(`page_view_${page_layout_type}`, eventParams);
                }

            } catch (e) {}
        });
};

// input_type ['search'], ['auto_locate]
export const trackInput = (input_type, text, extra) => async(dispatch, getState) => {
    if (!Fingerprint2) {
        return
    }
    Fingerprint2.getPromise(fpOptions).then(function (result, components) {
            try {

                const eventParams = {
                    s: text,
                    ...extra,
                }


                if (windowGlobal && windowGlobal.mixpanel) {
                    windowGlobal.mixpanel.identify(result);
                    windowGlobal.mixpanel.people.set({"$distinct_id": result });
                    windowGlobal.mixpanel.track(`input_${input_type}`, eventParams);
                }
          
            } catch (e) {
             
            }
        });
};

// clicked type [suggestion, card(page item), external]
export const trackClick = (click_type, clicked_entity_type, clicked_entity_id, clicked_entity_name, pos_in_list = 0, extra) => async(dispatch, getState) => {
    if (!Fingerprint2) {
        return
    }
    Fingerprint2.getPromise(fpOptions).then(function (result, components) {
            try {
            
                const eventParams = {
                    pos_in_list: pos_in_list,
                    c_e_t: clicked_entity_type,
                    c_e_id: clicked_entity_id,
                    c_e_n: clicked_entity_name,
                    ...extra,
                }

    

                if (windowGlobal && windowGlobal.mixpanel) {
                    windowGlobal.mixpanel.identify(result);
                    windowGlobal.mixpanel.people.set({"$distinct_id": result });
                    windowGlobal.mixpanel.track(`click_${click_type}`, eventParams);
                }

            
            } catch (e) {
            
            }
        });
};
