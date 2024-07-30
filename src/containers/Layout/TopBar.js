import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Typography, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const TopBar = ({ setCollapsed, collapsed }) => {
  let history = useHistory();

  const token = localStorage.getItem("token");
  const { Text, Link } = Typography;

  const userData = jwtDecode(token);

  const {
    token: { colorBgContainer, colorPrimary, colorWhite },
  } = theme.useToken();
  return (
    <Header
      style={{
        padding: 0,
        background: colorWhite,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,.08)",
        position: "sticky",
        width: "-webkit-fill-available",
        top: 0,
        zIndex: 999,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 46,
          height: 46,

          backgroundColor: colorPrimary,
          color: "white",
          marginLeft: collapsed ? "-56px" : "16px",
        }}
      />
      <div>
        {/* <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={userData?.sub}
            description={userData?.roles}
          /> */}

        <Avatar
          size={36}
          icon={<UserOutlined />}
          style={{
            margin: "0 10px 5px 0",
            alignSelf: "center",
            verticalAlign: "middle",
            backgroundColor: "#87d068",
          }}
        />
        <Text
          strong
          style={{
            fontSize: "16px",
            margin: "0",
            fontWeight: "700",
            marginRight: "24px",
          }}
        >
          {userData?.sub}
        </Text>

        <Popconfirm
          placement="bottom"
          // title={"Logout"}
          description={"Are you Sure ?"}
          okText="Yes"
          icon={<LogoutOutlined />}
          onConfirm={() => {
            localStorage.removeItem("token");
            window.location.href = "/signin";
          }}
          cancelText="No"
        >
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            size="large"
            style={{
              marginRight: "24px",
              color: "white",
            }}
          >
            Logout
          </Button>
        </Popconfirm>

        {/* <Button
            icon={<LogoutOutlined />}
            type="danger"
            style={{ marginRight: "32px" }}
            >
            Logout
            </Button> */}
      </div>
    </Header>
  );
};

export default TopBar;
