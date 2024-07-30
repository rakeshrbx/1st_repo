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

const fields = {
  diagnosisInformationValue: [
    {
      label:
        "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)",
      value:
        "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)",
    },
    { label: "Other(specify)", value: "Other(specify)" },
    { label: "Imaging", value: "Imaging" },
    { label: "Unknown", value: "Unknown" },
  ],
};
function Section6(props) {
  const role = UserInfo.getRoles();

  const [
    {
      diagnosisValue,
      isTissueDateOpen,
      isImagingDateOpen,
      isOtherTextAreaOpen,
    },
    setState,
  ] = useState({
    diagnosisValue: null,
    isTissueDateOpen: null,
    isImagingDateOpen: null,
    isOtherTextAreaOpen: true,
  });
  const form = props?.form;
  const { record, auditDataRef, comments } = props;

  useEffect(() => {
    setState((val) => ({
      ...val,
      diagnosisValue: record?.section6?.diagnosisInformationValue,
      isTissueDateOpen:
        record?.section6?.hccDiagnosisTissueUnknown?.[0] === "Unknown",
      isImagingDateOpen:
        record?.section6?.hccDiagnosisImagingUnkown?.[0] === "Unknown",
      isOtherTextAreaOpen: record?.section6?.typeOfImagine !== "Other",
    }));
  }, [record]);

  return (
    <>
      <Row gutter={20}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Method of Diagnosis"
                name="diagnosisInformationValue"
                section="section6"
                {...props}
              />
            }
            name={["section6", "diagnosisInformationValue"]}
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
          >
            <Checkbox.Group
              onChange={(e) => {
                setState((val) => ({ ...val, diagnosisValue: e }));
                !e?.includes("Other(specify)") &&
                  form.setFieldsValue({
                    section6: {
                      hccDiagnosisInfoValueOtherSpecify: null,
                    },
                  });
                !e?.includes(
                  "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)"
                ) &&
                  form.setFieldsValue({
                    section6: {
                      hccDiagnosisTissueUnknown: null,
                      hccDiagnosisTissueDate: null,
                    },
                  });
                !e?.includes("Imaging") &&
                  form.setFieldsValue({
                    section6: {
                      hccDiagnosisImagingUnkown: null,
                      hccDiagnosisImagingDate: null,
                      typeOfImagine: null,
                    },
                  });
              }}
            >
              <Space direction="vertical">
                {fields?.diagnosisInformationValue.map((val) => (
                  <Checkbox value={val.value}>{val.label}</Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            name={["section6", "hccDiagnosisInfoValueOtherSpecify"]}
            style={{ marginTop: "30px" }}
            label=" "
            rules={[
              {
                required: diagnosisValue?.includes("Other(specify)"),
                message: "required",
              },
            ]}
          >
            <Input.TextArea
              disabled={
                !diagnosisValue?.includes("Other(specify)") ||
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
                title="Type of Imaging"
                name="typeOfImagine"
                section="section6"
                {...props}
              />
            }
            name={["section6", "typeOfImagine"]}
            rules={[
              {
                required: diagnosisValue?.includes("Imaging"),
                message: "required",
              },
            ]}
          >
            <Radio.Group
              disabled={
                !diagnosisValue?.includes("Imaging") ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
              onChange={(e) => {
                setState((val) => ({
                  ...val,
                  isOtherTextAreaOpen:
                    e.target.value === "Other" ? false : true,
                }));
                !e.target.value !== "Other" &&
                  form.setFieldsValue({
                    section6: {
                      typeOfImagineText: null,
                    },
                  });
              }}
              options={[
                { label: "MRI", value: "MRI" },
                { label: "CT", value: "CT" },
                { label: "US", value: "US" },
                { label: "Unknown", value: "Unknown" },
                { label: "Other", value: "Other" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Form.Item
            name={["section6", "typeOfImagineText"]}
            rules={[
              {
                required:
                  !isOtherTextAreaOpen && diagnosisValue?.includes("Imaging"),
                message: "required",
              },
            ]}
            label=" "
          >
            <Input.TextArea
              disabled={
                isOtherTextAreaOpen ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24} style={{ display: "flex" }}>
          <Space size="small">
            <Form.Item
              label={
                <CustomLabel
                  title="Date of Imaging(first) Found"
                  name="hccDiagnosisImagingDate"
                  section="section6"
                  {...props}
                />
              }
              rules={[
                {
                  required:
                    diagnosisValue?.includes("Imaging") && !isImagingDateOpen,
                  message: "required",
                },
              ]}
              style={{ width: "220px" }}
              name={["section6", "hccDiagnosisImagingDate"]}
            >
              <DatePicker
                onChange={(e) =>
                  (auditDataRef.current = [
                    ...auditDataRef?.current?.filter(
                      (val) => val.fControlName !== "hccDiagnosisImagingDate"
                    ),
                    {
                      id: 6,
                      sectionName: "HCC Diagnosis Information",
                      labelName: "Date of Imaging(first) Found",
                      fieldName: "hccDiagnosisImagingDate",
                      oldValue: record?.section6?.hccDiagnosisImagingDate || "",
                      newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                      comment: comments?.section6?.hccDiagnosisImagingDate,
                    },
                  ])
                }
                format={"DD-MM-YYYY"}
                disabled={
                  isImagingDateOpen ||
                  !diagnosisValue?.includes("Imaging") ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
              />
            </Form.Item>
            <Form.Item noStyle name={["section6", "hccDiagnosisImagingUnkown"]}>
              <Checkbox.Group
                disabled={
                  !diagnosisValue?.includes("Imaging") ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onChange={(e) => {
                  const truth = e?.[0] === "Unknown";
                  if (e?.[0] === "Unknown") {
                    form.setFieldsValue({
                      section6: {
                        hccDiagnosisImagingDate: null,
                      },
                    });
                  }
                  setState((val) => ({
                    ...val,
                    isImagingDateOpen: truth,
                  }));
                }}
                options={[{ label: "Unknown", value: "Unknown" }]}
              />
            </Form.Item>
          </Space>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24} style={{ display: "flex" }}>
          <Space>
            <Form.Item
              label={
                <CustomLabel
                  title="Date of Tissue Diagnosis"
                  name="hccDiagnosisTissueDate"
                  section="section6"
                  {...props}
                />
              }
              name={["section6", "hccDiagnosisTissueDate"]}
              rules={[
                {
                  required:
                    !isTissueDateOpen &&
                    diagnosisValue?.includes(
                      "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)"
                    ),
                  message: "required",
                },
              ]}
              style={{ width: "210px" }}
            >
              <DatePicker
                format={"DD-MM-YYYY"}
                onChange={(e) =>
                  (auditDataRef.current = [
                    ...auditDataRef?.current?.filter(
                      (val) => val.fControlName !== "hccDiagnosisTissueDate"
                    ),
                    {
                      id: 6,
                      sectionName: "HCC Diagnosis Information",
                      labelName: "Date of Tissue Diagnosis",
                      fieldName: "hccDiagnosisTissueDate",
                      oldValue: record?.section6?.hccDiagnosisTissueDate || "",
                      newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                      comment: comments?.section6?.hccDiagnosisTissueDate,
                    },
                  ])
                }
                disabled={
                  isTissueDateOpen ||
                  !diagnosisValue?.includes(
                    "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)"
                  ) ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
              />
            </Form.Item>
            <Form.Item noStyle name={["section6", "hccDiagnosisTissueUnknown"]}>
              <Checkbox.Group
                disabled={
                  !diagnosisValue?.includes(
                    "Biopsy(any tissue diagnosis including(fine needle aspiration) FNA)"
                  ) ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                onChange={(e) => {
                  const truth = e?.[0] === "Unknown";
                  if (e?.[0] === "Unknown") {
                    form.setFieldsValue({
                      section6: {
                        hccDiagnosisTissueDate: null,
                      },
                    });
                  }
                  setState((val) => ({
                    ...val,
                    isTissueDateOpen: truth,
                  }));
                }}
                options={[{ label: "Unknown", value: "Unknown" }]}
              />
            </Form.Item>
          </Space>
        </Col>
      </Row>
    </>
  );
}
export default Section6;
