import React from "react";
import "./App.css";
import App from "./containers/App";
import { Provider } from "react-redux";
import { store, history } from "./redux/store";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, BrowserRouter } from "react-router-dom";

function NextApp() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default NextApp;
