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
  hccOutcomeValue: [
    { label: "Resection", value: "Resection" },
    {
      label: "Liver Transplantation",
      value: "Liver Transplantation",
    },
    {
      label: "Catheter Delivered Therapy (y90, TACE, Radioembolization,etc)",
      value: "Catheter Delivered Therapy (y90, TACE, Radioembolization,etc)",
    },
    { label: "Sorafenib", value: "Sorafenib" },

    { label: "Radiation(SBRT)", value: "Radiation(SBRT)" },

    { label: "RFA Ablation", value: "RFA Ablation" },

    {
      label: "Palliative/Hospice care",
      value: "Palliative/Hospice care",
    },
    {
      label: "Other (specify in freetext)",
      value: "Other (specify in freetext)",
    },

    {
      label: "None (if patient was too sick, refused treatment,etc.)",
      value: "None (if patient was too sick, refused treatment,etc.)",
    },

    {
      label:
        "Unknown (if patient was lost to follow-up or information not available in the chart)",
      value:
        "Unknown (if patient was lost to follow-up or information not available in the chart)",
    },
    { label: "Microwave ablation", value: "Microwave ablation" },
  ],
  resectionPerformed: [
    {
      label: "None/F0",
      value: "None/F0",
    },
    { label: "Mild/Stage 1/F1", value: "Mild/Stage 1/F1" },
    { label: "Moderate/Stage 2/F2", value: "Moderate/Stage 2/F2" },
    {
      label: "Brdiging fibrosis/stage 3/F3",
      value: "Brdiging fibrosis/stage 3/F3",
    },
    { label: "Cirrhosis/Stage 4/F4", value: "Cirrhosis/Stage 4/F4" },
    { label: "Unknown", value: "Unknown" },
  ],
  recurrenceValue: [
    {
      label: "Yes Once",
      value: "Yes Once",
    },
    { label: "Yes More Than Once", value: "Yes More Than Once" },
    { label: "No", value: "No" },
    {
      label: "Unknown/Patient Not cured",
      value: "Unknown/Patient Not cured",
    },
  ],
};

