import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Table,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";

const data = [
  {
    label: "Hemoglobin A1C (HbA1c)",
    units: "%",
    units_name: "hemoglobinUnit",
    name1: "hemoGlobinFrom",
    name2: "hemoGlobinTo",
    name3: "hemoGlobinValue",
    name4: "hemoGlobinUnknown",
    name5: "hemoGlobinDate",
  },
  {
    label: "Alanine Aminotransferase(ALT)",
    units: "Units/L",
    units_name: "alanineUnit",
    name1: "alanineFrom",
    name2: "alanineTo",
    name3: "alanineValue",
    name4: "alanineUnknown",
    name5: "alanineDate",
  },
  {
    label: "Aspartate Aminotransferase(AST)",
    units: "Units/L",
    units_name: "aspartateUnit",
    name1: "aspartateFrom",
    name2: "aspartateTo",
    name3: "aspartateValue",
    name4: "aspartateUnknown",
    name5: "aspartateDate",
  },
  {
    label: "Total Bilirubin",
    units: "mg/dl",
    units_name: "bilirubinUnit",
    name1: "bilirubinFrom",
    name2: "bilirubinTo",
    name3: "bilirubinValue",
    name4: "bilirubinUnknown",
    name5: "bilirubinDate",
  },
  {
    label: "Alkaline Phosphatase(ALP)",
    units: "Units/L",
    units_name: "alkalineUnit",
    name1: "alkalineFrom",
    name2: "alkalineTo",
    name3: "alkalineValue",
    name4: "alkalineUnknown",
    name5: "alkalineDate",
  },
  {
    label: "Albumin",
    units: "g/dl",
    units_name: "albuminUnit",
    name1: "albuminFrom",
    name2: "albuminTo",
    name3: "albuminValue",
    name4: "albuminUnknown",
    name5: "albuminDate",
  },
  {
    label: "Platelets",
    units: "k/μl (X 109 /μl)",
    units_name: "platelatesUnit",
    name1: "platelatesFrom",
    name2: "platelatesTo",
    name3: "platelatesValue",
    name4: "platelatesUnknown",
    name5: "platelatesDate",
  },
  {
    label: "Creatinine",
    units: "mg/dl",
    units_name: "creatinineUnit",
    name1: "creatinineFrom",
    name2: "creatinineTo",
    name3: "creatinineValue",
    name4: "creatinineUnknown",
    name5: "creatinineDate",
  },
  {
    label: "Prothrombin Time(PT)",
    units: "Seconds",
    units_name: "prothrombinUnit",
    name1: "prothrombinFrom",
    name2: "prothrombinTo",
    name3: "prothrombinValue",
    name4: "prothrombinUnknown",
    name5: "prothrombinDate",
  },
  {
    label: "International Normalized Ratio (INR)",
    units: "N/A",
    units_name: "internationalUnit",
    name1: "internationalFrom",
    name2: "internationalTo",
    name5: "internationalDate",
    name3: "internationalValue",
    name4: "internationalUnknown",
  },
  {
    label: "Alpha-fetoprotein(AFP)",
    units: "ng/ml",
    units_name: "alphaUnit",
    name1: "alphaFrom",
    name5: "alphaDate",
    name2: "alphaTo",
    name3: "alphaValue",
    name4: "alphaUnknown",
  },
  {
    label: "Sodium (Na)",
    units: "Mmol/L",
    units_name: "sodiumUnit",
    name1: "sodiumFrom",
    name5: "sodiumDate",
    name2: "sodiumTo",
    name3: "sodiumValue",
    name4: "sodiumUnknown",
  },
  {
    label: "Blood Urea Nitrogen",
    units: "mg/dl",
    units_name: "bloodUreaUnit",
    name1: "bloodUreaFrom",
    name2: "bloodUreaTo",
    name3: "bloodUreaValue",
    name4: "bloodUreaUnknown",
    name5: "bloodDate",
  },
  {
    label: "Cholesterol",
    units: "mg/dl",
    units_name: "cholesterolUnit",
    name1: "cholesterolFrom",
    name2: "cholesterolTo",
    name3: "cholesterolValue",
    name4: "cholesterolUnknown",
    name5: "cholesterolDate",
  },
  {
    label: "Triglycerides",
    units: "mg/dl",
    units_name: "triglyceridesUnit",
    name1: "triglyceridesFrom",
    name2: "triglyceridesTo",
    name3: "triglyceridesValue",
    name4: "triglyceridesUnknown",
    name5: "triglyceridesDate",
  },
  {
    label: "High Density Lipo-proteins (HDL)",
    units: "mg/dl",
    units_name: "highDensityUnit",
    name1: "highDenistyFrom",
    name2: "highDensityTo",
    name3: "highDensityValue",
    name4: "highDensityUnknown",
    name5: "highDensityDate",
  },
  {
    label: "Low Density Lipo-proteins(LDL)",
    units: "mg/dl",
    units_name: "lowDensityUnit",
    name1: "lowDensityFrom",
    name2: "lowDensityTo",
    name3: "lowDensityValue",
    name4: "lowDensityUnknown",
    name5: "lowDensityDate",
  },
];
function Section4(props) {
  const [{ isLabEntryOpen, status }, setState] = useState({
    isLabEntryOpen: {},
    status: {},
  });
  const {
    form,
    calculateScores,
    record: record_details,
    auditDataRef,
    comments,
  } = props;
  const role = UserInfo.getRoles();

  useEffect(() => {
    if (record_details && Object.keys(record_details)?.length > 0) {
      record_details?.section4?.modelEndStageLab === "Applicable" &&
        calculateScores(true);
      const fieldsArray = data.map((val) => val.name4);
      Object.keys(record_details?.section4)
        .filter((val) => fieldsArray?.includes(val))
        .forEach((val) => {
          if (record_details?.section4?.[val]?.[0] === "Unknown") {
            const obj = data.filter((ele) => ele?.name4 === val)?.[0];
            setState((val) => ({
              ...val,
              isLabEntryOpen: {
                ...val.isLabEntryOpen,
                [obj?.name1]: true,
                [obj?.name2]: true,
                [obj?.name3]: true,
                [obj?.name4]: true,
                [obj?.name5]: true,
              },
            }));
          }
        });
    }
  }, [record_details, calculateScores]);

  const handleNumbers = (e) => {
    if (!/\d/.test(e.key) && e.key !== "Backspace" && e.key !== ".") {
      e.preventDefault();
    }
  };

  return (
    <div>
      <TableStyles>
        <Table
          size="small"
          bordered
          pagination={false}
          style={{ marginBottom: "32px" }}
          columns={[
            {
              title: "Parameters",
              render: (record) => (
                <span
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  {record.label}
                </span>
              ),
            },
            {
              title: (
                <span>
                  Reference Range
                  <br />
                  (Lower Limit)
                </span>
              ),
              render: (record) => (
                <Form.Item
                  name={["section4", record.name1]}
                  label={
                    <CustomLabel
                      visibility="hidden"
                      title={record.label}
                      name={record.name1}
                      section="section4"
                      {...props}
                    />
                  }
                  rules={[
                    {
                      required: !isLabEntryOpen?.[record?.name4],
                      message: "",
                    },
                  ]}
                >
                  <Input
                    disabled={
                      isLabEntryOpen?.[record?.name1] ||
                      role === "ROLE_REVIEWER" ||
                      role === "ROLE_PI"
                    }
                    onBlur={(e) => {
                      const upper =
                        form.getFieldValue("section4")?.[record?.name2];
                      const lower = e.target.value;
                      const value =
                        form.getFieldValue("section4")?.[record?.name3];
                      // form.getFieldValue("section4")?.[record?.name2];
                      if (isFinite(lower) && isFinite(upper)) {
                        if (
                          parseFloat(upper) < parseFloat(value) ||
                          parseFloat(lower) > parseFloat(value)
                        ) {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: true,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: ["Please check the value maintained"],
                            },
                          ]);
                        } else {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: false,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: [],
                            },
                          ]);
                        }
                      } else if (
                        (lower?.slice(0, 1) === ">" &&
                          isFinite(lower.slice(1))) ||
                        (upper?.slice(0, 1) === "<" && isFinite(upper.slice(1)))
                      ) {
                        if (
                          parseFloat(upper?.slice(1)) <= parseFloat(value) ||
                          parseFloat(lower?.slice(1)) >= parseFloat(value)
                        ) {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: true,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: ["Please check the value maintained"],
                            },
                          ]);
                        } else {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: false,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: [],
                            },
                          ]);
                        }
                      }
                    }}
                    // onKeyDown={handleNumbers}
                  />
                </Form.Item>
              ),
              align: "center",
            },
            {
              title: (
                <span>
                  Reference Range
                  <br />
                  (Upper Limit)
                </span>
              ),
              render: (record) => (
                <Form.Item
                  name={["section4", record.name2]}
                  label={
                    <CustomLabel
                      visibility="hidden"
                      title={record.label}
                      name={record.name2}
                      section="section4"
                      {...props}
                    />
                  }
                  rules={[
                    {
                      required: !isLabEntryOpen?.[record?.name4],
                      message: "",
                    },
                  ]}
                >
                  <Input
                    disabled={
                      isLabEntryOpen?.[record?.name2] ||
                      role === "ROLE_REVIEWER" ||
                      role === "ROLE_PI"
                    }
                    onBlur={(e) => {
                      const lower =
                        form.getFieldValue("section4")?.[record?.name1];
                      const upper = e.target.value;
                      const value =
                        form.getFieldValue("section4")?.[record?.name3];
                      // form.getFieldValue("section4")?.[record?.name2];
                      if (isFinite(lower) && isFinite(upper)) {
                        if (
                          parseFloat(upper) < parseFloat(value) ||
                          parseFloat(lower) > parseFloat(value)
                        ) {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: true,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: ["Please check the value maintained"],
                            },
                          ]);
                        } else {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: false,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: [],
                            },
                          ]);
                        }
                      } else if (
                        (lower?.slice(0, 1) === ">" &&
                          isFinite(lower.slice(1))) ||
                        (upper?.slice(0, 1) === "<" && isFinite(upper.slice(1)))
                      ) {
                        if (
                          parseFloat(upper?.slice(1)) <= parseFloat(value) ||
                          parseFloat(lower?.slice(1)) >= parseFloat(value)
                        ) {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: true,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: ["Please check the value maintained"],
                            },
                          ]);
                        } else {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: false,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: [],
                            },
                          ]);
                        }
                      }
                    }}
                    // onChange={(e) => {
                    //   const inputValue = e.target.value;
                    //   if (/^-?\d*(\.\d*)?$/.test(inputValue)) {
                    //     form.setFieldsValue({
                    //       section4: {
                    //         [record?.name2]: inputValue,
                    //       },
                    //     });
                    //   } else {
                    //     form.setFieldsValue({
                    //       section4: {
                    //         [record?.name2]: null,
                    //       },
                    //     });
                    //   }
                    // }}
                  />
                </Form.Item>
              ),
              align: "center",
            },
            {
              title: "Date",
              render: (record) => (
                <Form.Item
                  name={["section4", record.name5]}
                  label={
                    <CustomLabel
                      visibility="hidden"
                      title={record.label}
                      name={record.name5}
                      section="section4"
                      {...props}
                    />
                  }
                  rules={[
                    {
                      required: !isLabEntryOpen?.[record?.name4],
                      message: "",
                    },
                  ]}
                >
                  <DatePicker
                    onChange={(e) =>
                      (auditDataRef.current = [
                        ...auditDataRef?.current?.filter(
                          (val) => val.fControlName !== record?.name5
                        ),
                        {
                          id: 4,
                          sectionName:
                            "Most recent laboratory parameters, 6 months before or after the diagnosis of HCC",
                          labelName: record?.label,
                          fieldName: record?.name5,
                          oldValue:
                            record_details?.section4?.[record?.name5] || "",
                          newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                          comment: comments?.section4?.[record?.name5],
                        },
                      ])
                    }
                    format={"DD-MM-YYYY"}
                    style={{ width: "120px" }}
                    disabled={
                      isLabEntryOpen?.[record?.name4] ||
                      role === "ROLE_REVIEWER" ||
                      role === "ROLE_PI"
                    }
                  />
                </Form.Item>
              ),
              align: "center",
            },
            {
              title: "Value",
              render: (record) => (
                <Form.Item
                  name={["section4", record.name3]}
                  label={
                    <CustomLabel
                      visibility="hidden"
                      title={record.label}
                      name={record.name3}
                      section="section4"
                      {...props}
                    />
                  }
                  rules={[
                    {
                      required: !isLabEntryOpen?.[record?.name4],
                      message: "",
                    },
                  ]}
                >
                  <Input
                    disabled={
                      isLabEntryOpen?.[record?.name3] ||
                      role === "ROLE_REVIEWER" ||
                      role === "ROLE_PI"
                    }
                    status={status?.[record?.name3] ? "warning" : ""}
                    onBlur={(e) => {
                      const lower =
                        form.getFieldValue("section4")?.[record?.name1];
                      const upper =
                        form.getFieldValue("section4")?.[record?.name2];
                      if (isFinite(lower) && isFinite(upper)) {
                        if (
                          parseFloat(upper) < parseFloat(e.target.value) ||
                          parseFloat(lower) > parseFloat(e.target.value)
                        ) {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: true,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: ["Please check the value maintained"],
                            },
                          ]);
                        } else {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: false,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: [],
                            },
                          ]);
                        }
                      } else if (
                        (lower?.slice(0, 1) === ">" &&
                          isFinite(lower.slice(1))) ||
                        (upper?.slice(0, 1) === "<" && isFinite(upper.slice(1)))
                      ) {
                        if (
                          parseFloat(upper?.slice(1)) <=
                            parseFloat(e.target.value) ||
                          parseFloat(lower?.slice(1)) >=
                            parseFloat(e.target.value)
                        ) {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: true,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: ["Please check the value maintained"],
                            },
                          ]);
                        } else {
                          setState((val) => ({
                            ...val,
                            status: {
                              ...val.status,
                              [record.name3]: false,
                            },
                          }));
                          form.setFields([
                            {
                              name: ["section4", record?.name3],
                              errors: [],
                            },
                          ]);
                        }
                      }
                    }}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/^-?\d*(\.\d*)?$/.test(inputValue)) {
                        form.setFieldsValue({
                          section4: {
                            [record?.name3]: inputValue,
                          },
                        });

                        calculateScores(
                          form.getFieldValue("section4")?.modelEndStageLab ===
                            "Applicable"
                            ? true
                            : false
                        );
                      } else {
                        form.setFieldsValue({
                          section4: {
                            [record?.name3]: null,
                          },
                        });
                      }
                    }}
                  />
                </Form.Item>
              ),
              align: "center",
            },
            {
              title: "Units",
              render: (record) => (
                <Form.Item
                  name={["section4", record.units_name]}
                  label={" "}
                  style={{ width: "110px" }}
                >
                  <Input disabled />
                </Form.Item>
              ),
              align: "center",
            },
            {
              title: "Unknown",
              render: (record) => (
                <Form.Item
                  name={["section4", record.name4]}
                  label={
                    <CustomLabel
                      visibility="hidden"
                      title={record.label}
                      name={record.name4}
                      section="section4"
                      {...props}
                    />
                  }
                >
                  <Checkbox.Group
                    onChange={(e) => {
                      const truth = e?.[0] === "Unknown";
                      setState((val) => ({
                        ...val,
                        isLabEntryOpen: {
                          ...val.isLabEntryOpen,
                          [record?.name1]: truth,
                          [record?.name2]: truth,
                          [record?.name3]: truth,
                          [record?.name4]: truth,
                          [record?.name5]: truth,
                        },
                      }));
                      e?.[0] === "Unknown" &&
                        form.setFieldsValue({
                          section4: {
                            [record?.name1]: null,
                            [record?.name2]: null,
                            [record?.name3]: null,
                            [record?.name5]: null,
                          },
                        });
                    }}
                    options={[{ label: "Unknown", value: "Unknown" }]}
                  />
                </Form.Item>
              ),
              align: "center",
            },
          ]}
          dataSource={data}
        />
      </TableStyles>
      <Row gutter={20}>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Model for End Stage Liver Disease (MELD)Na score for Cirrhosis Patient"
                name={"modelEndStageLab"}
                section="section4"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section4", "modelEndStageLab"]}
          >
            <Radio.Group
              onChange={(e) => {
                calculateScores(e.target.value === "Applicable");
                // setState((val) => ({
                //   ...val,
                //   isOtherInsuranceTextAreaOpen:
                //     e.target.value === "Applicable" ? true : false,
                // }));
              }}
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="If Applicable (Score)"
                name={"modelEndStageTextArea"}
                section="section4"
                {...props}
              />
            }
            name={["section4", "modelEndStageTextArea"]}
          >
            <Input type="number" disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="MELD score"
                name={"meldScoreLab"}
                section="section4"
                {...props}
              />
            }
            name={["section4", "meldScoreLab"]}
          >
            <Input type="number" disabled />
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="FIB4"
                name={"fib4Lab"}
                section="section4"
                {...props}
              />
            }
            name={["section4", "fib4Lab"]}
          >
            <Input type="number" disabled />
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="AST to Platelet Ratio Index (APRI)"
                name={"astPlateletLab"}
                section="section4"
                {...props}
              />
            }
            name={["section4", "astPlateletLab"]}
          >
            <Input type="number" disabled />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
export default Section4;

const TableStyles = styled.div``;
