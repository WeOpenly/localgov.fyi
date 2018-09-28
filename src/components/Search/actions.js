import queryString from 'query-string';
import _ from 'lodash';
import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
import { GetApi } from './api';

const sampleData = {
  "success": true,
  "details": {
    "org": {
      "name": "County of San Mateo",
      "id": "98bb2db7-5227-47ed-b2f4-520304d57fe5",
      "logo_url": null,
      "contact_details": [
        {
          "contact_type": "ADDRESS",
          "contact_value": " 400 County Ctr Redwood City, California 94063"
        },
        {
          "contact_type": "PHONE",
          "contact_value": "(650) 363-4000"
        },
        {
          "contact_type": "FACEBOOK",
          "contact_value": "https://www.facebook.com/CountyofSanMateo"
        },
        {
          "contact_type": "TWITTER",
          "contact_value": "https://twitter.com/sanmateoco"
        }
      ]
    },
    "services": [
      {
        "service_del_links": [
          {
            "link_name": "APPLY NOW",
            "url": "https://secure.petdata.com/petlicense/muni/sma/"
          }
        ],
        "service_description": "<p>Using this service, residents in San Mateo County can apply for a pet license online. <br>\n<br>\nAll dogs must be vaccinated against rabies and licensed by the age of 4 months or within 60 days of acquiring the animal.</p>\n<p>All cats residing in the cities of Belmont, Brisbane, Hillsborough, Millbrae, Redwood City and San Mateo City and all unincorporated areas of the county must be vaccinated against rabies and licensed by the age of 4 months or within 60 days of acquiring the animal. Cats residing in East Palo Alto and Half Moon Bay must have a current vaccine. Cats in all other areas of the County are not required to be licensed at this time, however, it is a highly recommended form of identification for both dogs and cats.</p>",
        "service_location": [],
        "service_price": null,
        "service_name": "Apply for a Pet License",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [
          {
            "answer": "<ol>\n  <li>A current rabies vaccination certificate is required if the rabies vaccination on file has expired. Please check your certificate to make sure that your address is correct and your pet’s description is correct and complete. A primary breed should always be included, even if the animal is a mixed breed.</li>\n  <li>Proof of spay/neuter, such as a signed statement from a veterinarian or an invoice for services, is required if the pet has been altered since the last licensing period and you are applying for the lower spayed/neutered license fee.</li>\n  <li>Proof of age, such as a copy of any document listing the owner’s name and date of birth. Please feel free to mark out any sensitive information, such as ID numbers, on the copy before submission.</li>\n</ol>",
            "question": "What are the required documents for applying for the license?"
          }
        ],
        "contact_details": [
          {
            "contact_type": "PHONE",
            "contact_value": "(866) 925-5906"
          },
          {
            "contact_type": "EMAIL",
            "contact_value": "info@petdata.com"
          },
          {
            "contact_type": "FACEBOOK",
            "contact_value": "https://www.facebook.com/SMCHealth/"
          },
          {
            "contact_type": "TWITTER",
            "contact_value": "https://twitter.com/SMCHealth"
          }
        ],
        "service_steps": [],
        "id": "483f4140-f84b-483e-b533-daccb6aa3116"
      },
      {
        "service_del_links": [
          {
            "link_name": "APPLY ONLINE",
            "url": "https://www.vitalchek.com/"
          }
        ],
        "service_description": "Marriage certificates are used for many reasons such as a  spouse being added onto health benefits.  You can purchase a certified copy of your marriage certificate in person at the County Clerk-Recorder’s office.",
        "service_location": [],
        "service_price": null,
        "service_name": "Apply for a Marriage Certificate",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [
          {
            "contact_type": "PHONE",
            "contact_value": "650.363.4500"
          },
          {
            "contact_type": "EMAIL",
            "contact_value": "assessor@smcare.org"
          }
        ],
        "service_steps": [],
        "id": "3287f2a1-bb25-4fef-92cc-1873fd6cb05e"
      },
      {
        "service_del_links": [
          {
            "link_name": "APPLY ONLINE",
            "url": "https://www.cdph.ca.gov/Programs/CHSI/Pages/Vital-Records.aspx"
          }
        ],
        "service_description": "Birth certificates are used for many official governmental purposes such as Social Security, passport applications and school enrollments. They are sometimes used for non-official registrations such as little league. You can purchase a certified copy of a birth certificate in person only.",
        "service_location": [
          {
            "address": "55 E 3RD AVE, SAN MATEO 94401",
            "description": "this is a location",
            "id": "Location1"
          },
          {
            "address": "555 County Center, Redwood City, CA 94063",
            "description": "",
            "id": "San Mateo County Assessor-County Clerk-Recorder’s Office "
          }
        ],
        "service_price": null,
        "service_name": "Apply for a Birth Certificate",
        "service_timing": [
          {
            "break": "",
            "day": "Monday",
            "open": "9:00 - 17:00"
          },
          {
            "break": "13:00-14:00",
            "day": "Tuesday-Friday",
            "open": "09:00-16:00"
          },
          {
            "break": "",
            "day": "Monday-Friday",
            "open": "08:00-17:00"
          }
        ],
        "service_forms": [],
        "service_faq": [
          {
            "answer": "like this. ",
            "question": "how? "
          },
          {
            "answer": "You should get it the same day (except for pre-1966 requests).",
            "question": "How long does it take to get them if i am there in person? "
          },
          {
            "answer": "5-10 days",
            "question": "How long does it take to get them if i applied online?"
          },
          {
            "answer": "Sure, here is the link: https://www.cdph.ca.gov/Programs/CHSI/Pages/Vital-Records.aspx",
            "question": "Can we apply for them online?"
          }
        ],
        "contact_details": [
          {
            "contact_type": "PHONE",
            "contact_value": "(650) 363-4500"
          },
          {
            "contact_type": "ADDRESS",
            "contact_value": "555 County Center, First Floor, Redwood City, CA 94063"
          }
        ],
        "service_steps": [],
        "id": "69877255-494c-46a8-81de-c1ae44676a7d"
      },
      {
        "service_del_links": [
          {
            "link_name": "PAY NOW",
            "url": "https://odyportal-ext.sanmateocourt.org/Portal-External/Home/Dashboard/17"
          }
        ],
        "service_description": "<p>Pay for your Traffic citations/tickets that are issued by the County Court of San Mateo.&nbsp;</p>",
        "service_location": [],
        "service_price": null,
        "service_name": "Pay for Traffic Citation",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [],
        "service_steps": [],
        "id": "5f81f5da-5f48-4224-8c10-53f6d3d3c450"
      },
      {
        "service_del_links": [
          {
            "link_name": "SCHEDULE NOW",
            "url": "https://apps.smcacre.org/marsched/schedule.aspx"
          }
        ],
        "service_description": "<p>Using this service, you can reserve an available slot for your Civil Wedding Ceremony.&nbsp;</p>",
        "service_location": [],
        "service_price": null,
        "service_name": "Schedule Civil Wedding Ceremony",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [],
        "service_steps": [],
        "id": "573cfa95-ad88-48f2-ab14-dcd0fada9a7a"
      },
      {
        "service_del_links": [
          {
            "link_name": "PAY NOW",
            "url": "http://sanmateocountytaxcollector.org/"
          }
        ],
        "service_description": "<p>View your current San Mateo county property tax statements (secured &amp; unsecured) and pay them online. If paying after the listed due date, additional amounts will be owed and billed.</p>",
        "service_location": [],
        "service_price": null,
        "service_name": "Pay Property Taxes",
        "service_timing": [],
        "service_forms": [],
        "service_faq": [],
        "contact_details": [
          {
            "contact_type": "PHONE",
            "contact_value": "(650) 363-4142"
          },
          {
            "contact_type": "EMAIL",
            "contact_value": "taxmaster@co.sanmateo.ca.us"
          }
        ],
        "service_steps": [],
        "id": "056c967f-d4b5-4417-a6e8-3ab02202fc4a"
      }
    ],
    "state_org": {
      "org": {
        "name": "State of California",
        "id": "01d06777-1cf4-4fcc-a6cf-aadefbe7512d",
        "logo_url": "https://s3-us-west-2.amazonaws.com/dsp-static-us/organization_logo_uploads/400px-Seal_of_California.svg.png",
        "contact_details": [
          {
            "contact_type": "TWITTER",
            "contact_value": "https://twitter.com/cagovernment"
          },
          {
            "contact_type": "PHONE",
            "contact_value": "800-807-6755"
          }
        ]
      },
      "services": [
        {
          "service_del_links": [
            {
              "link_name": "APPLY ONLINE",
              "url": "https://www.getcalfresh.org/"
            }
          ],
          "service_description": "<p>Using this service, you can apply for FoodStamps in the State of California. CalFresh is a program for low-income families and individuals that meet certain income guidelines. CalFresh benefits help supplement your food budget and allow families and individuals to buy nutritious food. CalFresh is also known as the federal Supplemental Nutrition Assistance Program (SNAP).&nbsp;</p>\n<p>CalFresh benefits are accessed by using an Electronic Benefit Transfer (EBT) card. An EBT card is used the same way you would use a debit or ATM card. Eligibility and the amount of CalFresh benefits issued depend on your household size, income and certain living expenses.</p>",
          "service_location": [],
          "service_price": null,
          "service_name": "Apply for Foodstamps",
          "service_timing": [],
          "service_forms": [],
          "service_faq": [],
          "contact_details": [
            {
              "contact_type": "FACEBOOK",
              "contact_value": "https://www.facebook.com/California-Department-of-Social-Services-368167049950004/"
            },
            {
              "contact_type": "TWITTER",
              "contact_value": "https://twitter.com/CaliforniaDSS"
            }
          ],
          "service_steps": [],
          "id": "d7052b49-3c72-4369-9af5-c56dc259b055"
        },
        {
          "service_del_links": [
            {
              "link_name": "RENEW NOW",
              "url": "https://www.dmv.ca.gov/portal/dmv/detail/online/vrir/vr_top2"
            }
          ],
          "service_description": "<p>Using this online service, you can renew your vehicle registration process online. To renew your registration online, you must:</p>\n<ul>\n  <li>Have your license plate number and the last 5 digits of your Vehicle Identification Number (VIN) for a vehicle or the Hull Identification Number (HIN) for a vessel/boat.</li>\n  <li>Have your smog certification filed with DMV, if needed.</li>\n  <li>Have a renewal notice that shows your current address OR confirmed through the Change of Address system that your address has been updated.</li>\n</ul>",
          "service_location": [],
          "service_price": null,
          "service_name": "Vehicle Registration Renewal",
          "service_timing": [],
          "service_forms": [],
          "service_faq": [],
          "contact_details": [
            {
              "contact_type": "FACEBOOK",
              "contact_value": "https://www.facebook.com/CADMV"
            },
            {
              "contact_type": "TWITTER",
              "contact_value": "https://twitter.com/ca_dmv"
            }
          ],
          "service_steps": [],
          "id": "1df3a37a-bce7-42ca-9e69-d04b707fed8c"
        },
        {
          "service_del_links": [
            {
              "link_name": "Driver License Renewal",
              "url": "https://www.dmv.ca.gov/portal/dmv/detail/online/dlrbi/dl_top2"
            }
          ],
          "service_description": "<p>Using this online service, you can apply to renew your driver license online. You will need to create an account with the DMV site to be able to access this service. <br>\n<br>\nPlease note that you may not renew online if you wish to update or change your Name, Address or Gender.&nbsp;</p>",
          "service_location": [],
          "service_price": null,
          "service_name": "Driver License Renewal",
          "service_timing": [],
          "service_forms": [],
          "service_faq": [],
          "contact_details": [
            {
              "contact_type": "FACEBOOK",
              "contact_value": "https://www.facebook.com/CADMV"
            },
            {
              "contact_type": "TWITTER",
              "contact_value": "https://twitter.com/ca_dmv"
            },
            {
              "contact_type": "PHONE",
              "contact_value": "1-800-777-0133"
            }
          ],
          "service_steps": [],
          "id": "9e1c294c-195f-40ce-adaf-ceb49a648508"
        },
        {
          "service_del_links": [
            {
              "link_name": "REGISTER NOW",
              "url": "https://registertovote.ca.gov/"
            }
          ],
          "service_description": "<p>Using this online service, you can register to vote in the state of California.</p>\n<p>The deadline to register or re-register to vote for any election is <strong>11:59:59 p.m. Pacific Time on the 15th calendar day before that election</strong>.</p>",
          "service_location": [],
          "service_price": null,
          "service_name": "Register to Vote",
          "service_timing": [],
          "service_forms": [],
          "service_faq": [
            {
              "answer": "<p>To register online, you will need:</p>\n<ul>\n  <li>Your California driver license or California identification card number,</li>\n  <li>The last four digits of your social security number and</li>\n  <li>Your date of birth.</li>\n</ul>\n<p>Your information will be provided to the California Department of Motor Vehicles (DMV) to retrieve a copy of your DMV signature.</p>\n<p>If you do not have a California driver license or California identification card, you can still use this form to apply to register to vote by completing the online interview by 11:59:59 p.m. Pacific Time on the 15th calendar day before an election.</p>",
              "question": "What do i need to register online?"
            },
            {
              "answer": "<p>To register to vote in California, you must be:</p>\n<ul>\n  <li>A United States citizen and a resident of California</li>\n  <li>18 years old or older on Election Day</li>\n  <li>Not currently in state or federal prison or on parole for the conviction of a felony</li>\n  <li>Not prohibited from voting by a court because of mental incompetency&nbsp;</li>\n</ul>",
              "question": "Who can register to vote?"
            }
          ],
          "contact_details": [
            {
              "contact_type": "FACEBOOK",
              "contact_value": "https://www.facebook.com/CaliforniaSOS/"
            },
            {
              "contact_type": "TWITTER",
              "contact_value": "https://twitter.com/sosnews/"
            },
            {
              "contact_type": "PHONE",
              "contact_value": "916-653-6814"
            },
            {
              "contact_type": "ADDRESS",
              "contact_value": "1500 11th St, Sacramento, CA 95814"
            }
          ],
          "service_steps": [],
          "id": "3c35fb58-1538-43ea-b657-e954f6dbd877"
        },
        {
          "service_del_links": [
            {
              "link_name": "PAY NOW",
              "url": "https://www.ftb.ca.gov/"
            }
          ],
          "service_description": "<p>Using this online service from the California State Franchise Tax Board, individuals and businesses can pay for their state income taxes online.&nbsp;</p>",
          "service_location": [],
          "service_price": null,
          "service_name": "Pay State Income Taxes",
          "service_timing": [],
          "service_forms": [],
          "service_faq": [],
          "contact_details": [
            {
              "contact_type": "FACEBOOK",
              "contact_value": "https://www.facebook.com/franchisetaxboard/"
            },
            {
              "contact_type": "TWITTER",
              "contact_value": "https://twitter.com/calftb"
            }
          ],
          "service_steps": [],
          "id": "a60f379f-ddb1-4fd8-858c-a4c6c151e847"
        }
      ]
    }
  }
};

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