function Section9(props) {
  const role = UserInfo.getRoles();

  const [
    {
      treatmentList,
      isDeathDateOpen,
      isRecurrenceDateOpen,
      isDeathDateOpen2,
      isAliveDateOpen,
    },
    setState,
  ] = useState({
    treatmentList: [],
    isDeathDateOpen: false,
    isRecurrenceDateOpen: false,
    isDeathDateOpen2: false,
    isAliveDateOpen: false,
  });
  const form = props?.form;
  const { record, auditDataRef, comments } = props;
  useEffect(() => {
    setState((val) => ({
      ...val,
      treatmentList: record?.section9?.hccOutcomeValue,
      isDeathDateOpen: record?.section9?.survivalStatusValue === "Deceased",
      isRecurrenceDateOpen:
        record?.section9?.recurrenceValue === "Yes Once" ||
        record?.section9?.recurrenceValue === "Yes More Than Once",
      isDeathDateOpen2: record?.section9?.dateOfDeathUnknown?.[0] === "Unknown",
      isAliveDateOpen: record?.section9?.lastContactUnknown?.[0] === "Unknown",
    }));
  }, [record]);
  const handleNumbers = (e) => {
    if (!/\d/.test(e.key) && e.key != "Backspace") {
      e.preventDefault();
    }
  };
  return (
    <>
      <Row gutter={20}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Treatment Modalities"
                name="hccOutcomeValue"
                section="section9"
                {...props}
              />
            }
            rules={[
              {
                required: true,
              },
            ]}
            name={["section9", "hccOutcomeValue"]}
          >
            <Checkbox.Group
              onChange={(e) => {
                setState((val) => ({ ...val, treatmentList: e }));
                !e?.includes("Resection") &&
                  form.setFieldsValue({
                    section9: {
                      resectionPerformed: null,
                    },
                  });
                !e?.includes("Liver Transplantation") &&
                  form.setFieldsValue({
                    section9: {
                      liverTransplantValue: null,
                    },
                  });
                !e?.includes("Other (specify in freetext)") &&
                  form.setFieldsValue({
                    section9: {
                      treamentModalitiesHCC: null,
                    },
                  });
              }}
            >
              <Space direction="vertical">
                {fields?.hccOutcomeValue.map((val) => (
                  <Checkbox value={val.value}>{val.label}</Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Treatment Modalities Explanation(free text)"
                name="treamentModalitiesHCC"
                section="section9"
                {...props}
              />
            }
            rules={[
              {
                required: treatmentList?.includes(
                  "Other (specify in freetext)"
                ),
                message: "required",
              },
            ]}
            name={["section9", "treamentModalitiesHCC"]}
          >
            <Input.TextArea
              disabled={
                !treatmentList?.includes("Other (specify in freetext)") ||
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
                title="Stage of Fibrosis in Background Liver: (If resection was performed)"
                name="resectionPerformed"
                section="section9"
                {...props}
              />
            }
            rules={[
              {
                required: treatmentList?.includes("Resection"),
                message: "required",
              },
            ]}
            name={["section9", "resectionPerformed"]}
          >
            <Radio.Group
              disabled={
                !treatmentList?.includes("Resection") ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
            >
              <Space direction="vertical">
                {fields?.resectionPerformed.map((val) => (
                  <Radio value={val.value}>{val.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Stage of Fibrosis in Explanted Liver: (If liver transplant was performed)"
                name="liverTransplantValue"
                section="section9"
                {...props}
              />
            }
            rules={[
              {
                required: treatmentList?.includes("Liver Transplantation"),
                message: "required",
              },
            ]}
            name={["section9", "liverTransplantValue"]}
          >
            <Radio.Group
              disabled={
                !treatmentList?.includes("Liver Transplantation") ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
            >
              <Space direction="vertical">
                {fields?.resectionPerformed.map((val) => (
                  <Radio value={val.value}>{val.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Recurrence ?"
                name="recurrenceValue"
                section="section9"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section9", "recurrenceValue"]}
          >
            <Radio.Group
              onChange={(e) => {
                const truth =
                  e.target.value === "Yes Once" ||
                  e.target.value === "Yes More Than Once";
                setState((val) => ({ ...val, isRecurrenceDateOpen: truth }));
                !truth &&
                  form.setFieldsValue({
                    section9: {
                      selectedDateOfFirstRecurrence: "",
                    },
                  });
              }}
            >
              {fields?.recurrenceValue.map((val) => (
                <Radio value={val.value}>{val.label}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col lg={6} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Date of First Recurrence"
                name="selectedDateOfFirstRecurrence"
                section="section9"
                {...props}
              />
            }
            rules={[
              {
                required: isRecurrenceDateOpen,
                message: "required",
              },
            ]}
            name={["section9", "selectedDateOfFirstRecurrence"]}
          >
            <DatePicker
              onChange={(e) =>
                (auditDataRef.current = [
                  ...auditDataRef?.current?.filter(
                    (val) =>
                      val.fControlName !== "selectedDateOfFirstRecurrence"
                  ),
                  {
                    id: 9,
                    sectionName: "HCC Outcomes",
                    labelName: "Date of First Recurrence",
                    fieldName: "selectedDateOfFirstRecurrence",
                    oldValue:
                      record?.section9?.selectedDateOfFirstRecurrence || "",
                    newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                    comment: comments?.section9?.selectedDateOfFirstRecurrence,
                  },
                ])
              }
              format={"DD-MM-YYYY"}
              disabled={
                !isRecurrenceDateOpen ||
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
                title="Survival Status"
                name="survivalStatusValue"
                section="section9"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section9", "survivalStatusValue"]}
          >
            <Radio.Group
              onChange={(e) => {
                const truth = e.target.value === "Deceased";
                setState((val) => ({ ...val, isDeathDateOpen: truth }));
                !truth &&
                  form.setFieldsValue({
                    section9: {
                      selectedDateOfDeath: null,
                      dateOfDeathUnknown: null,
                    },
                  });
              }}
              options={[
                {
                  label: "Alive",
                  value: "Alive",
                },
                { label: "Deceased", value: "Deceased" },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Space>
            <Form.Item
              name={["section9", "selectedDateOfDeath"]}
              label={
                <CustomLabel
                  title="Date of Death"
                  name="selectedDateOfDeath"
                  section="section9"
                  {...props}
                />
              }
              style={{ width: "160px" }}
              rules={[
                {
                  required: isDeathDateOpen && !isDeathDateOpen2,
                  message: "required",
                },
              ]}
            >
              <DatePicker
                onChange={(e) =>
                  (auditDataRef.current = [
                    ...auditDataRef?.current?.filter(
                      (val) => val.fControlName !== "selectedDateOfDeath"
                    ),
                    {
                      id: 9,
                      sectionName: "HCC Outcomes",
                      labelName: "Date of Death",
                      fieldName: "selectedDateOfDeath",
                      oldValue: record?.section9?.selectedDateOfDeath || "",
                      newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                      comment: comments?.section9?.selectedDateOfDeath,
                    },
                  ])
                }
                format={"DD-MM-YYYY"}
                style={{ marginRight: "20px" }}
                disabled={
                  !isDeathDateOpen ||
                  isDeathDateOpen2 ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
              />
            </Form.Item>
            <Form.Item name={["section9", "dateOfDeathUnknown"]} label=" ">
              <Checkbox.Group
                disabled={
                  !isDeathDateOpen ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
                style={{ marginLeft: "20px" }}
                onChange={(e) => {
                  setState((val) => ({
                    ...val,
                    isDeathDateOpen2: e?.[0] === "Unknown",
                  }));
                  e?.[0] === "Unknown" &&
                    form.setFieldsValue({
                      section9: {
                        selectedDateOfDeath: null,
                      },
                    });
                }}
                options={[{ label: "Unknown", value: "Unknown" }]}
              />
            </Form.Item>
          </Space>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <div style={{ position: "relative" }}>
            <Form.Item
              name={["section9", "selectedDateOfLastContact"]}
              label={
                <CustomLabel
                  title="Date of last contact (if patient is alive or dead but unknown date of death)"
                  name="selectedDateOfLastContact"
                  section="section9"
                  {...props}
                />
              }
              rules={[
                {
                  required: !isAliveDateOpen,
                  message: "required",
                },
              ]}
            >
              <DatePicker
                onChange={(e) =>
                  (auditDataRef.current = [
                    ...auditDataRef?.current?.filter(
                      (val) => val.fControlName !== "selectedDateOfLastContact"
                    ),
                    {
                      id: 9,
                      sectionName: "HCC Outcomes",
                      labelName:
                        "Date of last contact (if patient is alive or dead but unknown date of death)",
                      fieldName: "selectedDateOfLastContact",
                      oldValue:
                        record?.section9?.selectedDateOfLastContact || "",
                      newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                      comment: comments?.section9?.selectedDateOfLastContact,
                    },
                  ])
                }
                format={"DD-MM-YYYY"}
                style={{ marginRight: "20px", width: "160px" }}
                disabled={
                  isAliveDateOpen ||
                  role === "ROLE_REVIEWER" ||
                  role === "ROLE_PI"
                }
              />
            </Form.Item>
            <Form.Item
              name={["section9", "lastContactUnknown"]}
              style={{ position: "absolute", left: "40%", top: "50%" }}
            >
              <Checkbox.Group
                style={{ marginLeft: "20px" }}
                onChange={(e) => {
                  setState((val) => ({
                    ...val,
                    isAliveDateOpen: e?.[0] === "Unknown",
                  }));
                  e?.[0] === "Unknown" &&
                    form.setFieldsValue({
                      section9: {
                        selectedDateOfLastContact: null,
                      },
                    });
                }}
                options={[{ label: "Unknown", value: "Unknown" }]}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Recurrence-free Survival(days) (Date of first resection or liver transplant to date of first recurrence)"
                name="selectedDateOfRecurrenceFree"
                section="section9"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section9", "selectedDateOfRecurrenceFree"]}
          >
            <Input
              onKeyDown={handleNumbers}
              maxLength={5}
              style={{ width: "200px" }}
            />
          </Form.Item>
          <span></span>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Overall Survival(days) (Date of first resection or liver transplant to date of first recurrence)"
                name="selectedDateOfOverallSurvival"
                section="section9"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section9", "selectedDateOfOverallSurvival"]}
          >
            <Input
              onKeyDown={handleNumbers}
              maxLength={5}
              style={{ width: "200px" }}
            />
          </Form.Item>
          <span></span>
        </Col>
      </Row>
    </>
  );
}
export default Section9;
