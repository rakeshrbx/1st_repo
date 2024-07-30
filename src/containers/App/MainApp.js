import React from "react";
import { useRouteMatch } from "react-router-dom";
import { MainAppStyles } from "../../components/GlobalStyles";
import App from "../../routes/index";
import Layout from "../Layout";
function MainApp() {
  const match = useRouteMatch();

  return (
    <MainAppStyles>
      <Layout>
        <App match={match} />
      </Layout>
    </MainAppStyles>
  );
}

export default MainApp;
