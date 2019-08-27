import * as types from "./ActionTypes";

// atleast one service requirements should be filled

const initialState = {
 
  allAvailableServices: {
    individual: [
      {
        id: 0,
        name: "Property Taxes",
        icon: null,
        initialFormData: {
            "adddress": null,
            "parcelId": null,
            "billFile": [],
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
        icon: null,
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
        icon: null,
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
        name: "Vehicle Registration",
        icon: null,
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
        icon: null,
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
        icon: null,
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
        id: 1,
        name: "Utility Bill",
        icon: null,
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
      }
    ]
  },
  saving: false,
  paymentAuthorized: false,
  currentStep: "add_services", // 'update_services_details', 'add_payment', 'payment_added'
  selectedServices: {},
  loadingSelectedServices: false,
  loadingSelectedServicesFailed: false
};


export function oneServices(state = initialState, action) {
    switch (action.type) {
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
