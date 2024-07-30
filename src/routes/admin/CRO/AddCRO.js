import { Button, Card, Col, Divider, Form, Input, Row } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { connect } from "react-redux";
import UserInfo from "../../../helpers/user_info";
import {
  MANAGE_ADMIN_REQUEST,
  manageAdminRequest,
} from "../../../redux/actions";

function AddCROData(props) {
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields } = form;
  const { manageAdminRequest, admin_reducer, editDetails } = props;
  const { admin_loading, admin_success, admin_request_type, admin_action } =
    admin_reducer;

  function submitCRODetails(data) {
    const username = UserInfo.getUser();
    if (!data?.id) {
      manageAdminRequest({
        request_type: "ADD_CRO_DETAILS",
        ...data,
        createdBy: username,
        createdOn: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    } else {
      manageAdminRequest({
        request_type: "EDIT_CRO_DETAILS",
        ...data,
        changedBy: username,
        changedOn: moment().format("YYYY-MM-DD HH:mm:ss"),
        createdBy: editDetails?.createdBy,
        createdOn: editDetails?.createdOn,
      });
    }
  }

  useEffect(() => {
    setFieldsValue({
      ...editDetails,
    });
    return () => resetFields();
  }, [editDetails, resetFields, setFieldsValue]);

  useEffect(() => {
    if (admin_action === MANAGE_ADMIN_REQUEST) {
      if (
        admin_request_type === "ADD_CRO_DETAILS" ||
        admin_request_type === "EDIT_CRO_DETAILS"
      ) {
        if (admin_success) {
          resetFields();
        }
      }
    }
  }, [
    admin_loading,
    admin_request_type,
    admin_success,
    admin_action,
    resetFields,
  ]);

  const handleNumbers = (e) => {
    if (!/^[+()\d-]+$/.test(e.key) && e.key != "Backspace" && e.key != " ") {
      e.preventDefault();
    }
  };

  return (
    <Card title="Add CRO Details">
      <Form form={form} labelCol={{ span: 24 }} onFinish={submitCRODetails}>
        <Row gutter={20}>
          <Divider>General Data</Divider>
          <Col lg={4} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              name="croCode"
              label="CRO Code"
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
          <Col lg={8} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="CRO Name"
              name="croName"
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
            <Form.Item label="Legal Name (as per license))" name="legalName">
              <Input />
            </Form.Item>
          </Col>
          <Divider>Address</Divider>
          <Col lg={18} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Address"
              name={["addressDetails", "address"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="City"
              name={["addressDetails", "city"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item label="District" name={["addressDetails", "district"]}>
              <Input />
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Region"
              name={["addressDetails", "region"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="ZIP Code"
              name={["addressDetails", "zip_code"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onKeyDown={handleNumbers} />
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Country"
              name={["addressDetails", "country"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Divider>Communication</Divider>
          <Col lg={6} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Office Telephone"
              name={["communicationDetails", "telephone"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onKeyDown={handleNumbers} />
            </Form.Item>
          </Col>

          <Col lg={6} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Mobile Number"
              name={["communicationDetails", "mobile_number"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onKeyDown={handleNumbers} />
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Email"
              name={["communicationDetails", "email"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Website"
              name={["communicationDetails", "website"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={24} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item label="Notes" name="notes">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row align="center">
          <Col>
            <Button
              loading={
                (admin_request_type === "ADD_CRO_DETAILS" ||
                  admin_request_type === "EDIT_CRO_DETAILS") &&
                admin_loading
              }
              htmlType="submit"
              type="primary"
            >
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
export default connect(mapStateToProps, mapDispatchToProps)(AddCROData);
