import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { objectToQueryString } from "../../helpers/utils";
import { MANAGE_ADMIN_REQUEST } from "../actions";
import { DELETE, GET, POST, PUT } from "../api";
import { manageAdminError, manageAdminSuccess } from "./action";
const serviceURL = window?.["apiBaseUrl"];
const authURL = window?.["authBaseUrl"];

export function* watchManageAdmin() {
  yield takeEvery(MANAGE_ADMIN_REQUEST, manageAdminAsync);
}

function* manageAdminAsync({ payload, request_type }) {
  let url, response;
  try {
    if (request_type === "ADD_CRO_DETAILS") {
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
    } else if (request_type === "ADD_SITE_DETAILS") {
      url = `${serviceURL}/site-details`;
      response = yield call(POST, url, payload);
    } else if (request_type === "GET_SITE_DETAILS") {
      url = `${serviceURL}/site-details`;
      response = yield call(GET, url, payload);
    } else if (request_type === "EDIT_SITE_DETAILS") {
      url = `${serviceURL}/site-details/${payload?.id}`;
      response = yield call(PUT, url, payload);
    } else if (request_type === "DELETE_SITE_DETAILS") {
      url = `${serviceURL}/site-details/${payload?.id}`;
      response = yield call(DELETE, url, payload);
    } else if (request_type === "ADD_STUDY_DETAILS") {
      url = `${serviceURL}/project-details`;
      response = yield call(POST, url, payload);
    } else if (request_type === "GET_STUDY_DETAILS") {
      url = `${serviceURL}/project-details`;
      response = yield call(GET, url, payload);
    } else if (request_type === "EDIT_STUDY_DETAILS") {
      url = `${serviceURL}/project-details/${payload?.id}`;
      response = yield call(PUT, url, payload);
    } else if (request_type === "DELETE_STUDY_DETAILS") {
      url = `${serviceURL}/project-details/${payload?.id}`;
      response = yield call(DELETE, url, payload);
    } else if (request_type === "ADD_USER_DETAILS") {
      url = `${authURL}/api/auth/signup`;
      response = yield call(POST, url, payload);
    } else if (request_type === "GET_USER_DETAILS") {
      url = `${authURL}/api/auth/users`;
      response = yield call(GET, url, payload);
    } else if (request_type === "EDIT_USER_DETAILS") {
      url = `${authURL}/api/auth/user/${payload?.id}`;
      response = yield call(PUT, url, payload);
    } else if (request_type === "DELETE_USER_DETAILS") {
      url = `${authURL}/api/auth/user/${payload?.id}`;
      response = yield call(DELETE, url, payload);
    } else if (request_type === "GET_CRO_DROP_DOWN") {
      url = `${serviceURL}/cros`;
      response = yield call(GET, url, payload);
    } else if (request_type === "GET_SPONSOR_DROP_DOWN") {
      url = `${serviceURL}/sponsors`;
      response = yield call(GET, url, payload);
    } else if (request_type === "GET_SITE_DROP_DOWN") {
      url = `${serviceURL}/siteids`;
      response = yield call(GET, url, payload);
    } else if (request_type === "GET_OVERVIEW_REPORT") {
      url = `${serviceURL}/overviewReport?${objectToQueryString(payload)}`;
      response = yield call(GET, url, payload);
    } else {
      yield put(manageAdminError("Invalid URL"));
    }

    if (response && response.is_error) {
      yield put(manageAdminError(response.message));
    } else {
      yield put(manageAdminSuccess(response, request_type));
    }
  } catch (error) {
    yield put(manageAdminError(error));
  }
}

export default function* rootSaga() {
  yield all([fork(watchManageAdmin)]);
}
