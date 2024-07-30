import { all } from "redux-saga/effects";
import adminSaga from "./admin/saga";
import authSaga from "./auth/saga";
import recordSaga from "./record/saga";

export default function* rootSaga() {
  yield all([authSaga(), adminSaga(), recordSaga()]);
}
