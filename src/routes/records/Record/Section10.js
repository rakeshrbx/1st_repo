import { Col, Form, Input, Radio, Row, Space } from "antd";
import { useEffect, useState } from "react";
import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";

const fields = {
  screeningQuestion: [
    { label: "Part of Screening", value: "Part of Screening" },
    {
      label: "Incidental",
      value: "Incidental",
    },
    {
      label: "Symptoms Work-up",
      value: "Symptoms Work-up",
    },
    { label: "Unknown", value: "Unknown" },

    {
      label: "If Others, Pls Specify",
      value: "If Others, Pls Specify",
    },
  ],
  methodOfScreening: [
    {
      label: "CT (Computed Tomography)",
      value: "CT (Computed Tomography)",
    },
    {
      label: "MRI (Magnetic Resonance Imaging)",
      value: "MRI (Magnetic Resonance Imaging)",
    },
    { label: "US (Ultra-Sound)", value: "US (Ultra-Sound)" },
    {
      label: "AFP (Alpha-fetoprotein)",
      value: "AFP (Alpha-fetoprotein)",
    },
    { label: "Unknown", value: "Unknown" },
    {
      label: "If Others, Pls Specify",
      value: "If Others, Pls Specify",
    },
  ],
};

function Section10(props) {
  const [{ isHCCDiagnosisOpen, isMethodOpen }, setState] = useState({
    isHCCDiagnosisOpen: true,
    isMethodOpen: true,
  });
  const form = props?.form;
  const role = UserInfo.getRoles();

  const { record } = props;
  useEffect(() => {
    setState((val) => ({
      ...val,
      isHCCDiagnosisOpen:
        record?.section10?.screeningQuestion !== "If Others, Pls Specify",
      isMethodOpen:
        record?.section10?.methodOfScreening !== "If Others, Pls Specify",
    }));
  }, [record]);

  return (
    <>
      <Row gutter={20}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="How was the HCC Diagnosed?"
                name="screeningQuestion"
                section="section10"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section10", "screeningQuestion"]}
          >
            <Radio.Group
              onChange={(e) => {
                const truth = e.target.value === "If Others, Pls Specify";
                setState((val) => ({ ...val, isHCCDiagnosisOpen: !truth }));
                !truth &&
                  form.setFieldsValue({
                    section10: {
                      screeningQuestionNa: null,
                    },
                  });
              }}
            >
              <Space direction="vertical">
                {fields?.screeningQuestion.map((val) => (
                  <Radio value={val.value}>{val.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label=" "
            name={["section10", "screeningQuestionNa"]}
            rules={[
              {
                required: !isHCCDiagnosisOpen,
                message: "required",
              },
            ]}
          >
            <Input.TextArea
              disabled={
                isHCCDiagnosisOpen ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
            />
          </Form.Item>
        </Col>

        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Any Method of Screening Found within 2 Years Before HCC diagnosis?"
                name="screening2Years"
                section="section10"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section10", "screening2Years"]}
          >
            <Radio.Group
              options={[
                {
                  label: "Yes",
                  value: "Yes",
                },
                { label: "No", value: "No" },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Any Method of Screening Found within 1 Year Before HCC diagnosis?"
                name="screening1Year"
                section="section10"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section10", "screening1Year"]}
          >
            <Radio.Group
              options={[
                {
                  label: "Yes",
                  value: "Yes",
                },
                { label: "No", value: "No" },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Method Of Screening ?"
                name="methodOfScreening"
                section="section10"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section10", "methodOfScreening"]}
          >
            <Radio.Group
              onChange={(e) => {
                const truth = e.target.value === "If Others, Pls Specify";
                setState((val) => ({ ...val, isMethodOpen: !truth }));
                !truth &&
                  form.setFieldsValue({
                    section10: {
                      methodOfScreeningTxt: null,
                    },
                  });
              }}
            >
              <Space direction="vertical">
                {fields?.methodOfScreening.map((val) => (
                  <Radio value={val.value}>{val.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label=" "
            name={["section10", "methodOfScreeningTxt"]}
            rules={[
              {
                required: !isMethodOpen,
                message: "required",
              },
            ]}
          >
            <Input.TextArea
              disabled={
                isMethodOpen || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
export default Section10;
