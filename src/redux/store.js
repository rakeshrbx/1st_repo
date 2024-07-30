import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import reducers from "./reducers";
import sagas from "./sagas";
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();
const createBrowserHistory = require("history").createBrowserHistory;
export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, sagaMiddleware, routeMiddleware];

// export function configureStore(initialState) {
export const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(...middlewares))
);
sagaMiddleware.run(sagas);

if (module.hot) {
  module.hot.accept("./reducers", () => {
    const nextRootReducer = require("./reducers");
    store.replaceReducer(nextRootReducer);
  });
}

//}
