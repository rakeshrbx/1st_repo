import {
  MANAGE_ADMIN_ERROR,
  MANAGE_ADMIN_REQUEST,
  MANAGE_ADMIN_SUCCESS,
} from "../actions";

const INIT_STATE = {
  admin_loading: false,
  admin_success: null,
  admin_error: null,
  admin_action: null,
  admin_request_type: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MANAGE_ADMIN_REQUEST:
      return {
        ...state,
        admin_loading: true,
        admin_error: null,
        admin_success: null,
        admin_action: action.type,
        admin_request_type: action.request_type,
      };
    case MANAGE_ADMIN_SUCCESS:
      if (action.request_type === "ADD_CRO_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          cro_details_submit_status: action.payload,
        };
      } else if (action.request_type == "GET_CRO_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          cro_details_list: action.payload,
        };
      } else if (action.request_type == "EDIT_CRO_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          cro_details_edit_status: action.payload,
        };
      } else if (action.request_type == "DELETE_CRO_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          cro_details_delete_status: action.payload,
        };
      } else if (action.request_type === "ADD_SPONSOR_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          sponsor_details_submit_status: action.payload,
        };
      } else if (action.request_type == "GET_SPONSOR_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          sponsor_details_list: action.payload,
        };
      } else if (action.request_type == "EDIT_SPONSOR_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          sponsor_details_edit_status: action.payload,
        };
      } else if (action.request_type == "DELETE_SPONSOR_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          sponsor_details_delete_status: action.payload,
        };
      } else if (action.request_type === "ADD_SITE_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          site_details_submit_status: action.payload,
        };
      } else if (action.request_type == "GET_SITE_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          site_details_list: action.payload,
        };
      } else if (action.request_type == "EDIT_SITE_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          site_details_edit_status: action.payload,
        };
      } else if (action.request_type == "DELETE_SITE_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          site_details_delete_status: action.payload,
        };
      } else if (action.request_type === "ADD_STUDY_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          study_details_submit_status: action.payload,
        };
      } else if (action.request_type == "GET_STUDY_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          study_details_list: action.payload,
        };
      } else if (action.request_type == "EDIT_STUDY_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          study_details_edit_status: action.payload,
        };
      } else if (action.request_type == "DELETE_STUDY_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          study_details_delete_status: action.payload,
        };
      } else if (action.request_type === "ADD_USER_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          user_details_submit_status: action.payload,
        };
      } else if (action.request_type == "GET_USER_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          user_details_list: action.payload,
        };
      } else if (action.request_type == "EDIT_USER_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          user_details_edit_status: action.payload,
        };
      } else if (action.request_type == "DELETE_USER_DETAILS") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          user_details_delete_status: action.payload,
        };
      } else if (action.request_type == "GET_CRO_DROP_DOWN") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          cro_drop_down_list: action.payload,
        };
      } else if (action.request_type == "GET_SPONSOR_DROP_DOWN") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          sponsor_drop_down_list: action.payload,
        };
      } else if (action.request_type == "GET_SITE_DROP_DOWN") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          site_drop_down_list: action.payload,
        };
      } else if (action.request_type == "GET_OVERVIEW_REPORT") {
        return {
          ...state,
          admin_loading: false,
          admin_success: true,
          overview_report: action.payload,
        };
      }
    case MANAGE_ADMIN_ERROR:
      return {
        ...state,
        admin_loading: false,
        admin_error: action.payload,
      };

    default:
      return { ...state };
  }
};
