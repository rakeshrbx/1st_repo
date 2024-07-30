import { Button, Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { connect } from "react-redux";
import UserInfo from "../../../helpers/user_info";
import { manageAdminRequest } from "../../../redux/actions";

function AddStudyData(props) {
  const [form] = Form.useForm();

  const { getFieldsValue, setFieldsValue, getFieldValue, resetFields } = form;
  const { manageAdminRequest, admin_reducer, toggleModal, editDetails } = props;

  const {
    admin_loading,
    admin_success,
    admin_request_type,
    cro_drop_down_list,
    sponsor_drop_down_list,
  } = admin_reducer;

  function submitStudyDetails(data) {
    const username = UserInfo.getUser();
    if (!data?.id) {
      manageAdminRequest({
        request_type: "ADD_STUDY_DETAILS",
        ...data,
        createdBy: username,
        createdOn: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    } else {
      manageAdminRequest({
        request_type: "EDIT_STUDY_DETAILS",
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
      defaultStudyDesign: editDetails?.defaultStudyDesign,
    });
    return () => resetFields();
  }, [editDetails, resetFields, setFieldsValue]);

  useEffect(() => {
    manageAdminRequest({ request_type: "GET_CRO_DROP_DOWN", payload: {} });
  }, [manageAdminRequest]);
  useEffect(() => {
    manageAdminRequest({ request_type: "GET_SPONSOR_DROP_DOWN", payload: {} });
  }, [manageAdminRequest]);

  useEffect(() => {
    if (
      admin_request_type === "ADD_STUDY_DETAILS" ||
      admin_request_type === "EDIT_STUDY_DETAILS"
    ) {
      if (admin_success) {
        resetFields();
      }
    }
  }, [resetFields, admin_request_type, admin_loading, admin_success]);
  return (
    <Card title="Add Study Details">
      <Form form={form} labelCol={{ span: 24 }} onFinish={submitStudyDetails}>
        <Row gutter={20}>
          <Col lg={8} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              name="studyId"
              label="Study ID"
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
              label="Sponsor Name"
              name="sponsorName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={sponsor_drop_down_list?.map((val, idx) => ({
                  ...val,
                  key: idx,
                  label: val.sponsorName,
                  value: val.sponsorName,
                }))}
              />
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
              <Select
                options={cro_drop_down_list?.map((val, idx) => ({
                  ...val,
                  key: idx,
                  label: val.croName,
                  value: val.croName,
                }))}
              />
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item label="Regulatory Agency" name="regulatoryAgency">
              <Input />
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item
              label="Study Title"
              name="studyTitle"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item label="Study Design" name="studyDesign">
              <Input />
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item label="Phase" name="phase">
              <Select
                options={[
                  { label: "Phase I", value: "Phase I" },
                  { label: "Phase II", value: "Phase II" },
                  { label: "Phase III", value: "Phase III" },
                  { label: "Phase IV", value: "Phase IV" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24} className="gutter-row">
            <Form.Item label=" " name="defaultStudyDesign">
              <Checkbox
                defaultChecked={
                  editDetails?.defaultStudyDesign === "default"
                    ? "default"
                    : null
                }
                onChange={(e) =>
                  form.setFieldsValue({
                    defaultStudyDesign: e.target.checked ? "default" : null,
                  })
                }
              >
                Default
              </Checkbox>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddStudyData);
