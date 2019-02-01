import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
import {YusufApi} from '../common/api';
import {trackInput} from '../common/tracking';
import queryString from 'querystring';

const windowGlobal = typeof window !== 'undefined' && window

export function toggleSearchResultLayout() {
  return { type: types.TOGGLE_SEARCH_RESULTS_LAYOUT };
}

function requestAppMeta() {
  return { type: types.REQUEST_APP_META };
}

export function setMetaFromUrl(country, city = null) {
  const data = {
    userCountry: country,
    userCity: city
  };

  return { type: types.RECV_APP_META, data };
}

function recvAppMeta(data) {
  return { type: types.RECV_APP_META, data };
}

function recvMetaFailed() {
  return { type: types.RECV_APP_META_FAILED };
}

function locationRequest() {
  return { type: types.LOCATION_REQUEST };
}

function locationSuccess(data) {
  return { type: types.LOCATION_SUCCESS, data };
}

function locationFailure(error) {
  return { type: types.LOCATION_FAILURE, error };
}

export function updateInput(input) {
  return { type: types.UPDATE_INPUT, input };
}

export function updateServiceInput(input) {
  return { type: types.UPDATE_SERVICE_INPUT, input };
}

function reqSearchSuggestions() {
  return { type: types.REQUEST_SEARCH_SUGGESTIONS };
}

function recvSuggestionsFailed() {
  return { type: types.RECV_SEARCH_SUGGESTIONS_FAILED };
}

export function setSearchSuggesitions(suggestions) {
  return { type: types.RECV_SEARCH_SUGGESTIONS_SUCCESS, suggestions: suggestions.results };
}

function reqServiceSuggestions() {
  return { type: types.REQUEST_SERVICE_SUGGESTIONS };
}

function recvServiceSuggestionsFailed() {
  return { type: types.RECV_SERVICE_SUGGESTIONS_FAILED };
}

export function setServiceSuggestions(suggestions) {
  return {
    type: types.RECV_SERVICE_SUGGESTIONS_SUCCESS,
    suggestions: suggestions.results[0]
      ? suggestions.results[0].suggestions
      : suggestions.results
  };
}

function requestSearchResults() {
  return { type: types.REQUEST_SEARCH_RESULTS };
}

function recvSearchResults(res) {
  return { type: types.RECV_SEARCH_RESULTS_SUCCESS, res };
}

function recvSemanticResults(results) {
  return { type: types.RECV_SEMANTIC_SEARCH_RESULTS, results };
}

function recvSearchResultsFailure() {
  return { type: types.RECV_SEARCH_RESULTS_FAILED };
}

export function clearInput() {
  return { type: types.UPDATE_INPUT, input: '' };
}

export function clearServiceInput() {
  return { type: types.UPDATE_SERVICE_INPUT, input: '' };
}

export function selectOrganization(organization) {
  return { type: types.SELECT_ORGANIZATION, organization };
}

export function toggleNotifyDialog(toggle){
  return {type: types.TOGGLE_NOTIFY_DIALOG, toggle}
}

export function toggleFeedbackDialog(toggle) {
  return { type: types.TOGGLE_FEEDBACK_DIALOG, toggle }
}

export function slowToggleNotifyDilog(){
  return async (dispatch, getState) => {
    if (windowGlobal){
      windowGlobal.setTimeout(function () {
        const { showFeedbackDialog } = getState().search;

        if (showFeedbackDialog) {
          return
        } else {
          dispatch(toggleNotifyDialog(true))
        }
      }, 8000);
    }
  }
}

