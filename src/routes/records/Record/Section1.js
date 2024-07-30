import { Col, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";

function Section1(props) {
  const role = UserInfo.getRoles();
  const { auditDataRef, record, comments } = props;
  return (
    <>
      <Row gutter={20}>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Study Title"
                name="studyTitle"
                section="section1"
                {...props}
              />
            }
            name={["section1", "studyTitle"]}
          >
            <Input.TextArea disabled />
          </Form.Item>
        </Col>
        <Col lg={10} md={12} sm={24} xs={24}>
          <Form.Item
            name={["section1", "projectNo"]}
            label={
              <CustomLabel title="Project No" name="projectNo" {...props} />
            }
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col lg={4} md={12} sm={24} xs={24}>
          <Form.Item
            label={<CustomLabel title="Date" name="studyDate" {...props} />}
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
            name={["section1", "studyDate"]}
          >
            <DatePicker
              maxDate={dayjs()}
              onChange={(e) =>
                (auditDataRef.current = [
                  ...auditDataRef?.current?.filter(
                    (val) => val.fControlName !== "studyDate"
                  ),
                  {
                    id: 1,
                    sectionName: "Study Data",
                    labelName: "Study Date",
                    fieldName: "studyDate",
                    oldValue: record?.section1?.studyDate,
                    newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                    comment: comments?.section1?.studyDate,
                  },
                ])
              }
              style={{ width: "100%" }}
              format={"DD-MM-YYYY"}
              disabled={role === "ROLE_REVIEWER" || role === "ROLE_PI"}
            />
          </Form.Item>
        </Col>
        <Col lg={10} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel title="Site ID / Name" name="siteId" {...props} />
            }
            name={["section1", "siteId"]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
export default Section1;
