import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import login_bg from "../../logo.png";
import { MANAGE_AUTH_REQUEST } from "../../redux/actions";
import { manageAuthRequest } from "../../redux/auth/action";
const SignIn = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    login_info,
    auth_loading,
    auth_error,
    auth_success,
    auth_action,
    auth_request_type,
  } = props.auth_reducer;
  const { manageAuthAsync } = props;

  function logIn(data) {
    manageAuthAsync({ request_type: "LOGIN", payload: { ...data } });
  }

  useEffect(() => {
    if (auth_action === MANAGE_AUTH_REQUEST) {
      if (auth_request_type === "LOGIN") {
        if (auth_success) {
          message.success("Logged In Successfully");
          localStorage.setItem("token", login_info?.accessToken);
          window.location.href = "/";
        } else if (auth_error) {
          message.error(
            auth_error?.error === "Bad credentials"
              ? "Invalid Credentials"
              : auth_error?.error
          );
        }
      }
    }
  }, [
    auth_loading,
    auth_action,
    auth_error,
    auth_request_type,
    auth_success,
    login_info,
  ]);

  return (
    <Row align={"center"}>
      <Col
        xxl={6}
        xl={8}
        lg={8}
        md={10}
        sm={12}
        xs={16}
        style={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Card
          style={{
            boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.05)",
            padding: "32px",
          }}
          cover={
            <img
              alt="example"
              src={login_bg}
              style={{ margin: "32px 0 50px 0" }}
            />
          }
        >
          <LoginContainer className="h-100">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={logIn}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Row align="center">
                <Col>
                  <Form.Item style={{ alignItems: "center" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </LoginContainer>
        </Card>
      </Col>
    </Row>
  );
};
const mapStatetoProps = ({ auth_reducer }) => {
  return { auth_reducer };
};
const mapDispatchtoProps = {
  manageAuthAsync: manageAuthRequest,
};
export default connect(mapStatetoProps, mapDispatchtoProps)(SignIn);

const LoginContainer = styled.div``;
