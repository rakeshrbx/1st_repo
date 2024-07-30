import {
  // INIT_URL,
  MANAGE_RECORD_ERROR,
  MANAGE_RECORD_REQUEST,
  MANAGE_RECORD_SUCCESS,
} from "../actions";

const INIT_STATE = {
  record_loading: false,
  record_success: null,
  record_error: null,
  record_action: null,
  record_request_type: null,
  // initURL: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MANAGE_RECORD_REQUEST:
      return {
        ...state,
        record_loading: true,
        record_error: null,
        record_success: null,
        record_action: action.type,
        record_request_type: action.request_type,
      };
    case MANAGE_RECORD_SUCCESS:
      if (action.request_type === "GET_RECORDS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          records_list: action.payload,
        };
      } else if (action.request_type === "ADD_RECORD") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          add_record_submit_status: action.payload,
        };
      } else if (action.request_type === "EDIT_RECORD") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          edit_record_submit_status: action.payload,
        };
      } else if (action.request_type === "ADD_AUDIT_DATA") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          audit_data_submit_status: action.payload,
        };
      } else if (action.request_type === "GET_RECORD_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          records_details: action.payload,
        };
      } else if (action.request_type === "GET_RECORDS_COUNT") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          records_count: action.payload,
        };
      } else if (action.request_type === "GET_STUDY_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          study_details: action.payload,
        };
      } else if (action.request_type === "GET_FILTERED_RECORDS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          filtered_records: action.payload,
        };
      } else if (action.request_type === "ADD_CRO_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          cro_details_submit_status: action.payload,
        };
      } else if (action.request_type == "GET_CRO_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          cro_details_list: action.payload,
        };
      } else if (action.request_type == "EDIT_CRO_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          cro_details_edit_status: action.payload,
        };
      } else if (action.request_type == "DELETE_CRO_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          cro_details_delete_status: action.payload,
        };
      } else if (action.request_type === "ADD_SPONSOR_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          sponsor_details_submit_status: action.payload,
        };
      } else if (action.request_type == "GET_SPONSOR_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          sponsor_details_list: action.payload,
        };
      } else if (action.request_type == "EDIT_SPONSOR_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          sponsor_details_edit_status: action.payload,
        };
      } else if (action.request_type == "DELETE_SPONSOR_DETAILS") {
        return {
          ...state,
          record_loading: false,
          record_success: true,
          sponsor_details_delete_status: action.payload,
        };
      }
    case MANAGE_RECORD_ERROR:
      return {
        ...state,
        record_loading: false,
        record_error: action.payload,
      };
    // case INIT_URL: {
    //   return {
    //     ...state,
    //     initURL: action.payload,
    //   };
    // }
    default:
      return { ...state };
  }
};
