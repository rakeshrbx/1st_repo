import {
  FileDoneOutlined,
  HomeOutlined,
  TableOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import user_info from "../../helpers/user_info";
import logo from "../../logo.png";
const Sidebar = ({ collapsed, setCollapsed }) => {
  const role = user_info.getRoles();
  const location = useLocation();
  const { Sider } = Layout;
  const activeMenu = location?.pathname?.split("/")?.at(-1);
  return (
    <>
      <SideBarContainer
        style={{ height: "90vh", position: "sticky", left: "0", top: "0" }}
      >
        <Sider
          style={{
            height: "100%",
            backgroundColor: "#fff",
          }}
          breakpoint="lg"
          collapsedWidth="64px"
          collapsed={collapsed}
          zeroWidthTriggerStyle={{
            display: "none",
          }}
          onBreakpoint={(broken) => {
            setCollapsed(broken && !collapsed);
          }}
          onCollapse={(collapsed, type) => {}}
        >
          <Link
            to="/"
            className="demo-logo-vertical"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "60px",
              width: "100%",
              padding: "12px",
              // backgroundColor: "#23282d",
            }}
          >
            <img
              style={{
                width: "100%",
              }}
              src={!collapsed && logo}
              alt=""
            />
          </Link>
          <Menu
            mode="inline"
            defaultSelectedKeys={
              activeMenu || (role === "ROLE_ADMIN" ? "dashboard" : "home")
            }
            selectedKeys={
              activeMenu || (role === "ROLE_ADMIN" ? "dashboard" : "home")
            }
            style={{
              marginTop: "24px",
              fontSize: "15px",
              fontWeight: "400",
              color: "white !important",
              height: "100%",
              background: "#fff",
            }}
          >
            {role === "ROLE_ADMIN" ? (
              <>
                <Menu.Item key="dashboard" icon={<FileDoneOutlined />}>
                  <Link to="/dashboard" key="dashboard">
                    Dashboard
                  </Link>
                </Menu.Item>
                <Menu.Item key="user-management" icon={<UserOutlined />}>
                  <Link to="/admin/user-management" key={"user-management"}>
                    Users
                  </Link>
                </Menu.Item>
                <Menu.SubMenu
                  icon={<TableOutlined />}
                  title="Master Data"
                  style={{ fontWeight: "500" }}
                >
                  <Menu.Item key="CRO">
                    <Link to="/admin/CRO" key="cro">
                      CRO
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="sponsor">
                    <Link to="/admin/sponsor" key="sponsor">
                      Sponsor
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="site">
                    <Link to="/admin/site" key="site">
                      Site
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="study">
                    <Link to="/admin/study" key="study">
                      Study
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>
              </>
            ) : role === "ROLE_PI" ? (
              <>
                <Menu.Item key="dashboard" icon={<FileDoneOutlined />}>
                  <Link to="/dashboard" key="dashboard">
                    Dashboard
                  </Link>
                </Menu.Item>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  <Link to="/" key="home">
                    Records
                  </Link>
                </Menu.Item>
              </>
            ) : role === "ROLE_CRO" || role === "ROLE_SPONSOR" ? (
              <>
                <Menu.Item key="dashboard" icon={<FileDoneOutlined />}>
                  <Link to="/dashboard" key="dashboard">
                    Dashboard
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/" key="home">
                  Dashboard
                </Link>
              </Menu.Item>
            )}

            {/* <Menu.Item key="reports" icon={<FileDoneOutlined />}>
              <Link to="/reports" key="reports">
                Reports
              </Link>
            </Menu.Item> */}
            {role === "ROLE_DATAENTRY" && (
              <Menu.Item key="bulk-upload" icon={<UploadOutlined />}>
                <Link to="/dashboard/bulk-upload" key="bulk">
                  Bulk Upload
                </Link>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
      </SideBarContainer>
      {/* <SideBarContainer>
        <Link
          to="/"
          style={{
            display: "flex",
            justifyContent: "center",
            height: "64px",
            width: "100%",
            // padding: "5px",
            backgroundColor: "#23282d",
          }}
        >
          <img
            style={{
              width: "100%",
            }}
            src={logo}
            alt=""
          />
        </Link>
        <Sider
          style={{
            height: "100%",
            backgroundColor: "#fff",
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={
              activeMenu || (role === "ROLE_ADMIN" ? "user-management" : "home")
            }
            selectedKeys={
              activeMenu || (role === "ROLE_ADMIN" ? "user-management" : "home")
            }
            style={{
              marginTop: "24px",
              fontSize: "15px",
              fontWeight: "400",
              color: "white !important",
              height: "100%",
              background: "#fff",
            }}
          >
            {role === "ROLE_ADMIN" && (
              <>
                <Menu.Item key="user-management" icon={<UserOutlined />}>
                  <Link to="/admin/user-management" key={"user-management"}>
                    Users
                  </Link>
                </Menu.Item>
                <Menu.SubMenu
                  icon={<TableOutlined />}
                  title="Master Data"
                  style={{ fontWeight: "500" }}
                >
                  <Menu.Item key="CRO">
                    <Link to="/admin/CRO" key="cro">
                      CRO
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="sponsor">
                    <Link to="/admin/sponsor" key="sponsor">
                      Sponsor
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="site">
                    <Link to="/admin/site" key="site">
                      Site
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="study">
                    <Link to="/admin/study" key="study">
                      Study
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>
              </>
            )}
            {role !== "ROLE_ADMIN" && (
              <>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  <Link to="/" key="home">
                    Dashboard
                  </Link>
                </Menu.Item>
              </>
            )}

            <Menu.Item key="reports" icon={<FileDoneOutlined />}>
              <Link to="/reports" key="reports">
                Reports
              </Link>
            </Menu.Item>
            <Menu.Item key="bulk-upload" icon={<UploadOutlined />}>
              <Link to="/reports/bulk-upload" key="bulk">
                Bulk Upload
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </SideBarContainer> */}
    </>
  );
};

export default Sidebar;

const SideBarContainer = styled.div``;
