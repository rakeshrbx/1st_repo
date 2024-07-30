import {
  INIT_URL,
  MANAGE_AUTH_ERROR,
  MANAGE_AUTH_REQUEST,
  MANAGE_AUTH_SUCCESS,
} from "../actions";

export const manageAuthRequest = (request) => ({
  type: MANAGE_AUTH_REQUEST,
  payload: request,
  request_type: request.request_type,
});
export const manageAuthSuccess = (response, request_type) => ({
  type: MANAGE_AUTH_SUCCESS,
  payload: response,
  request_type: request_type,
});
export const manageAuthError = (message) => ({
  type: MANAGE_AUTH_ERROR,
  payload: message,
});

export const setInitUrl = (url) => ({
  type: INIT_URL,
  payload: url,
});
