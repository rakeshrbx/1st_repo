import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";

function Section3(props) {
  const role = UserInfo.getRoles();

  const [{ isOtherInsuranceTextAreaOpen, dateOfHcc }, setState] = useState({
    isOtherInsuranceTextAreaOpen: false,
    dateOfHcc: false,
  });
  const { record } = props;
  const { auditDataRef, comments } = props;
  useEffect(() => {
    setState((val) => ({
      ...val,
      dateOfHcc: record?.section3?.baseLineIfDateRadio?.[0] === "Not Known",
      isOtherInsuranceTextAreaOpen:
        record?.section3?.insuranceValue === "Other",
    }));
  }, [record]);

  const handleNumbers = (e) => {
    if (!/\d/.test(e.key) && e.key != "Backspace") {
      e.preventDefault();
    }
  };

  const handleDecimals = (e) => {
    if (
      !/^(\d+)?([.]?\d{0,1})?$/.test(e.target.value + e.key) &&
      e.key != "Backspace"
    ) {
      e.preventDefault();
    }
  };

  const form = props?.form;
  const calculateBMI = () => {
    const { baseLineHeight, weightHggBaseLine } =
      form.getFieldsValue()?.section3;
    if (baseLineHeight && weightHggBaseLine) {
      const heightInMeters = baseLineHeight / 100;
      const bmiValue = (
        weightHggBaseLine /
        (heightInMeters * heightInMeters)
      ).toFixed(2);
      form.setFieldsValue({
        section3: {
          bmiBaseLine: bmiValue,
        },
      });
    } else {
      form.setFieldsValue({
        section3: {
          bmiBaseLine: "",
        },
      });
    }
  };
  return (
    <>
      <Row gutter={20} align={"bottom"}>
        <Col lg={8} md={24} sm={24} xs={24}>
          {/* <Form.Item
            label={
              <CustomLabel
                title="Date Of HCC Diagnosis"
                name="dateOfHcc"
                section="section3"
                {...props}
              />
            }
            rules={[
              {
                required: true,
              },
            ]}
          > */}
          <Space size={"small"}>
            <Form.Item
              label={
                <CustomLabel
                  title="Date Of HCC Diagnosis"
                  name="dateOfHcc"
                  section="section3"
                  {...props}
                />
              }
              rules={[
                {
                  required: !dateOfHcc,
                  message: "required",
                },
              ]}
              style={{ width: "180px" }}
              name={["section3", "dateOfHcc"]}
            >
              <DatePicker
                onChange={(e) =>
                  (auditDataRef.current = [
                    ...auditDataRef?.current?.filter(
                      (val) => val.fControlName !== "dateOfHcc"
                    ),
                    {
                      id: 3,
                      sectionName: "Baseline Characteristics",
                      labelName: "Date Of HCC Diagnosis",
                      fieldName: "dateOfHcc",
                      oldValue: record?.section3?.dateOfHcc,
                      newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                      comment: comments?.section3?.dateOfHcc,
                    },
                  ])
                }
                format={"DD-MM-YYYY"}
                disabled={
                  dateOfHcc || role === "ROLE_REVIEWER" || role === "ROLE_PI"
                }
              />
            </Form.Item>
            <Form.Item label=" " name={["section3", "baseLineIfDateRadio"]}>
              <Checkbox.Group
                // style={{ marginLeft: "20px" }}
                onChange={(e) => {
                  setState((val) => ({
                    ...val,
                    dateOfHcc: e?.[0] === "Not Known",
                  }));
                  e?.[0] === "Not Known" &&
                    form.setFieldsValue({
                      section3: {
                        dateOfHcc: null,
                      },
                    });
                }}
                options={[{ label: "Not Known", value: "Not Known" }]}
              />
            </Form.Item>
          </Space>
          {/* </Form.Item> */}
        </Col>

        <Col lg={8} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="If date not available, mention the approximate year"
                name="baseLineIfDate"
                section="section3"
                {...props}
              />
            }
            rules={[
              {
                required: dateOfHcc,
                message: "required",
              },
            ]}
            name={["section3", "baseLineIfDate"]}
          >
            <Input
              disabled={!dateOfHcc}
              style={{ width: "120px" }}
              placeholder="YYYY"
              maxLength={4}
              onKeyDown={handleNumbers}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Age of HCC Diagnosis"
                name="baseLineAgeOfHcc"
                section="section3"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section3", "baseLineAgeOfHcc"]}
          >
            <Input
              style={{ width: "160px" }}
              maxLength={3}
              onKeyDown={handleNumbers}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20} align={"bottom"}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Height (in cm)"
                name="baseLineHeight"
                section="section3"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            style={{ width: "160px" }}
            name={["section3", "baseLineHeight"]}
          >
            <Input
              maxLength={5}
              onKeyDown={handleDecimals}
              onChange={calculateBMI}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Weight in KG (closest to the date of HCC diagnosis)"
                name="weightHggBaseLine"
                section="section3"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section3", "weightHggBaseLine"]}
          >
            <Input
              style={{ width: "160px" }}
              maxLength={5}
              onKeyDown={handleDecimals}
              onChange={calculateBMI}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="BMI in kg/m2"
                name="bmiBaseLine"
                section="section3"
                {...props}
              />
            }
            name={["section3", "bmiBaseLine"]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Type of Insurance"
                name="insuranceValue"
                section="section3"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section3", "insuranceValue"]}
          >
            <Radio.Group
              onChange={(e) => {
                setState((val) => ({
                  ...val,
                  isOtherInsuranceTextAreaOpen:
                    e.target.value === "Other" ? true : false,
                }));
                e.target.value !== "Other" &&
                  form.setFieldsValue({
                    section3: {
                      insuraceValueOtherBaseline: null,
                    },
                  });
              }}
              options={[
                { label: "Private", value: "Private" },
                { label: "Public", value: "Public" },
                { label: "Other", value: "Other" },
              ]}
            />
          </Form.Item>
        </Col>
        {/* {isOtherInsuranceTextAreaOpen && ( */}
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label=" "
            name={["section3", "insuraceValueOtherBaseline"]}
            rules={[
              {
                required: isOtherInsuranceTextAreaOpen,
                message: "required",
              },
            ]}
          >
            <Input.TextArea
              disabled={
                !isOtherInsuranceTextAreaOpen ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
            />
          </Form.Item>
        </Col>
        {/* )} */}
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Insurance Details"
                name="insuraceDetailsBaseLine"
                section="section3"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section3", "insuraceDetailsBaseLine"]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
export default Section3;
