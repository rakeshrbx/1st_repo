import { Card } from "antd";
import React from "react";
import { connect } from "react-redux";

export const NotFound = (props) => {
  return (
    <Card className=" text-center">
      <div className="gx-page-error-container">
        <div className="gx-page-error-content">
          <h1 className="gx-error-code gx-mb-4">404</h1>
          <h2 className="gx-text-center">
            Oops, an error has occurred. Page not found!
          </h2>

          <p className="gx-text-center">
            <a className="gx-btn gx-btn-primary" href="/">
              Go to Home
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
