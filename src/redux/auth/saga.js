import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { MANAGE_AUTH_REQUEST } from "../actions";
import { LOGIN, POST } from "../api";
import { manageAuthError, manageAuthSuccess } from "./action";
const authURL = window?.["authBaseUrl"];

export function* watchManageAuth() {
  yield takeLatest(MANAGE_AUTH_REQUEST, manageAuthAsync);
}

function* manageAuthAsync({ payload, request_type }) {
  let url, response;
  try {
    if (request_type === "LOGIN") {
      url = `${authURL}/api/auth/signin`;
      response = yield call(LOGIN, url, payload);
    } else if (request_type === "FORGOT_PASSWORD") {
      url = `/user/ForgotPassword`;
      response = yield call(POST, url, payload);
    } else {
      yield put(manageAuthError("Invalid URL"));
    }

    if (response && response.is_error) {
      yield put(manageAuthError(response.message));
    } else {
      yield put(manageAuthSuccess(response, request_type));
    }
  } catch (error) {
    yield put(manageAuthError(error));
  }
}

export default function* rootSaga() {
  yield all([fork(watchManageAuth)]);
}
