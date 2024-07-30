import { Spin } from "antd";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoutes";
import Record from "./Record";

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
          path={`${match.url}/`}
          render={(props) => (
            <ProtectedRoute role={"ROLE_DATAENTRY,ROLE_REVIEWER,ROLE_PI"}>
              <Record {...props} />
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path={`${match.url}/:record_id`}
          render={(props) => (
            <ProtectedRoute role={"ROLE_DATAENTRY,ROLE_REVIEWER,ROLE_PI"}>
              <Record {...props} />
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
