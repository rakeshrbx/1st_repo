import { ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import theme from "../../helpers/theme";
import { CheckAuth } from "../../helpers/utils";
import { setInitUrl } from "../../redux/auth/action";
import SignIn from "../../routes/auth/signin";
import MainApp from "./MainApp";
const RestrictedRoute = ({ component: Component, location, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      CheckAuth() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: location },
          }}
        />
      )
    }
  />
);
const Index = (props) => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth_loading, token, initURL } = props.auth_reducer;

  useEffect(() => {
    if (initURL === "") {
      dispatch(setInitUrl(location.pathname));
    }
  }, []);
  useEffect(() => {
    if (!auth_loading) {
      if (!CheckAuth() && initURL == "/forgot") {
        history.push(initURL);
      } else if (!CheckAuth()) {
        history.push("/signin");
      } else if (initURL === "" || initURL === "/" || initURL === "/signin") {
        history.push("/");
      } else {
        if (initURL) history.push(initURL || "/");
      }
    }
  }, [auth_loading, token, initURL]);

  return (
    <ConfigProvider key="antd" theme={{ ...theme }}>
      <Switch key="main_routes">
        <Route key="signin" exact path="/signin" component={SignIn} />

        <RestrictedRoute
          key="mainapp"
          path={`${match.url}`}
          location={location}
          component={MainApp}
        />
      </Switch>
    </ConfigProvider>
  );
};

const mapStatetoProps = ({ auth_reducer }) => {
  return { auth_reducer };
};
export default connect(mapStatetoProps)(Index);
