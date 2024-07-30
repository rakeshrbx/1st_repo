import {
  MANAGE_ADMIN_ERROR,
  MANAGE_ADMIN_REQUEST,
  MANAGE_ADMIN_SUCCESS,
} from "../actions";

export const manageAdminRequest = (request) => ({
  type: MANAGE_ADMIN_REQUEST,
  payload: request,
  request_type: request.request_type,
});
export const manageAdminSuccess = (response, request_type) => ({
  type: MANAGE_ADMIN_SUCCESS,
  payload: response,
  request_type: request_type,
});
export const manageAdminError = (message) => ({
  type: MANAGE_ADMIN_ERROR,
  payload: message,
});