export function fetchSearchResults(locationSearch) {
  return async (dispatch, getState) => {
    const { input } = getState().search;

    let org_id = null; 
    if (locationSearch) {
      const values = queryString.parse(locationSearch);
      if (values && values.org_id) {
        org_id = values.org_id;
      }
    }

    dispatch(requestSearchResults());

    try {
      let url = `semantic_results?country=usa&query=${input}&requester_city=''`;
      if(org_id){
        url = `semantic_results?country=usa&query=${input}&org_id=${org_id}`;
      }

      const data = await YusufApi(null, url);
      const results = await data;

      let isSemantic = false;
      let resLen = 0;

      if (results && "semantic_available" in results && results["semantic_available"] === true) {
        isSemantic = true;
        dispatch(recvSemanticResults(results));
      } else {
        const { list_results } = results;
        const res = {
          'results': list_results
        };
        resLen = list_results.length;
        dispatch(recvSearchResults(res));
      }
    } catch (e) {

      dispatch(recvSearchResultsFailure());
    }
  }
};

  export const fetchMeta = async(dispatch) => {
    dispatch(requestAppMeta());

    try {
  const data = await YusufApi(null, 'meta');
      const appMeta = await data;
      dispatch(recvAppMeta(appMeta));

      if (!appMeta.success) {
        dispatch(recvMetaFailed())
      }
    } catch (e) {
      dispatch(recvMetaFailed());
  }
};

export const fetchSearchSuggestions = async (dispatch, getState) => {
  const { input } = getState().search;

  dispatch(reqSearchSuggestions());
  const country = 'usa'
  try {
const data = await YusufApi(null, `get_results?country=${country}&query=${input}&requester_city=''`);
    const searchResults = await data;

    if (searchResults.success) {
      dispatch(setSearchSuggesitions(searchResults));
    } else {
      dispatch(recvSuggestionsFailed());
    }
  } catch (e) {
    dispatch(recvSuggestionsFailed());
  }
};

export const fetchAreaSearchSuggestions = async (dispatch, getState) => {
  const {input} = getState().search;

  dispatch(reqSearchSuggestions());
  const country = 'usa'
  try {
const data = await YusufApi(null, `area_suggestions?country=${country}&query=${input}`);
    const searchResults = await data;

    if (searchResults.success) {
      dispatch(setSearchSuggesitions(searchResults));
    } else {
      dispatch(recvSuggestionsFailed());
    }
  } catch (e) {
    dispatch(recvSuggestionsFailed());
  }
};

export const fetchServiceSearchSuggestions = async (dispatch, getState) => {
  const { serviceInput, selectedOrganization } = getState().search;
  const country = 'usa';
  let searchResults;

  dispatch(reqServiceSuggestions());
  try {
searchResults = await YusufApi(null, `get_results?country=${country}&query=${serviceInput}&in_org=${selectedOrganization.id}`);

    if (searchResults.success) {
      dispatch(setServiceSuggestions(searchResults));
    } else {
      dispatch(recvServiceSuggestionsFailed());
    }
  } catch (error) {
    dispatch(recvServiceSuggestionsFailed());
  }
}

function allFromOrganizationRequest() {
  return { type: types.ALL_FROM_ORG_REQUEST };
}

function allFromOrganizationSuccess(services) {
  return { type: types.ALL_FROM_ORG_SUCCESS, services };
}

function allFromOrganizationFailure() {
  return { type: types.ALL_FROM_ORG_FAILURE };
}

