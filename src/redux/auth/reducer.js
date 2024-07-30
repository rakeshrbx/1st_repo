import {
  // INIT_URL,
  MANAGE_AUTH_ERROR,
  MANAGE_AUTH_REQUEST,
  MANAGE_AUTH_SUCCESS,
} from "../actions";

const INIT_STATE = {
  auth_loading: false,
  auth_success: null,
  auth_error: null,
  auth_action: null,
  auth_request_type: null,
  // initURL: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MANAGE_AUTH_REQUEST:
      return {
        ...state,
        auth_loading: true,
        auth_error: null,
        auth_success: null,
        auth_action: action.type,
        auth_request_type: action.request_type,
      };
    case MANAGE_AUTH_SUCCESS:
      if (action.request_type === "LOGIN") {
        return {
          ...state,
          auth_loading: false,
          auth_success: true,
          auth_error: null,
          login_info: action.payload,
        };
      } else if (action.request_type == "FORGOT_PASSWORD") {
        return {
          ...state,
          auth_loading: false,
          auth_success: true,
        };
      }
    case MANAGE_AUTH_ERROR:
      return {
        ...state,
        auth_loading: false,
        auth_error: action.payload,
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
