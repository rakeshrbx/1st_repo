import { Col, DatePicker, Form, Input, Radio, Row, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";
const data = {
  isDateHBVDiagnosis: "",
  dateOfHBVBVirus: "",
  isHBViralBVirus: "",
  HBVviralTimeOfHCCDiagnosis: "",
  wasHBVReceivedBeforeAfter: "",
  hcvTreatmentBVirus: "",
  dateOfHBVTreatmentYear: "",
  hbvViralLoadAfterTreatment: "",
  hbvPostTreatment: "",
};
const fields = {
  hcvTreatmentCVirus: [
    {
      label: "Lamivudine",
      value: "Lamivudine",
    },
    {
      label: "Tenofovir",
      value: "Tenofovir",
    },
    {
      label: "Entecavir",
      value: "Entecavir",
    },
    { label: "Interferon Alpha", value: "Interferon Alpha" },

    {
      label: "Unknown",
      value: "Unknown",
    },

    {
      label: "No Treatment Received",
      value: "No Treatment Received",
    },
  ],
};

function Section13(props) {
  const role = UserInfo.getRoles();

  const [{ dateOfHBV, HBVInitial, HBVLoadAfter, HBVLoad }, setState] = useState(
    {
      dateOfHBV: false,
      HBVLoad: false,
      HBVInitial: false,
      HBVLoadAfter: false,
    }
  );
  const form = props?.form;

  const { record, auditDataRef, comments } = props;

  useEffect(() => {
    setState((val) => ({
      ...val,
      dateOfHBV: record?.section13?.isDateHBVDiagnosis === "Yes",
      HBVLoad: record?.section13?.isHBViralBVirus === "Yes",
      HBVInitial:
        record?.section13?.wasHBVReceivedBeforeAfter === "Not Applicable",
      HBVLoadAfter: record?.section13?.hbvViralLoadAfterTreatment === "Yes",
    }));
  }, [record]);

  return (
    <>
      <Row gutter={20}>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Is Date of HBV diagnosis Known?"
                name="isDateHBVDiagnosis"
                section="section13"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section13", "isDateHBVDiagnosis"]}
          >
            <Radio.Group
              onChange={(e) => {
                setState((val) => ({
                  ...val,
                  dateOfHBV: e.target.value === "Yes",
                }));
                if (e.target.value !== "Yes")
                  form.setFieldsValue({ section13: { dateOfHBVBVirus: null } });
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
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={6} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Date of HBV Diagnosis"
                name="dateOfHBVBVirus"
                section="section13"
                {...props}
              />
            }
            rules={[
              {
                required: dateOfHBV,
                message: "required",
              },
            ]}
            name={["section13", "dateOfHBVBVirus"]}
          >
            <DatePicker
              onChange={(e) =>
                (auditDataRef.current = [
                  ...auditDataRef?.current?.filter(
                    (val) => val.fControlName !== "dateOfHBVBVirus"
                  ),
                  {
                    id: 9,
                    sectionName:
                      "Hepatitis B virus (HBV) data within 6 months of HCC diagnosis",
                    labelName: "Date of HBV Diagnosis",
                    fieldName: "dateOfHBVBVirus",
                    oldValue: record?.section13?.dateOfHBVBVirus || "",
                    newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                    comment: comments?.section13?.dateOfHBVBVirus,
                  },
                ])
              }
              format={"DD-MM-YYYY"}
              disabled={
                !dateOfHBV || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Is HBV Viral Load Known?"
                name="isHBViralBVirus"
                section="section13"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section13", "isHBViralBVirus"]}
          >
            <Radio.Group
              onChange={(e) => {
                setState((val) => ({
                  ...val,
                  HBVLoad: e.target.value === "Yes",
                }));
                if (e.target.value !== "Yes")
                  form.setFieldsValue({
                    section13: { HBVviralTimeOfHCCDiagnosis: null },
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
                title="HBV Viral Load at Time of HCC Diagnosis"
                name="HBVviralTimeOfHCCDiagnosis"
                section="section13"
                {...props}
              />
            }
            rules={[
              {
                required: HBVLoad,
                message: "required",
              },
            ]}
            name={["section13", "HBVviralTimeOfHCCDiagnosis"]}
          >
            <Input
              style={{ width: "200px" }}
              disabled={
                !HBVLoad || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
              maxLength={10}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^-?\d*(\.\d*)?$/.test(inputValue)) {
                  form.setFieldsValue({
                    section13: {
                      HBVviralTimeOfHCCDiagnosis: inputValue,
                    },
                  });
                } else {
                  form.setFieldsValue({
                    section13: {
                      HBVviralTimeOfHCCDiagnosis: null,
                    },
                  });
                }
              }}
            />
          </Form.Item>
        </Col>

        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Was HBV Treatment Received Before or After initial HCC diagnosis?"
                name="wasHBVReceivedBeforeAfter"
                section="section13"
                {...props}
              />
            }
            onChange={(e) => {
              setState((val) => ({
                ...val,
                HBVInitial: e.target.value === "Not Applicable",
              }));
              if (e.target.value === "Not Applicable")
                form.setFieldsValue({
                  section13: {
                    hcvTreatmentBVirus: null,
                    dateOfHBVTreatmentYear: null,
                  },
                });
            }}
            rules={[{ required: true, message: "required" }]}
            name={["section13", "wasHBVReceivedBeforeAfter"]}
          >
            <Radio.Group
              options={[
                {
                  label: "Before",
                  value: "Before",
                },
                {
                  label: "After",
                  value: "After",
                },
                {
                  label: "Not Applicable",
                  value: "Not Applicable",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="HBV Treatment Type"
                name="hcvTreatmentBVirus"
                section="section13"
                {...props}
              />
            }
            rules={[
              {
                required: !HBVInitial,
                message: "required",
              },
            ]}
            name={["section13", "hcvTreatmentBVirus"]}
          >
            <Radio.Group
              disabled={
                HBVInitial || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
            >
              <Space direction="vertical">
                {fields?.hcvTreatmentCVirus.map((val) => (
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
                title="When was HBV Treated (year)"
                name="dateOfHBVTreatmentYear"
                section="section13"
                {...props}
              />
            }
            rules={[
              {
                required: !HBVInitial,
                message: "required",
              },
            ]}
            name={["section13", "dateOfHBVTreatmentYear"]}
          >
            <Input
              style={{ width: "120px" }}
              disabled={
                HBVInitial || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
              maxLength={4}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^-?\d*(\.\d*)?$/.test(inputValue)) {
                  form.setFieldsValue({
                    section13: {
                      dateOfHBVTreatmentYear: inputValue,
                    },
                  });
                } else {
                  form.setFieldsValue({
                    section13: {
                      dateOfHBVTreatmentYear: null,
                    },
                  });
                }
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Is HBV Viral Load after Treatment Known?"
                name="hbvViralLoadAfterTreatment"
                section="section13"
                {...props}
              />
            }
            onChange={(e) => {
              setState((val) => ({
                ...val,
                HBVLoadAfter: e.target.value === "Yes",
              }));
              if (e.target.value === "Yes")
                form.setFieldsValue({
                  section13: { hbvPostTreatment: null },
                });
            }}
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section13", "hbvViralLoadAfterTreatment"]}
          >
            <Radio.Group
              options={[
                {
                  label: "Yes",
                  value: "Yes",
                },
                {
                  label: "No",
                  value: "No",
                },
                {
                  label: "Unknown",
                  value: "UNknown",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="HBV Viral Load Post Treatment (IU/mL)"
                name="hbvPostTreatment"
                section="section13"
                {...props}
              />
            }
            rules={[
              {
                required: HBVLoadAfter,
                message: "required",
              },
            ]}
            name={["section13", "hbvPostTreatment"]}
          >
            <Input
              style={{ width: "120px" }}
              disabled={
                !HBVLoadAfter || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
              maxLength={10}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^-?\d*(\.\d*)?$/.test(inputValue)) {
                  form.setFieldsValue({
                    section13: {
                      hbvPostTreatment: inputValue,
                    },
                  });
                } else {
                  form.setFieldsValue({
                    section13: {
                      hbvPostTreatment: null,
                    },
                  });
                }
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
export default Section13;
