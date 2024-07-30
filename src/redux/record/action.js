import {
  MANAGE_RECORD_ERROR,
  MANAGE_RECORD_REQUEST,
  MANAGE_RECORD_SUCCESS,
} from "../actions";

export const manageRecordRequest = (request) => ({
  type: MANAGE_RECORD_REQUEST,
  payload: request,
  request_type: request.request_type,
});
export const manageRecordSuccess = (response, request_type) => ({
  type: MANAGE_RECORD_SUCCESS,
  payload: response,
  request_type: request_type,
});
export const manageRecordError = (message) => ({
  type: MANAGE_RECORD_ERROR,
  payload: message,
});
