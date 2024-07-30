import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { manageAdminRequest } from "../../../redux/actions";

function AddUser(props) {
  const [form] = Form.useForm();

  const { setFieldsValue, resetFields } = form;
  const { manageAdminRequest, admin_reducer, editDetails } = props;

  const {
    admin_loading,
    admin_success,
    admin_request_type,
    site_drop_down_list,
  } = admin_reducer;

  function submitUserDetails(data) {
    if (!data?.id) {
      manageAdminRequest({
        request_type: "ADD_USER_DETAILS",
        ...data,
        roles: [data.roles],
      });
    } else {
      manageAdminRequest({
        request_type: "EDIT_USER_DETAILS",
        ...data,
        roles: [data.roles],
      });
    }
  }

  useEffect(() => {
    setFieldsValue({
      ...editDetails,
      roles: editDetails?.roles[0]?.name,
    });
    return () => resetFields();
  }, [editDetails, resetFields, setFieldsValue]);

  useEffect(() => {
    manageAdminRequest({ request_type: "GET_SITE_DROP_DOWN", payload: {} });
  }, [manageAdminRequest]);

  useEffect(() => {
    if (
      admin_request_type === "ADD_USER_DETAILS" ||
      admin_request_type === "EDIT_USER_DETAILS"
    ) {
      if (admin_success) {
        resetFields();
      }
    }
  }, [resetFields, admin_request_type, admin_loading, admin_success]);
  return (
    <Card title="Add User Details">
      <Form form={form} labelCol={{ span: 24 }} onFinish={submitUserDetails}>
        <Row gutter={20}>
          <Col lg={12} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              name="username"
              label="User Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item label="Site" name="siteId">
              <Select
                options={site_drop_down_list?.map((val, idx) => ({
                  ...val,
                  key: idx,
                  label: `${val?.siteId} - ${val?.siteName}`,
                  value: val?.siteId,
                }))}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Roles"
              name="roles"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={[
                  { label: "ROLE_ADMIN", value: "ROLE_ADMIN" },
                  { label: "ROLE_DATAENTRY", value: "ROLE_DATAENTRY" },
                  { label: "ROLE_REVIEWER", value: "ROLE_REVIEWER" },
                  { label: "ROLE_PI", value: "ROLE_PI" },
                  { label: "ROLE_CRO", value: "ROLE_CRO" },
                  { label: "ROLE_SPONSOR", value: "ROLE_SPONSOR" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row align="center">
          <Col>
            <Button loading={false} htmlType="submit" type="primary">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
const mapStateToProps = ({ admin_reducer }) => {
  return { admin_reducer };
};

const mapDispatchToProps = {
  manageAdminRequest: manageAdminRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
