import { Checkbox, Col, Form, Input, Radio, Row, Space } from "antd";
import { useEffect, useState } from "react";
import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";

function Section2(props) {
  const [{ isDOBopen, isEthnicityTextBoxOpen }, setState] = useState({
    isDOBopen: false,
    isEthnicityTextBoxOpen: null,
  });
  const role = UserInfo.getRoles();

  const { record } = props;

  useEffect(() => {
    setState((val) => ({
      ...val,
      isDOBopen: record?.section2?.subjectUnknown?.[0] === "Unknown",
      isEthnicityTextBoxOpen:
        record?.section2?.otherCheck === "Others" ? true : false,
    }));
  }, [record]);

  const form = props?.form;
  const handleNumbers = (e) => {
    if (!/\d/.test(e.key) && e.key != "Backspace") {
      e.preventDefault();
    }
  };
  return (
    <>
      <Row gutter={20}>
        <Col lg={6} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Subject ID"
                name="subjectId"
                section="section2"
                {...props}
              />
            }
            name="subjectId"
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Subject Counter"
                name="subjectCounter"
                section="section2"
                {...props}
              />
            }
            name={["section2", "subjectCounter"]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col lg={7} md={12} sm={24} xs={24}>
          {/* <Form.Item
            label={
              <CustomLabel
                title="Year Of Birth (If Available)"
                name="subjectYear"
                section="section2"
                {...props}
              />
            }
          > */}
          <Space size={"small"}>
            <Form.Item
              name={["section2", "subjectYear"]}
              rules={[
                {
                  required: !isDOBopen,
                  message: "required",
                },
              ]}
              label={
                <CustomLabel
                  title="Year Of Birth (If Available)"
                  name="subjectYear"
                  section="section2"
                  {...props}
                />
              }
            >
              <Input
                placeholder="YYYY"
                style={{ width: "200px" }}
                disabled={
                  isDOBopen || role === "ROLE_REVIEWER" || role === "ROLE_PI"
                }
                maxLength={4}
                onKeyDown={handleNumbers}
              />
            </Form.Item>
            <Form.Item name={["section2", "subjectUnknown"]} label=" ">
              <Checkbox.Group
                style={{ marginLeft: "20px" }}
                onChange={(e) => {
                  setState((val) => ({
                    ...val,
                    isDOBopen: e?.[0] === "Unknown",
                  }));
                  form.setFieldsValue({
                    section2: {
                      subjectYear: null,
                    },
                  });
                }}
                options={[{ label: "Unknown", value: "Unknown" }]}
              />
            </Form.Item>
          </Space>
          {/* </Form.Item> */}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Patient Sex"
                name="subjectGender"
                section="section2"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section2", "subjectGender"]}
          >
            <Radio.Group
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Ethnicity"
                name="otherCheck"
                section="section2"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section2", "otherCheck"]}
          >
            <Radio.Group
              onChange={(e) => {
                setState((val) => ({
                  ...val,
                  isEthnicityTextBoxOpen:
                    e.target.value === "Others" ? true : false,
                }));
                e.target.value !== "Others" &&
                  form.setFieldsValue({
                    section2: {
                      subjectOtherText: null,
                    },
                  });
              }}
              options={[
                { label: "Mexican", value: "Mexican" },
                { label: "Others", value: "Others" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            name={["section2", "subjectOtherText"]}
            label=" "
            rules={[
              {
                required: isEthnicityTextBoxOpen,
                message: "required",
              },
            ]}
          >
            <Input.TextArea
              disabled={
                !isEthnicityTextBoxOpen ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Place Of Birth (City)"
                name="placeOfBirthCity"
                section="section2"
                rules={[
                  {
                    required: true,
                    message: "required",
                  },
                ]}
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section2", "placeOfBirthCity"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Place Of Birth (State)"
                name="placeOfBirthState"
                section="section2"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section2", "placeOfBirthState"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Residence City"
                name="residencyCity"
                section="section2"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section2", "residencyCity"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Residence State"
                name="residencyState"
                section="section2"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section2", "residencyState"]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
export default Section2;
