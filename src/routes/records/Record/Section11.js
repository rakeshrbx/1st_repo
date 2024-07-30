import { Checkbox, Col, Form, Input, Radio, Row, Space } from "antd";
import { useEffect, useState } from "react";
import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";
const data = {
  historyHIV: "",
  yearOfHIVHCC: "",
  dateOfHIVDurationFrom: "",
  hivRNAHCC: "",
  belowRadioHCC: "",
  hivCD4: "",
  hivCD4Nav: "",
  hivAbsoluteCD4: "",
  hivAbsoluteCD4Nav: "",
  hivCD4CellCount: "",
  hivCD4CellCountNav: "",
  hivInitialHIV1: "",
  hivInitialHIV1Nav: "",
  maximumHIVRNA: "",
  maximumHIVRNANav: "",
};
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
      label: "Other, If Others, Pls Specify",
      value: "Other, If Others, Pls Specify",
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
      label: "Other, If Others, Pls Specify",
      value: "Other, If Others, Pls Specify",
    },
  ],
};

function Section11(props) {
  const [
    {
      historyHIV,
      hivAbsoluteCD4Nav,
      hivCD4CellCountNav,
      maximumHIVRNANav,
      hivInitialHIV1Nav,
      hivCD4Nav,
      belowRadioHCC,
    },
    setState,
  ] = useState({
    historyHIV: false,
    hivCD4CellCountNav: false,
    maximumHIVRNANav: false,
    hivInitialHIV1Nav: false,
    hivCD4Nav: false,
    hivAbsoluteCD4Nav: false,
    belowRadioHCC: false,
  });
  const form = props?.form;
  const role = UserInfo.getRoles();

  const { isHIVChecked, record } = props;

  const handleNumbers = (e) => {
    if (!/\d/.test(e.key) && e.key != "Backspace") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!isHIVChecked) {
      setState((val) => ({
        ...val,
        historyHIV: false,
        hivCD4CellCountNav: false,
        maximumHIVRNANav: false,
        hivInitialHIV1Nav: false,
        hivCD4Nav: false,
        hivAbsoluteCD4Nav: false,
        belowRadioHCC: false,
      }));
    }
  }, [isHIVChecked]);

  useEffect(() => {
    setState((val) => ({
      ...val,
      historyHIV: record?.section11?.historyHIV === "Yes",
      hivCD4CellCountNav: record?.section11?.hivCD4CellCountNav?.[0] === "NAV",
      maximumHIVRNANav: record?.section11?.maximumHIVRNANav?.[0] === "NAV",
      hivInitialHIV1Nav: record?.section11?.hivInitialHIV1Nav?.[0] === "NAV",
      hivCD4Nav: record?.section11?.hivCD4Nav?.[0] === "NAV",
      hivAbsoluteCD4Nav: record?.section11?.hivAbsoluteCD4Nav?.[0] === "NAV",
      belowRadioHCC:
        record?.section11?.belowRadioHCC?.[0] ===
        "Below Lower Limit of Detection",
    }));
  }, [record]);

  return (
    <>
      <Row gutter={20}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="History of HIV  (If yes, complete the below details)"
                name="historyHIV"
                section="section11"
                {...props}
              />
            }
            rules={[
              {
                required: isHIVChecked,
                message: "required",
              },
            ]}
            name={["section11", "historyHIV"]}
          >
            <Radio.Group
              disabled={
                !isHIVChecked || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
              onChange={(e) => {
                setState((val) => ({
                  ...val,
                  historyHIV: e.target.value === "Yes",
                }));
                form.setFieldsValue({
                  section11: {
                    yearOfHIVHCC: null,
                    dateOfHIVDurationFrom: null,
                  },
                });
              }}
              options={[
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={4} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Year of HIV Diagnosis"
                name="yearOfHIVHCC"
                section="section11"
                {...props}
              />
            }
            rules={[
              {
                required: isHIVChecked && historyHIV,
                message: "required",
              },
            ]}
            name={["section11", "yearOfHIVHCC"]}
          >
            <Input
              onKeyDown={handleNumbers}
              maxLength={4}
              disabled={
                !isHIVChecked ||
                !historyHIV ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
            />
          </Form.Item>
        </Col>

        <Col lg={20} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Duration of HIV(years) (From year of diagnosis of HIV to year of diagnosis of HCC)"
                name="dateOfHIVDurationFrom"
                section="section11"
                {...props}
              />
            }
            rules={[
              {
                required: isHIVChecked && historyHIV,
                message: "required",
              },
            ]}
            name={["section11", "dateOfHIVDurationFrom"]}
          >
            <Input
              disabled={
                !isHIVChecked ||
                !historyHIV ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
              onKeyDown={handleNumbers}
              maxLength={3}
              style={{ width: "160px" }}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="HIV RNA Level (most recent) (copies/mL)"
                name="hivRNAHCC"
                section="section11"
                {...props}
              />
            }
            rules={[
              {
                required: isHIVChecked,
                message: "required",
              },
            ]}
            name={["section11", "hivRNAHCC"]}
          >
            <Input
              disabled={
                !isHIVChecked || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
              onKeyDown={handleNumbers}
              maxLength={10}
              style={{ width: "160px" }}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="If HIV RNA level is below lower limit of detection, (Fill the following)"
                name="belowRadioHCC"
                section="section11"
                {...props}
              />
            }
          >
            <Form.Item noStyle name={["section11", "belowRadioHCC"]}>
              <Checkbox.Group
                disabled={
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onChange={(e) => {
                  const truth = e?.[0] === "Below Lower Limit of Detection";
                  setState((val) => ({
                    ...val,
                    belowRadioHCC: e?.[0] === "Below Lower Limit of Detection",
                  }));
                  if (!truth) {
                    setState((val) => ({
                      ...val,
                      hivCD4Nav: false,
                      hivCD4CellCountNav: false,
                      maximumHIVRNANav: false,
                      hivInitialHIV1Nav: false,
                      hivCD4Nav: false,
                      hivAbsoluteCD4Nav: false,
                    }));
                    form.setFieldsValue({
                      section11: {
                        hivCD4: null,
                        hivCD4Nav: null,
                        hivAbsoluteCD4: null,
                        hivAbsoluteCD4Nav: null,
                        hivCD4CellCount: null,
                        hivCD4CellCountNav: null,
                        hivInitialHIV1: null,
                        hivInitialHIV1Nav: null,
                        maximumHIVRNA: null,
                        maximumHIVRNANav: null,
                      },
                    });
                  }
                }}
                options={[
                  {
                    label: "Below Lower Limit of Detection",
                    value: "Below Lower Limit of Detection",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item noStyle name={["section11", "hivRNALevel"]}>
              <Input
                onKeyDown={handleNumbers}
                maxLength={10}
                style={{ width: "160px" }}
                disabled={
                  !isHIVChecked ||
                  !belowRadioHCC ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          {/* <Form.Item
            label={
              <CustomLabel
                title="CD4 (%) (Clusters of differentiation 4)"
                name="hivCD4"
                section="section11"
                {...props}
              />
            }
          > */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Form.Item
              label={
                <CustomLabel
                  title="CD4 (%) (Clusters of differentiation 4)"
                  name="hivCD4"
                  section="section11"
                  {...props}
                />
              }
              rules={[
                {
                  required: !hivCD4Nav && isHIVChecked && belowRadioHCC,
                  message: "required",
                },
              ]}
              name={["section11", "hivCD4"]}
            >
              <Input
                disabled={
                  hivCD4Nav ||
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onKeyDown={handleNumbers}
                maxLength={4}
                style={{ width: "160px", marginRight: "32px" }}
              />
            </Form.Item>
            <Form.Item noStyle name={["section11", "hivCD4Nav"]}>
              <Checkbox.Group
                disabled={
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onChange={(e) => {
                  setState((val) => ({
                    ...val,
                    hivCD4Nav: e?.[0] === "NAV",
                  }));
                  form.setFieldsValue({
                    section11: {
                      hivCD4: null,
                    },
                  });
                }}
                options={[
                  {
                    label: "NAV",
                    value: "NAV",
                  },
                ]}
              />
            </Form.Item>
          </div>

          {/* </Form.Item> */}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={8} md={12} sm={24} xs={24}>
          {/* <Form.Item
            label={
              <CustomLabel
                title="Absolute CD4 (cells/uL)"
                name="hivAbsoluteCD4"
                section="section11"
                {...props}
              />
            }
            rules={[
              {
                required: !hivAbsoluteCD4Nav,
                message: "required",
              },
            ]}
          > */}
          <Space>
            <Form.Item
              label={
                <CustomLabel
                  title="Absolute CD4 (cells/uL)"
                  name="hivAbsoluteCD4"
                  section="section11"
                  {...props}
                />
              }
              rules={[
                {
                  required: !hivAbsoluteCD4Nav && isHIVChecked && belowRadioHCC,
                  message: "required",
                },
              ]}
              name={["section11", "hivAbsoluteCD4"]}
            >
              <Input
                disabled={
                  hivAbsoluteCD4Nav ||
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onKeyDown={handleNumbers}
                maxLength={4}
                style={{ width: "160px", marginRight: "20px" }}
              />
            </Form.Item>
            <Form.Item noStyle name={["section11", "hivAbsoluteCD4Nav"]}>
              <Checkbox.Group
                disabled={
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onChange={(e) => {
                  setState((val) => ({
                    ...val,
                    hivAbsoluteCD4Nav: e?.[0] === "NAV",
                  }));
                  form.setFieldsValue({
                    section11: {
                      hivAbsoluteCD4: null,
                    },
                  });
                }}
                options={[
                  {
                    label: "NAV",
                    value: "NAV",
                  },
                ]}
              />
            </Form.Item>
          </Space>

          {/* </Form.Item> */}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={8} md={12} sm={24} xs={24}>
          {/* <Form.Item
            label={
              <CustomLabel
                title="CD4 Cell Count Nadir (if known)"
                name="hivCD4CellCount"
                section="section11"
                {...props}
              />
            }
            rules={[
              {
                required: !hivCD4CellCountNav,
                message: "required",
              },
            ]}
          > */}
          <Space>
            <Form.Item
              label={
                <CustomLabel
                  title="CD4 Cell Count Nadir (if known)"
                  name="hivCD4CellCount"
                  section="section11"
                  {...props}
                />
              }
              rules={[
                {
                  required:
                    !hivCD4CellCountNav && isHIVChecked && belowRadioHCC,
                  message: "required",
                },
              ]}
              name={["section11", "hivCD4CellCount"]}
            >
              <Input
                disabled={
                  hivCD4CellCountNav ||
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onKeyDown={handleNumbers}
                maxLength={4}
                style={{ width: "160px", marginRight: "20px" }}
              />
            </Form.Item>
            <Form.Item noStyle name={["section11", "hivCD4CellCountNav"]}>
              <Checkbox.Group
                disabled={
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onChange={(e) => {
                  setState((val) => ({
                    ...val,
                    hivCD4CellCountNav: e?.[0] === "NAV",
                  }));
                  form.setFieldsValue({
                    section11: {
                      hivCD4CellCount: null,
                    },
                  });
                }}
                options={[
                  {
                    label: "NAV",
                    value: "NAV",
                  },
                ]}
              />
            </Form.Item>
          </Space>

          {/* </Form.Item> */}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={8} md={12} sm={24} xs={24}>
          {/* <Form.Item
            label={
              <CustomLabel
                title="Initial HIV-1 RNA Level (if known)"
                name="hivInitialHIV1"
                section="section11"
                {...props}
              />
            }
          > */}
          <Space>
            <Form.Item
              label={
                <CustomLabel
                  title="Initial HIV-1 RNA Level (if known)"
                  name="hivInitialHIV1"
                  section="section11"
                  {...props}
                />
              }
              rules={[
                {
                  required: !hivInitialHIV1Nav && isHIVChecked && belowRadioHCC,
                  message: "required",
                },
              ]}
              name={["section11", "hivInitialHIV1"]}
            >
              <Input
                disabled={
                  hivInitialHIV1Nav ||
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onKeyDown={handleNumbers}
                maxLength={10}
                style={{ width: "160px", marginRight: "20px" }}
              />
            </Form.Item>
            <Form.Item noStyle name={["section11", "hivInitialHIV1Nav"]}>
              <Checkbox.Group
                disabled={
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onChange={(e) => {
                  setState((val) => ({
                    ...val,
                    hivInitialHIV1Nav: e?.[0] === "NAV",
                  }));
                  form.setFieldsValue({
                    section11: {
                      hivInitialHIV1: null,
                    },
                  });
                }}
                options={[
                  {
                    label: "NAV",
                    value: "NAV",
                  },
                ]}
              />
            </Form.Item>
          </Space>
          {/* </Form.Item> */}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={8} md={24} sm={24} xs={24}>
          {/* <Form.Item
            label={
              <CustomLabel
                title="Maximum HIV-1 RNA Level (if known)"
                name="maximumHIVRNA"
                section="section11"
                {...props}
              />
            }
          > */}
          <Space>
            <Form.Item
              label={
                <CustomLabel
                  title="Maximum HIV-1 RNA Level (if known)"
                  name="maximumHIVRNA"
                  section="section11"
                  {...props}
                />
              }
              rules={[
                {
                  required: !maximumHIVRNANav && isHIVChecked && belowRadioHCC,
                  message: "required",
                },
              ]}
              name={["section11", "maximumHIVRNA"]}
            >
              <Input
                style={{ width: "160px", marginRight: "20px" }}
                disabled={
                  maximumHIVRNANav ||
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onKeyDown={handleNumbers}
                maxLength={10}
              />
            </Form.Item>
            <Form.Item noStyle name={["section11", "maximumHIVRNANav"]}>
              <Checkbox.Group
                disabled={
                  !belowRadioHCC ||
                  !isHIVChecked ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onChange={(e) => {
                  setState((val) => ({
                    ...val,
                    maximumHIVRNANav: e?.[0] === "NAV",
                  }));
                  form.setFieldsValue({
                    section11: {
                      hivInitialHIV1: null,
                    },
                  });
                }}
                options={[
                  {
                    label: "NAV",
                    value: "NAV",
                  },
                ]}
              />
            </Form.Item>
          </Space>
          {/* </Form.Item> */}
        </Col>
      </Row>
    </>
  );
}
export default Section11;
