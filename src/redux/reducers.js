import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import admin_reducer from "./admin/reducer";
import auth_reducer from "./auth/reducer";
import record_reducer from "./record/reducer";

const createBrowserHistory = require("history").createBrowserHistory;
const history = createBrowserHistory();
const reducers = combineReducers({
  auth_reducer,
  admin_reducer,
  record_reducer,
  router: connectRouter(history),
});

export default reducers;
