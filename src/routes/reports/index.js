import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

const ReportList = React.lazy(() => import("./list"));
const BulkUpload = React.lazy(() => import("./bulkUpload"));

export const Index = ({ match }) => {
  console.log(match);
  return (
    <Suspense fallback={<div className="loading"></div>}>
      <Switch>
        <Route
          exact
          path={`${match.url}/`}
          render={(props) => <ReportList {...props} />}
        />
        <Route
          exact
          path={`${match.url}/bulk-upload`}
          render={(props) => <BulkUpload {...props} />}
        />

        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
