import { Col, Form, Input, Radio, Row, Space, Table } from "antd";
import { useEffect, useState } from "react";

import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";

const data = [
  {
    label: "Diabetes",
    name1: "diabetesComorbidities",
    name2: "diabetesAfter",
    name3: "yesDiabetesInput",
  },
  {
    label: "Hypertension",
    name1: "hypertensionComorbidities",
    name2: "hypertensionAfter",
    name3: "yesHyperTensionInput",
  },
  {
    label: "Dyslipidemia",
    name1: "dyslipidemiaComorbidities",
    name2: "dysliAfter",
    name3: "yesDyslipidemiaInput",
  },
  {
    label: "Coronary Artery Disease",
    name1: "coronaryComorbidities",
    name2: "coronaryAfter",
    name3: "yesCoronaryInput",
  },
  {
    label: "Peripheral Vascular Disease",
    name1: "peripheralComorbidities",
    name2: "peripheralAfter",
    name3: "yesPeripheralInput",
  },
  {
    label: "HIV",
    name1: "hivComorbidities",
    name2: "hivAfter",
    name3: "yesHivInput",
  },
  // {
  //   label: "Non-liver cancer",
  //   name1: "nonLiverCancer",
  //   name2: "nonLiverCancer",
  //   name3: "nonLiverCancer",
  // },
];
const fields = {
  alcoholConsumptionValueSub: [
    {
      label:
        "History of more than 3 drinks per day for men or more than 2 drinks per day for women",
      value:
        "History of more than 3 drinks per day for men or more than 2 drinks per day for women",
    },
    {
      label:
        "Documentation of alcoholism/alcoholic abuse in progress notes notes",
      value:
        "Documentation of alcoholism/alcoholic abuse in progress notes notes",
    },

    {
      label: "Enrollment in rehabilitation",
      value: "Enrollment in rehabilitation",
    },
    {
      label: "History of alcoholic hepatitis",
      value: "History of alcoholic hepatitis",
    },
  ],
};
function Section5(props) {
  const role = UserInfo.getRoles();

  const { setState: setGlobalState } = props;
  const [
    { isLabEntryOpen, isAlcoholConsumptionRadioOpen, isNonLiverCancerOpen },
    setState,
  ] = useState({
    isLabEntryOpen: {},
    isAlcoholConsumptionRadioOpen: false,
    isNonLiverCancerOpen: false,
  });
  const form = props?.form;
  const { setFieldsValue } = form;
  const { record } = props;
  useEffect(() => {
    if (record && Object.keys(record)?.length > 0) {
      setState((val) => ({
        ...val,
        isNonLiverCancerOpen: record?.section5?.isNonLiverCancerOpen !== "Yes",
        isAlcoholConsumptionRadioOpen:
          record?.section5?.isAlcoholConsumptionRadioOpen !== "Yes",
      }));
      setGlobalState((val) => ({
        ...val,
        isHIVChecked: record?.section5?.hivComorbidities === "Yes",
      }));
      const fieldsArray = data.map((val) => val.name1);
      record?.section5 &&
        Object.keys(record?.section5)
          .filter((val) => fieldsArray?.includes(val))
          .forEach((val) => {
            if (record?.section5?.[val] !== "Yes") {
              const obj = data.filter((ele) => ele?.name1 === val)?.[0];
              setState((val) => ({
                ...val,
                isLabEntryOpen: {
                  ...val.isLabEntryOpen,
                  [obj?.name2]: true,
                  [obj?.name3]: true,
                },
              }));
            }
          });
    }
  }, [record, setGlobalState]);

  const handleNumbers = (e) => {
    if (!/\d/.test(e.key) && e.key != "Backspace") {
      e.preventDefault();
    }
  };
  return (
    <di>
      <Table
        size="small"
        bordered
        pagination={false}
        style={{ marginBottom: "32px" }}
        columns={[
          {
            title: "Disease/Disorder",
            render: (record) => (
              <span
                style={{
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "700",
                  textAlign: "left",
                }}
              >
                {record.label}
              </span>
            ),
          },
          {
            title: "State",
            render: (record) => (
              <Form.Item
                name={["section5", record.name1]}
                label={
                  <CustomLabel
                    visibility="hidden"
                    title={record.label}
                    name={record.name1}
                    section="section5"
                    {...props}
                  />
                }
                rules={[
                  {
                    required: true,
                    message: "required",
                  },
                ]}
              >
                <Radio.Group
                  onChange={(e) => {
                    const truth = e.target.value !== "Yes";
                    if (record?.name1 === "hivComorbidities") {
                      setGlobalState((val) => ({
                        ...val,
                        isHIVChecked: e.target.value === "Yes",
                      }));
                      if (e.target.value !== "Yes") {
                        setFieldsValue({
                          section11: {
                            historyHIV: "",
                            yearOfHIVHCC: "",
                            dateOfHIVDurationFrom: "",
                            hivRNAHCC: "",
                            belowRadioHCC: null,
                            hivCD4: "",
                            hivCD4Nav: "",
                            hivAbsoluteCD4: "",
                            hivAbsoluteCD4Nav: "",
                            hivCD4CellCount: "",
                            hivRNALevel: "",
                            hivCD4CellCountNav: "",
                            hivInitialHIV1: "",
                            hivInitialHIV1Nav: "",
                            maximumHIVRNA: "",
                            maximumHIVRNANav: "",
                          },
                        });
                      }
                    }

                    if (truth) {
                      form.setFieldsValue({
                        section5: {
                          [record?.name2]: null,
                          [record?.name3]: null,
                        },
                      });
                    }

                    setState((val) => ({
                      ...val,
                      isLabEntryOpen: {
                        ...val.isLabEntryOpen,
                        [record?.name2]: truth,
                        [record?.name3]: truth,
                      },
                    }));
                  }}
                  options={[
                    { label: "Yes", value: "Yes", key: 1 },
                    { label: "No", value: "No", key: 2 },
                    { label: "Unknown", value: "Unknown", key: 3 },
                  ]}
                />
              </Form.Item>
            ),
            align: "center",
          },
          {
            title: "If Yes,",
            render: (record) => (
              <>
                <Form.Item
                  name={["section5", record.name2]}
                  label={
                    <CustomLabel
                      visibility="hidden"
                      title={record.label}
                      name={record.name2}
                      section="section5"
                      {...props}
                    />
                  }
                  rules={[
                    {
                      required: !isLabEntryOpen?.[record?.name2],
                      message: "required",
                    },
                  ]}
                >
                  <Radio.Group
                    disabled={
                      isLabEntryOpen?.[record?.name2] ||
                      role === "ROLE_REVIEWER" ||
                      role === "ROLE_PI"
                    }
                    options={[
                      { label: "Prior to", value: "Prior to" },
                      { label: "After", value: "After" },
                      { label: "NAV", value: "NAV" },
                    ]}
                  />
                </Form.Item>
              </>
            ),
            align: "center",
          },
          {
            title: "If Yes, No of Years",
            render: (record) => (
              <>
                <Form.Item
                  name={["section5", record.name3]}
                  label={
                    <CustomLabel
                      visibility="hidden"
                      title={record.label}
                      name={record.name3}
                      section="section5"
                      {...props}
                    />
                  }
                  rules={[
                    {
                      required: !isLabEntryOpen?.[record?.name2],

                      message: "required",
                    },
                  ]}
                >
                  <Input
                    disabled={
                      isLabEntryOpen?.[record?.name3] ||
                      role === "ROLE_REVIEWER" ||
                      role === "ROLE_PI"
                    }
                    maxLength={2}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/^-?\d*(\.\d*)?$/.test(inputValue)) {
                        form.setFieldsValue({
                          section5: {
                            [record?.name3]: inputValue,
                          },
                        });
                      } else {
                        form.setFieldsValue({
                          section5: {
                            [record?.name3]: null,
                          },
                        });
                      }
                    }}
                  />
                </Form.Item>
              </>
            ),
            align: "center",
          },
        ]}
        dataSource={data}
      />
      <Row gutter={20}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            name={["section5", "nonLiverCancer"]}
            label={
              <CustomLabel
                // visibility="hidden"
                title={"Non-liver cancer"}
                name={"nonLiverCancer"}
                section="section5"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                const truth = e.target.value !== "Yes";
                if (truth) {
                  form.setFieldsValue({
                    section5: {
                      yesLocationSiteValue: null,
                      yesYearOfDiagnosis: null,
                      yesStageValue: null,
                    },
                  });
                }
                setState((val) => ({
                  ...val,
                  isNonLiverCancerOpen: truth,
                }));
              }}
              options={[
                { label: "Yes", value: "Yes", key: 1 },
                { label: "No", value: "No", key: 2 },
                { label: "Unknown", value: "Unknown", key: 3 },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="If Yes, Location/site"
                name="yesLocationSiteValue"
                section="section5"
                {...props}
              />
            }
            rules={[
              {
                required: !isNonLiverCancerOpen,
                message: "required",
              },
            ]}
            name={["section5", "yesLocationSiteValue"]}
          >
            <Input
              disabled={
                isNonLiverCancerOpen ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            name={["section5", "yesStageValue"]}
            label={
              <CustomLabel
                title="If Yes, Stage"
                name="yesStageValue"
                section="section5"
                {...props}
              />
            }
            rules={[
              {
                required: !isNonLiverCancerOpen,
                message: "required",
              },
            ]}
          >
            <Input
              disabled={
                isNonLiverCancerOpen ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
              maxLength={2}
              onKeyDown={handleNumbers}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="If Yes, Year of Diagnosis"
                name="yesYearOfDiagnosis"
                section="section5"
                {...props}
              />
            }
            rules={[
              {
                required: !isNonLiverCancerOpen,
                message: "required",
              },
            ]}
            name={["section5", "yesYearOfDiagnosis"]}
          >
            <Input
              disabled={
                isNonLiverCancerOpen ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
              maxLength={4}
              placeholder="YYYY"
              onKeyDown={handleNumbers}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Alcohol Consumption / Abuse"
                name="alcoholConsumptionValue"
                section="section5"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section5", "alcoholConsumptionValue"]}
          >
            <Radio.Group
              onChange={(e) => {
                setState((val) => ({
                  ...val,
                  isAlcoholConsumptionRadioOpen:
                    e.target.value === "Yes" ? true : false,
                }));
                form.setFieldsValue({
                  section5: { alcoholConsumptionValueSub: null },
                });
              }}
              options={[
                { label: "No", value: "No", key: 1 },
                { label: "Yes", value: "Yes", key: 2 },
                { label: "Unknown", value: "Unknown", key: 3 },
              ]}
            />
          </Form.Item>
        </Col>

        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label=" "
            name={["section5", "alcoholConsumptionValueSub"]}
          >
            <Radio.Group
              disabled={
                !isAlcoholConsumptionRadioOpen ||
                role === "ROLE_REVIEWER" ||
                role === "ROLE_PI"
              }
            >
              <Space direction="vertical">
                {fields?.alcoholConsumptionValueSub.map((val) => (
                  <Radio value={val.value}>{val.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </di>
  );
}
export default Section5;
