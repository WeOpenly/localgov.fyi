import React from "react";
import * as types from "../ActionTypes";
import ProptaxSvg from "../../svgIcons/PropTaxIl";
import UtilBill from "../../svgIcons/utbIl";
import BusinessLic from "../../svgIcons/businessLic";
import PetLic from "../../illus/PetLic";
import Renew from "../../illus/Renew";
import CalFranchTax from '../../illus/CalFranchTax';
import DelFranchTax from "../../illus/DelFranchTax";

// atleast one service requirements should be filled

const initialState = {
  allAvailableServices: {
    individual: [
      {
        id: 0,
        name: "Property Taxes",
        icon: <ProptaxSvg style={{ width: "64px" }} />,
        shortDescription:
          "Property taxes fall into two categories, Secured and Unsecured. A Secured property tax is a tax for a physical property, most often real estate and land. An Unsecured property tax is for personal items, like an airplane, boat, or business. ",
        faqs: [
          {
            header: "What is this about?",
            description:
              "Property taxes fall into two categories, Secured and Unsecured. A Secured property tax is a tax for a physical property, most often real estate and land. An Unsecured property tax is for personal items, like an airplane, boat, or business. "
          },
          {
            header: "How often do I need to do this?",
            description:
              "Property taxes payments depend on the county or the school district the property is located in. It is usually paid in two parts every year."
          }
        ],
        initialFormData: {
          adddress: null,
          parcelId: null,
          billFile: []
        },
        formSchema: [
          {
            id: "address",
            name: "address",
            label: "Full Address",
            description: "Full Address",
            placeholder: "House number, street, city, state, zipcode",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "parcelId",
            name: "parcelId",
            label: "Parcel ID or Assessor ID",
            type: "string",
            description: "Parcel ID or Assessor ID",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "billFile",
            name: "billFile",
            label: "Upload latest (or any available) tax bill",
            description: "Upload latest (or any available) tax bill",
            type: "fileArray",
            validationType: "mixed",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          }
        ]
      },
      {
        id: 1,
        name: "Utility Bill",
        icon: <UtilBill style={{ width: "64px" }} />,
        shortDescription:
          "Depending on the location you are based in, some utilities like water, sewer, trash are taken care by your city or county.",
        faqs: [
          {
            header: "What is this about?",
            description:
              "Depending on the location you are based in, some utilities like water, sewer, trash are taken care by your city or county."
          },
          {
            header: "How often do I need to do this?",
            description:
              "Utility bills are generally due monthly or bi-monthly."
          }
        ],
        formSchema: [
          {
            id: "providerName",
            name: "providerName",
            label: "Name of the provider",
            validationType: "string",
            description: "Name of the provider",
            type: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "utilityType",
            name: "utilityType",
            label: "Type of Utility",
            enum: ["water", "electricity"],
            enum_titles: ["Water", "Electricity"],
            type: "select"
          },
          {
            id: "acctNumber",
            name: "acctNumber",
            label: "Customer Number/Account Number",
            description: "Customer Number/Account Number",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "billFile",
            name: "billFile",
            label: "Upload latest (or any available) tax bill",
            description: "Upload latest (or any available) tax bill",
            type: "fileArray",
            validationType: "mixed",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Pet Licence",
        icon: <PetLic style={{ width: "64px" }} />,
        shortDescription:
          "Law requires that all pets (usually dogs or cats) over the age of four months be licensed through the local animal care and control agency.",
        faqs: [
          {
            header: "What is this about?",
            description:
              "Law requires that all pets (usually dogs or cats) over the age of four months be licensed through the local animal care and control agency."
          },
          {
            header: "How often do I need to do this?",
            description:
              "Pet Licenses need to be renewed annually or bi-annually depending on the city/county laws."
          }
        ],
        formSchema: [
          {
            id: "licenceNumber",
            name: "licenceNumber",
            description: "Current Licence Number",
            label: "Customer Number/Account Number",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "billFile",
            name: "billFile",
            label: "Upload latest (or any available) tax bill",
            description: "Upload latest (or any available) tax bill",
            type: "fileArray",
            validationType: "mixed",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Renew Vehicle Registration",
        shortDescription:
          "All motor vehicles needs to have a valid registration through your local Department of Motor Vehicles to be actively used. ",
        faqs: [
          {
            header: "What is this about?",
            description:
              "All motor vehicles needs to have a valid registration through your local Department of Motor Vehicles to be actively used."
          },
          {
            header: "How often do I need to do this?",
            description:
              "Most vehicle registrations are valid only for an year and need to be renewed annually."
          }
        ],
        icon: <Renew style={{ width: "64px" }} />,
        formSchema: [
          {
            id: "plateNumber",
            name: "plateNumber",
            description: "Plate Number",
            label: "Plate Number",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "vin",
            name: "vehicleNumber",
            description: "Vehicle Identification Number (VIN)",
            label: "Vehicle Identification Number (VIN)",
            type: "string"
          },
          {
            id: "billFile",
            name: "billFile",
            label: "Upload latest (or any available) tax bill",
            description: "Upload latest (or any available) tax bill",
            type: "fileArray",
            validationType: "mixed",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          }
        ]
      }
    ],
    business: [
      {
        id: 0,
        name: "Renew Business Licence",
        icon: <BusinessLic style={{ width: "64px" }} />,
        shortDescription:
          "A business license permits a business to operate in a specific town, city, or state. Almost all business require to have them filed. ",
        faqs: [
          {
            header: "What is this about?",
            description:
              "A business license permits a business to operate in a specific town, city, or state. Almost all business require to have them filed."
          },
          {
            header: "How often do I need to do this?",
            description:
              "City Business licenses typically require annual renewal. "
          }
        ],
        formSchema: [
          {
            id: "busName",
            name: "busName",
            label: "Business Name",
            description: "Business Name",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "ownerFullName",
            name: "ownerFullName",
            label: "Owner Full Name",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "businessAddress",
            name: "businessAddress",
            label: "Business Address",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "busLN",
            name: "busLN",
            label: "Business License Number",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "PIN",
            name: "PIN",
            label: "PIN",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "licenceFile",
            name: "licenceFile",
            label: "Upload latest (or any available) license/renewal form",
            description:
              "Upload latest (or any available) license/renewal form",
            type: "fileArray",
            validationType: "mixed",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          }
        ]
      },
      {
        id: 1,
        name: "Renew Fictitious Business Licence or DBA",
        icon: <BusinessLic style={{ width: "64px" }} />,
        shortDescription:
          'A fictitious business name, sometimes referred as DBA, short for "doing business as," filing for a DBA allows you to conduct business under a name other than your own—your DBA is different from your name as the business owner, or your business\'s legal, registered name.',
        faqs: [
          {
            header: "What is this about?",
            description:
              'A fictitious business name, sometimes referred as DBA, short for "doing business as," filing for a DBA allows you to conduct business under a name other than your own—your DBA is different from your name as the business owner, or your business\'s legal, registered name.'
          },
          {
            header: "How often do I need to do this?",
            description:
              "DBA filing deadlines vary depending on the county you are operating your business in."
          }
        ],
        formSchema: [
          {
            id: "licenceFile",
            name: "licenceFile",
            label: "Upload latest (or any available) license/renewal form",
            description:
              "Upload latest (or any available) license/renewal form",
            type: "fileArray",
            validationType: "mixed",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Utility Bill",
        icon: <UtilBill style={{ width: "64px" }} />,
        shortDescription: "a Description",
        formSchema: [
          {
            id: "providerName",
            name: "providerName",
            label: "Name of the provider",
            validationType: "string",
            description: "Name of the provider",
            type: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "utilityType",
            name: "utilityType",
            label: "Type of Utility",
            enum: ["water", "electricity"],
            enum_titles: ["Water", "Electricity"],
            type: "string"
          },
          {
            id: "acctNumber",
            name: "acctNumber",
            label: "Customer Number/Account Number",
            description: "Customer Number/Account Number",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "billFile",
            name: "billFile",
            label: "Upload latest (or any available) tax bill",
            description: "Upload latest (or any available) tax bill",
            type: "fileArray",
            validationType: "mixed",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Delaware Franchise Tax Filing",
        icon: <DelFranchTax style={{width: '64px'}} />,
        shortDescription:
          "All active Domestic Corporation Annual Reports and Franchise Taxes for the prior year are due annually.",
        faqs: [
          {
            header: "What is this about?",
            description:
              "All active Domestic Corporation Annual Reports and Franchise Taxes for the prior year are due annually."
          },
          {
            header: "How often do I need to do this?",
            description:
              "Delaware Franchise Taxes for the prior year should be paid on or before March 1st every year."
          }
        ],
        formSchema: [
          {
            id: "licenceFile",
            name: "licenceFile",
            label: "Upload your Certificate of Incorporation",
            description: "Upload their Certificate of Incorporation",
            type: "fileArray",
            validationType: "mixed",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: "California Franchise Tax Filing",
        icon: <CalFranchTax style={{width: '64px'}} />,
        shortDescription:
          "All new limited liability companies (LLCs), S corporations, C corporations, limited partnerships (LPs), and limited liability partnershps (LLPs) registered in the state of California should pay a franchise tax. ",
        faqs: [
          {
            header: "What is this about?",
            description:
              "All new limited liability companies (LLCs), S corporations, C corporations, limited partnerships (LPs), and limited liability partnershps (LLPs) registered in the state of California should pay a franchise tax. "
          },
          {
            header: "How often do I need to do this?",
            description:
              "California Franchise Tax must be paid during the first quarter of each accounting period for your business. This is usually the first quarter of the calendar year for most companies."
          }
        ],
        formSchema: [
          {
            id: "corpNumber",
            name: "corpNumber",
            label: "California Corporate Number",
            description: "California Corporate Number",
            type: "string",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          },
          {
            id: "licenceFile",
            name: "licenceFile",
            label: "Upload latest filing",
            description: "Upload latest filing",
            type: "fileArray",
            validationType: "mixed",
            validations: [
              {
                type: "required",
                params: ["this field is required"]
              }
            ]
          }
        ]
      }
    ]
  },
  stripeCardModalOpen: false,
  saving: false,
  paymentAuthorized: false,
  currentStep: "add_services", // 'update_services_details', 'add_payment', 'payment_added'
  selectedServices: {},
  loadingSelectedServices: false,
  loadingSelectedServicesFailed: false
};


export function oneServices(state = initialState, action) {
    switch (action.type) {
      case types.TOGGLE_STRIPE_MODAL:
        return {
          ...state,
          stripeCardModalOpen: action.toggle
        };
      case types.ONE_USER_SERVICES_SAVING:
          return {
            ...state,
            saving: action.toggle
          }
          break;
      case types.ONE_USER_SERVICES_UPDATE_STEP:
        return {
          ...state,
          currentStep: action.step
        };
        break;
      case types.ONE_USER_UPDATE_SELECTED_SERVICE_DETAILS_LOADING:
         return {
          ...state,
          loadingSelectedServices: true,
          loadingSelectedServicesFailed: false
        };
        break;
      case types.ONE_USER_UPDATE_SELECTED_SERVICE_DETAILS:
        return {
          ...state,
          saving: false,
          selectedServices: action.result,
          loadingSelectedServices: false,
          loadingSelectedServicesFailed: false
        };
        break;
      case types.ONE_USER_UPDATE_SELECTED_SERVICE_DETAILS_LOADING_FAILED:
        return {
            ...state,
            saving: false,
            loadingSelectedServices: false,
            loadingSelectedServicesFailed: true
        };
        break;
      case types.ONE_USER_LOGIN_ADD_SERVICE_DETAILS:
        return {
          ...state,
          saving: false,
          selectedServices: action.selectedServices,
          loadingSelectedServices: false,
          loadingSelectedServicesFailed: false
        };
        break;
      case types.ONE_USER_LOGIN_SERVICE_DETAILS_LOADING:
        return {
          ...state,
          saving: false,
          loadingSelectedServices: true,
          loadingSelectedServicesFailed: false
        };
        break;
      case types.ONE_USER_LOGIN_SERVICE_DETAILS_LOADING_FAILED:
        return {
          ...state,
          saving: false,
          loadingSelectedServices: false,
          loadingSelectedServicesFailed: true
        };
        break;
      case types.ONE_USER_ADD_SELECTED_SERVICE_LOADING:
        return {
          ...state,
          saving: false,
          loadingSelectedServices: true,
          loadingSelectedServicesFailed: false
        };
        break;
      case types.ONE_USER_ADD_SELECTED_SERVICE:
        return {
          ...state,
          saving: false,
          selectedServices: action.selectedServices,
          loadingSelectedServices: false,
          loadingSelectedServicesFailed: false
        };
        break;
      case types.ONE_USER_ADD_SELECTED_SERVICE_LOADING_FAILED:
        return {
          ...state,
          saving: false,
          loadingSelectedServices: false,
          loadingSelectedServicesFailed: true
        };
        break;
      default:
        return state;
    }
}