export const getLocation = async(dispatch) => {
  dispatch(locationRequest());
  let t0 = null;
  let t1 = null;

  try {
    if(windowGlobal && windowGlobal.performance){
      t0 = Math.round(performance.now());
    }
    const data = await YusufApi(null, `auto_locate`);
    const results = await data;

    const {details} = results;

    if (details) {
      dispatch(trackInput('auto_locate', details.org.name));
      dispatch(locationSuccess(results));
    }
    if (windowGlobal && windowGlobal.performance && windowGlobal.ga) {
      t1 = Math.round(performance.now());
      windowGlobal.ga('send', 'timing', 'Auto Locate Api', 'response', t1 - t0);
    }
  } catch (error) {
    dispatch(locationFailure(error));
const placeHolder = {
  "success": true,
  "details": {
    "org": {
      "name": "City of Portland",
      "id": "ce958881-a04f-4421-a8db-8078d1907f46",
      "logo_url": null,
      "contact_details": [
        {
          "contact_type": "PHONE",
          "contact_value": "503-823-4000"
        }, {
          "contact_type": "ADDRESS",
          "contact_value": "1221 SW 4th Avenue, Portland 97204"
        }, {
          "contact_type": "EMAIL",
          "contact_value": "cityinfo@portlandoregon.gov"
        }
      ]
    },
    "services": [
      {
        "service_del_links": [
          {
            "link_name": "PAY NOW",
            "url": "https://www.portlandoregon.gov/revenue/artstax/index.cfm?action=PaymentInfo"
          }
        ],
        "service_description": "<p>The Arts Education and Access Income Tax (Arts Tax) funds Portland school tea" +
            "chers and art focused non -profit organizations in Portland.<br>\n<br>\nUsing th" +
            "is service, you can file your Arts Tax return online and pay your tax due with V" +
            "isa, MasterCard, Discover Card, ACH Payment (electronic check).&nbsp;</p>",
        "service_location": [],
        "service_price": null,
        "service_name": "Pay Annual Arts Tax",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [
          {
            "contact_type": "TWITTER",
            "contact_value": "https://twitter.com/PDXArtsTax"
          }, {
            "contact_type": "PHONE",
            "contact_value": "503-865-4278"
          }
        ],
        "service_steps": [],
        "id": "efe24816-64fe-4402-a821-ae7da9c16b9c"
      }, {
        "service_del_links": [
          {
            "link_name": "PAY NOW",
            "url": "https://ojdcourtsepay.tylerhost.net/"
          }
        ],
        "service_description": "",
        "service_location": [],
        "service_price": null,
        "service_name": "Pay for Parking Citation",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [],
        "service_steps": [],
        "id": "e6980c3d-8e5b-4abd-a75d-798df14cd347"
      }, {
        "service_del_links": [
          {
            "link_name": "APPLY NOW",
            "url": "https://www.portlandoregon.gov/bds/internet_permitting.cfm"
          }
        ],
        "service_description": "<p>Using the link here, you can apply for electrical, mechanical, or plumbing pe" +
            "rmits that do not require plan review.&nbsp;</p>",
        "service_location": [],
        "service_price": null,
        "service_name": "Apply for Building Permit",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [
          {
            "contact_type": "EMAIL",
            "contact_value": "bds@portlandoregon.gov"
          }, {
            "contact_type": "PHONE",
            "contact_value": "503-823-7300"
          }
        ],
        "service_steps": [],
        "id": "05cd046a-c7ed-4029-b085-bcd7508a885d"
      }, {
        "service_del_links": [
          {
            "link_name": "REGISTER NOW",
            "url": "https://www.portlandoregon.gov/apps/mcbit/index.cfm?login=1"
          }
        ],
        "service_description": "",
        "service_location": [],
        "service_price": null,
        "service_name": "Register a New Business",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [
          {
            "contact_type": "TWITTER",
            "contact_value": "https://twitter.com/PDXBizTaxHelp"
          }
        ],
        "service_steps": [],
        "id": "8e83cc75-2dff-45fc-a4a2-b2f5da2db83b"
      }, {
        "service_del_links": [
          {
            "link_name": "PAY NOW",
            "url": "https://www.portlandoregon.gov/apps/mcbit/"
          }
        ],
        "service_description": "",
        "service_location": [],
        "service_price": null,
        "service_name": "Pay Business Tax",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [
          {
            "contact_type": "TWITTER",
            "contact_value": "http://twitter.com/@PDXBizTaxHelp"
          }, {
            "contact_type": "PHONE",
            "contact_value": "503-823-5157"
          }
        ],
        "service_steps": [],
        "id": "4688b27f-0892-4b45-be7a-62791aebd978"
      }, {
        "service_del_links": [
          {
            "link_name": "SUBMIT NOW",
            "url": "https://portlandor.mycusthelp.com/WEBAPP/_rs/(S(1emqqwdti1ipkjs3qn0bbwzh))/Suppo" +
              "rtHome.aspx?lp=2"
          }
        ],
        "service_description": "",
        "service_location": [],
        "service_price": null,
        "service_name": "Submit a Public Records Request",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [],
        "service_steps": [],
        "id": "2f9334fa-247b-4a46-bdc2-6fd556d9539b"
      }, {
        "service_del_links": [
          {
            "link_name": "PAY NOW",
            "url": "https://css.portlandoregon.gov:8443/css/public/login/form?_ga=2.154924593.821788" +
              "877.1528219606-726018546.1527653563"
          }
        ],
        "service_description": "",
        "service_location": [],
        "service_price": null,
        "service_name": "Pay Water/Stormwater/Sewer Bill",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [
          {
            "contact_type": "PHONE",
            "contact_value": "503-823-7770"
          }, {
            "contact_type": "EMAIL",
            "contact_value": "PWBCustomerService@portlandoregon.gov"
          }
        ],
        "service_steps": [],
        "id": "50defe8e-a241-4f30-965d-e7145b124962"
      }, {
        "service_del_links": [
          {
            "link_name": "FILE NOW",
            "url": "https://secure.coplogic.com/dors/en/filing/selectincidenttype?dynparam=152822115" +
              "0262"
          }
        ],
        "service_description": "",
        "service_location": [],
        "service_price": null,
        "service_name": "File a Police Report",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [
          {
            "contact_type": "PHONE",
            "contact_value": "503-823-3333"
          }
        ],
        "service_steps": [],
        "id": "02ad36d9-e982-4dbc-85d0-8752f9e827b6"
      }
    ],
    "state_org": {
      "org": {
        "name": "State of Oregon",
        "id": "07681f4c-771a-4b1c-bd0b-eea36de8241a",
        "logo_url": "https://s3-us-west-2.amazonaws.com/dsp-static-us/organization_logo_uploads/336px" +
            "-Seal_of_Oregon.svg.png"
      },
      "services": [
        {
          "service_del_links": [
            {
              "link_name": "CHECK NOW",
              "url": "https://secure.sos.state.or.us/orestar/vr/showVoterSearch.do"
            }
          ],
          "service_description": "<p>&nbsp;Check&nbsp;your Oregon state voter&nbsp;registration&nbsp;status using " +
              "this online service.&nbsp;</p>",
          "service_location": [],
          "service_price": null,
          "logo_url": "https://s3-us-west-2.amazonaws.com/dsp-static-us/service_logo_uploads/baseline_h" +
              "ow_to_reg_black_48dp.png",
          "service_name": "Check Voter Registration",
          "service_timing": [],
          "service_forms": [],
          "service_faq": [],
          "contact_details": [],
          "service_steps": [],
          "id": "44162f26-760b-4cb3-9c57-719c01212d9b"
        }, {
          "service_del_links": [
            {
              "link_name": "RENEW NOW",
              "url": "https://dmv.odot.state.or.us/cf/vrr/index.cfm"
            }
          ],
          "service_description": "<p>Renew your Oregon State vehicle registration online using this service. <br>" +
              "\n<br>\nYou will need the following items to renew your vehicle registration onl" +
              "ine:</p>\n<ul>\n  <li>Vehicle Registration Renewal form;</li>\n  <li>Insurance c" +
              "ompany name and policy number; and</li>\n  <li>Debit or credit card for payment." +
              "</li>\n</ul>",
          "service_location": [],
          "service_price": null,
          "logo_url": "https://s3-us-west-2.amazonaws.com/dsp-static-us/service_logo_uploads/baseline_d" +
              "rive_eta_black_48dp.png",
          "service_name": "Renew Vehicle Registration",
          "service_timing": [],
          "service_forms": [],
          "service_faq": [],
          "contact_details": [],
          "service_steps": [],
          "id": "8c524fc7-9e7f-4311-b622-5c03ab1ac9fd"
        }, {
          "service_del_links": [
            {
              "link_name": "APPLY NOW",
              "url": "https://secure.emp.state.or.us/ocs/"
            }
          ],
          "service_description": "<p>Using the Oregon State Employment department's online claim system, you can a" +
              "pply for various unemployment benefits. &nbsp;</p>",
          "service_location": [],
          "service_price": null,
          "logo_url": "https://s3-us-west-2.amazonaws.com/dsp-static-us/service_logo_uploads/baseline_w" +
              "ork_off_black_48dp.png",
          "service_name": "Apply for Unemployment benefits",
          "service_timing": [],
          "service_forms": [],
          "service_faq": [],
          "contact_details": [
            {
              "contact_type": "FACEBOOK",
              "contact_value": "https://www.facebook.com/OregonEmploymentDepartment/"
            }, {
              "contact_type": "TWITTER",
              "contact_value": "http://twitter.com/ORemployment"
            }
          ],
          "service_steps": [],
          "id": "7b15f868-9c8c-4e37-b9e9-c1baf37eb538"
        }, {
          "service_del_links": [
            {
              "link_name": "REGISTER NOW",
              "url": "https://secure.sos.state.or.us/orestar/vr/register.do"
            }
          ],
          "service_description": "<p>Using this online service, you can register to vote in Oregon. To register on" +
              "line, you will need an Oregon driver's license, permit or ID card number issued " +
              "by the Oregon Driver and Motor Vehicle Services Division (DMV).</p>\n<p>Please n" +
              "ote that a new registrant must submit their online registration by 11:59:59 p.m." +
              " Pacific Time on the 21st calendar day before an election to be eligible to vote" +
              " in that election.​</p>",
          "service_location": [],
          "service_price": null,
          "logo_url": "https://s3-us-west-2.amazonaws.com/dsp-static-us/service_logo_uploads/baseline_h" +
              "ow_to_vote_black_48dp.png",
          "service_name": "Register to Vote",
          "service_timing": [],
          "service_forms": [],
          "service_faq": [
            {
              "answer": "<p>To register to vote in Oregon, you must be:</p>\n<ul>\n  <li>A U.S. citizen</" +
                "li>\n  <li>A resident of Oregon</li>\n  <li>At least 16 years old</li>\n  <li>If" +
                " you are not yet 18 years of age, you will not receive a ballot until an electio" +
                "n occurs on or after your 18th birthday.​​</li>\n</ul>",
              "question": "Who can register to vote in Oregon?"
            }
          ],
          "contact_details": [
            {
              "contact_type": "EMAIL",
              "contact_value": "elections.sos@oregon.gov"
            }, {
              "contact_type": "PHONE",
              "contact_value": "1-866-673-8683"
            }, {
              "contact_type": "FACEBOOK",
              "contact_value": "https://www.facebook.com/OregonSecState/"
            }, {
              "contact_type": "TWITTER",
              "contact_value": "https://twitter.com/oregonelections"
            }
          ],
          "service_steps": [],
          "id": "da4917c9-a8f9-4031-8f6e-346b62edd10f"
        }
      ]
    }
  }
}
    dispatch(locationSuccess(placeHolder));
  }
};

export const fetchAllFromOrganization = async (dispatch, getState) => {
  const organization = '49ab4440-1176-4791-a7cf-1e27a756488d';
  const country = 'usa';
  let services;

  dispatch(allFromOrganizationRequest());
  try {
    services = await YusufApi(null, `get_results?country=${country}&in_org=${organization}&list_all=true`);

    if (services.success) {
      dispatch(allFromOrganizationSuccess(services));
    } else {
      dispatch(allFromOrganizationFailure());
    }
  } catch (error) {
    dispatch(allFromOrganizationFailure());
  }
}
