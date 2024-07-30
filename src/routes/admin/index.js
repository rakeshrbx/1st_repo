import { Spin } from "antd";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoutes";
const CRO = React.lazy(() => import("./CRO"));
const Site = React.lazy(() => import("./Site"));
const Sponsor = React.lazy(() => import("./Sponsor"));
const Study = React.lazy(() => import("./Study"));
const UserManagement = React.lazy(() => import("./UserManagement"));

export const Index = ({ match }) => {
  return (
    <Suspense
      fallback={
        <Spin
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      }
    >
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          render={(props) => (
            <ProtectedRoute role={"ROLE_ADMIN"}>
              <UserManagement {...props} />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path={`${match.url}/CRO`}
          render={(props) => (
            <ProtectedRoute role={"ROLE_ADMIN"}>
              <CRO {...props} />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path={`${match.url}/Study`}
          render={(props) => (
            <ProtectedRoute role={"ROLE_ADMIN"}>
              <Study {...props} />
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${match.url}/Site`}
          render={(props) => (
            <ProtectedRoute role={"ROLE_ADMIN"}>
              <Site {...props} />
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${match.url}/Sponsor`}
          render={(props) => (
            <ProtectedRoute role={"ROLE_ADMIN"}>
              <Sponsor {...props} />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path={`${match.url}/user-management`}
          render={(props) => (
            <ProtectedRoute role={"ROLE_ADMIN"}>
              <UserManagement {...props} />
            </ProtectedRoute>
          )}
        />

        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