export const getLocation = async (dispatch, getState) => {
  let responseBody;
  dispatch(locationRequest());
  try {
    const data = await GetApi(null, `auto_locate`);
    const results = await data;
    dispatch(locationSuccess(results));
  } catch (error) {
    dispatch(locationFailure(error));
  }
};

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

export const fetchSearchResults = async(dispatch, getState) => {
  const { input } = getState().search;
  dispatch(requestSearchResults());

  try {
    const data = await GetApi(null, `semantic_results?country=usa&query=${input}&requester_city=''`);
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
};

export const fetchMeta = async(dispatch, getState) => {
  dispatch(requestAppMeta());

  try {
    const data = await GetApi(null, 'meta');
    const appMeta = await data;
    dispatch(recvAppMeta(appMeta));

    if (!appMeta.success) {
      dispatch(recvMetaFailed())
    }
  } catch (e) {
    dispatch(recvMetaFailed());
  }
};

export const fetchSearchSuggestions = async(dispatch, getState) => {
  const { input } = getState().search;

  dispatch(reqSearchSuggestions());
  const country = 'usa'
  try {
    const data = await GetApi(null, `get_results?country=${country}&query=${input}&requester_city=''`);
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

export const fetchAreaSearchSuggestions = async(dispatch, getState) => {
  const {input} = getState().search;

  dispatch(reqSearchSuggestions());
  const country = 'usa'
  try {
    const data = await GetApi(null, `area_suggestions?country=${country}&query=${input}`);
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

export const fetchServiceSearchSuggestions = async(dispatch, getState) => {
  const { serviceInput, selectedOrganization } = getState().search;
  const country = 'usa';
  let searchResults;

  dispatch(reqServiceSuggestions());
  try {
    searchResults = await GetApi(null, `get_results?country=${country}&query=${serviceInput}&in_org=${selectedOrganization.id}`);

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

export const fetchAllFromOrganization = async(dispatch, getState) => {
  const organization = '49ab4440-1176-4791-a7cf-1e27a756488d';
  const country = 'usa';
  let services;

  dispatch(allFromOrganizationRequest());
  try {
    services = await GetApi(null, `get_results?country=${country}&in_org=${organization}&list_all=true`);

    if (services.success) {
      dispatch(allFromOrganizationSuccess(services));
    } else {
      dispatch(allFromOrganizationFailure());
    }
  } catch (error) {
    dispatch(allFromOrganizationFailure());
  }
}
