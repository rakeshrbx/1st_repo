import { Spin } from "antd";
import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UserInfo from "../helpers/user_info";
import { NotFound } from "./404";
const Admin = React.lazy(() => import("./admin"));
const reports = React.lazy(() => import("./reports"));
const Records = React.lazy(() => import("./records"));
const RecordsDashboard = React.lazy(() => import("./records/RecordsDashboard"));

function Index(props) {
  useEffect(() => {
    window.onkeypress = (e) => {
      if (e.key === "Enter") return false;
    };
  }, []);
  const role = UserInfo.getRoles();

  return (
    <div>
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
            key={"/"}
            path={`/`}
            // component={role === "ROLE_ADMIN" ? Admin : RecordsDashboard}
            // component={reports}
            component={
              role === "ROLE_DATAENTRY" ||
              role === "ROLE_REVIEWER" ||
              role === "ROLE_PI"
                ? RecordsDashboard
                : reports
            }
          />
          <Route key={"/record"} path={`/record`} component={Records} />
          <Route key={"/admin"} path={`/admin`} component={Admin} />
          <Route key={"/dashboard"} path={`/dashboard`} component={reports} />
          <Route
            key={"404"}
            path={`/404`}
            component={(props) => <NotFound {...props} />}
          />
          <Redirect to={"/404"} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default Index;
