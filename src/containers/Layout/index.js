import { Layout, theme } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { footerText } from "../../util/config";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";
const LayoutContainer = ({ children }) => {
  const { Footer, Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Topbar setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content
          style={{
            // margin: "64px 16px",
            padding: 24,
            minHeight: "80vh",
            background: "#f5f5f5",
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {footerText}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;

const LayourWrapper = styled.div`
  .wrapper {
    flex-direction: row;
    height: auto;
    min-height: calc(100vh - 70px);
  }

  .main {
    width: calc(100% - 100px);
    padding: 22px 22px;
    margin-left: 100px;
  }
`;
