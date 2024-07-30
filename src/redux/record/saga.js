import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { objectToQueryString } from "../../helpers/utils";
import { MANAGE_RECORD_REQUEST } from "../actions";
import { DELETE, GET, POST, PUT } from "../api";
import { manageRecordError, manageRecordSuccess } from "./action";
const serviceURL = window?.["apiBaseUrl"];
const authURL = window?.["authBaseUrl"];

export function* watchManageRecord() {
  yield takeEvery(MANAGE_RECORD_REQUEST, manageRecordAsync);
}

function* manageRecordAsync({ payload, request_type }) {
  let url, response;
  try {
    if (request_type === "GET_RECORDS") {
      url = `${serviceURL}/getRecentRecords?${objectToQueryString(payload)}`;
      response = yield call(GET, url, payload);
    } else if (request_type === "GET_FILTERED_RECORDS") {
      url = `${serviceURL}/findRecordOnDate?${objectToQueryString(payload)}`;
      response = yield call(GET, url, payload);
    } else if (request_type === "ADD_RECORD") {
      url = `${serviceURL}/addRecord`;
      response = yield call(POST, url, payload);
    } else if (request_type === "ADD_AUDIT_DATA") {
      url = `${serviceURL}/audit`;
      response = yield call(POST, url, payload);
    } else if (request_type === "EDIT_RECORD") {
      url = `${serviceURL}/updateRecord`;
      response = yield call(POST, url, payload);
    } else if (request_type === "GET_RECORDS_COUNT") {
      url = `${serviceURL}/getTotalRecordCount`;
      response = yield call(GET, url, payload);
    } else if (request_type === "GET_STUDY_DETAILS") {
      url = `${serviceURL}/projects`;
      response = yield call(GET, url, payload);
    } else if (request_type === "GET_RECORD_DETAILS") {
      console.log(payload);
      url = `${serviceURL}/findRecord?key=recordid&value=${payload?.value}
`;
      response = yield call(GET, url, payload);
    } else if (request_type === "ADD_CRO_DETAILS") {
      url = `${serviceURL}/cro-details`;
      response = yield call(POST, url, payload);
    } else if (request_type === "GET_CRO_DETAILS") {
      url = `${serviceURL}/cro-details`;
      response = yield call(GET, url, payload);
    } else if (request_type === "EDIT_CRO_DETAILS") {
      url = `${serviceURL}/cro-details/${payload?.id}`;
      response = yield call(PUT, url, payload);
    } else if (request_type === "DELETE_CRO_DETAILS") {
      url = `${serviceURL}/cro-details/${payload?.id}`;
      response = yield call(DELETE, url, payload);
    } else if (request_type === "ADD_SPONSOR_DETAILS") {
      url = `${serviceURL}/sponsor-details`;
      response = yield call(POST, url, payload);
    } else if (request_type === "GET_SPONSOR_DETAILS") {
      url = `${serviceURL}/sponsor-details`;
      response = yield call(GET, url, payload);
    } else if (request_type === "EDIT_SPONSOR_DETAILS") {
      url = `${serviceURL}/sponsor-details/${payload?.id}`;
      response = yield call(PUT, url, payload);
    } else if (request_type === "DELETE_SPONSOR_DETAILS") {
      url = `${serviceURL}/sponsor-details/${payload?.id}`;
      response = yield call(DELETE, url, payload);
    } else {
      yield put(manageRecordError("Invalid URL"));
    }
    console.log(response);
    if (response && response.is_error) {
      yield put(manageRecordError(response.message));
    } else {
      yield put(manageRecordSuccess(response, request_type));
    }
  } catch (error) {
    yield put(manageRecordError(error));
  }
}

export default function* rootSaga() {
  yield all([fork(watchManageRecord)]);
}
