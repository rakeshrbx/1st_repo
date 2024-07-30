import { Col, DatePicker, Form, Input, Radio, Row, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";

const fields = {
  hcvTreatmentCVirus: [
    {
      label: "DAA (direct-acting antiviral)",
      value: "DAA (direct-acting antiviral)",
    },
    {
      label: "Protease Inhibitor",
      value: "Protease Inhibitor",
    },
    {
      label: "Peg Interferon",
      value: "Peg Interferon",
    },
    {
      label: "Ribavirin",
      value: "Ribavirin",
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

function Section12(props) {
  const [{ dateOfHCV, HCVLoad, HCVInitial, HCVLoadAfter, SVR }, setState] =
    useState({
      dateOfHCV: false,
      HCVLoad: false,
      HCVInitial: false,
      HCVLoadAfter: false,
      SVR: false,
    });
  const role = UserInfo.getRoles();
  const handleNumbers = (e) => {
    if (!/\d/.test(e.key) && e.key != "Backspace") {
      e.preventDefault();
    }
  };
  const form = props?.form;
  const { setFieldsValue } = form;
  const { record, auditDataRef, comments } = props;
  useEffect(() => {
    setState((val) => ({
      ...val,
      dateOfHCV: record?.section12?.isDateHCVDiagnosis === "Yes",
      HCVLoad: record?.section12?.isHCViralCVirus === "Yes",
      HCVInitial:
        record?.section12?.wasHCVReceivedBeforeAfter === "Not Applicable",
      HCVLoadAfter: record?.section12?.hcvViralLoadAfterTreatment === "Yes",
      SVR: record?.section12?.sustainedHCV === "Yes",
    }));
  }, [record]);

  // useEffect(() => {
  //   setFieldsValue({
  //     section12: {
  //       hcvGenotype: record?.section12?.hcvGenotype?.[0],
  //       hcvTreatmentCVirus: record?.section12?.hcvTreatmentCVirus?.[0],
  //     },
  //   });
  // }, [setFieldsValue, record]);

  return (
    <>
      <Row gutter={20}>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Is Date of HCV Diagnosis Known?"
                name="isDateHCVDiagnosis"
                section="section12"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section12", "isDateHCVDiagnosis"]}
          >
            <Radio.Group
              onChange={(e) => {
                setState((val) => ({
                  ...val,
                  dateOfHCV: e.target.value === "Yes",
                }));
                if (e.target.value !== "Yes")
                  form.setFieldsValue({ section12: { dateOfHCVCVirus: null } });
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
                title="Date of HCV Diagnosis"
                name="dateOfHCVCVirus"
                section="section12"
                {...props}
              />
            }
            rules={[
              {
                required: dateOfHCV,
                message: "required",
              },
            ]}
            name={["section12", "dateOfHCVCVirus"]}
          >
            <DatePicker
              onChange={(e) =>
                (auditDataRef.current = [
                  ...auditDataRef?.current?.filter(
                    (val) => val.fControlName !== "dateOfHCVCVirus"
                  ),
                  {
                    id: 12,
                    sectionName:
                      "Hepatitis C virus (HCV) data within 6 months of HCC diagnosis",
                    labelName: "Date of HCV Diagnosis",
                    fieldName: "dateOfHCVCVirus",
                    oldValue: record?.section12?.dateOfHCVCVirus || "",
                    newValue: dayjs(e).format("YYYY-MM-DD HH:mm:ss"),
                    comment: comments?.section12?.dateOfHCVCVirus,
                  },
                ])
              }
              format={"DD-MM-YYYY"}
              disabled={
                !dateOfHCV || role === "ROLE_REVIEWER" || role === "ROLE_PI"
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
                title="Is HCV Viral Load Known?"
                name="isHCViralCVirus"
                section="section12"
                {...props}
              />
            }
            onChange={(e) => {
              setState((val) => ({
                ...val,
                HCVLoad: e.target.value === "Yes",
              }));
              if (e.target.value !== "Yes")
                form.setFieldsValue({
                  section12: { HCVviralTimeOfHCCDiagnosis: null },
                });
            }}
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section12", "isHCViralCVirus"]}
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
                title="HCV Viral Load at Time of HCC Diagnosis"
                name="HCVviralTimeOfHCCDiagnosis"
                section="section12"
                {...props}
              />
            }
            rules={[
              {
                required: HCVLoad,
                message: "required",
              },
            ]}
            name={["section12", "HCVviralTimeOfHCCDiagnosis"]}
          >
            <Input
              style={{ width: "200px" }}
              disabled={
                !HCVLoad || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
              maxLength={10}
              onKeyDown={handleNumbers}
            />
          </Form.Item>
        </Col>

        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="HCV Genotype"
                name="hcvGenotype"
                section="section12"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section12", "hcvGenotype"]}
          >
            <Radio.Group
              options={[
                {
                  label: "1a",
                  value: "1a",
                },
                {
                  label: "1b",
                  value: "1b",
                },
                {
                  label: "1 Unknown",
                  value: "1 Unknown",
                },
                {
                  label: "2",
                  value: "2",
                },
                {
                  label: "3",
                  value: "3",
                },
                {
                  label: "4",
                  value: "4",
                },
                {
                  label: "5",
                  value: "5",
                },
                {
                  label: "6",
                  value: "6",
                },
                {
                  label: "Unknown",
                  value: "Unknown",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Was HCV Treatment Received Before or After initial HCC diagnosis?"
                name="wasHCVReceivedBeforeAfter"
                section="section12"
                {...props}
              />
            }
            onChange={(e) => {
              setState((val) => ({
                ...val,
                HCVInitial: e.target.value === "Not Applicable",
              }));
              if (e.target.value === "Not Applicable")
                form.setFieldsValue({
                  section12: { hcvTreatmentCVirus: null, hcvTreatedYear: null },
                });
            }}
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section12", "wasHCVReceivedBeforeAfter"]}
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
                title="HCV Treatment Type"
                name="hcvTreatmentCVirus"
                section="section12"
                {...props}
              />
            }
            rules={[
              {
                required: !HCVInitial,
                message: "required",
              },
            ]}
            name={["section12", "hcvTreatmentCVirus"]}
          >
            <Radio.Group
              disabled={
                HCVInitial || role === "ROLE_REVIEWER" || role === "ROLE_PI"
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
                title="When was HCV Treated (year)"
                name="hcvTreatedYear"
                section="section12"
                {...props}
              />
            }
            rules={[
              {
                required: !HCVInitial,
                message: "required",
              },
            ]}
            name={["section12", "hcvTreatedYear"]}
          >
            <Input
              style={{ width: "120px" }}
              disabled={
                HCVInitial || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
              maxLength={4}
              onKeyDown={handleNumbers}
            />
          </Form.Item>
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Is HCV Viral Load after Treatment Known?"
                name="hcvViralLoadAfterTreatment"
                section="section12"
                {...props}
              />
            }
            onChange={(e) => {
              setState((val) => ({
                ...val,
                HCVLoadAfter: e.target.value === "Yes",
              }));
              if (e.target.value !== "Yes")
                form.setFieldsValue({
                  section12: { hcvPostTreatment: null },
                });
            }}
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section12", "hcvViralLoadAfterTreatment"]}
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
                title="HCV Viral Load Post Treatment (IU/mL)"
                name="hcvPostTreatment"
                section="section12"
                {...props}
              />
            }
            rules={[
              {
                required: HCVLoadAfter,
                message: "required",
              },
            ]}
            name={["section12", "hcvPostTreatment"]}
          >
            <Input
              style={{ width: "120px" }}
              disabled={
                !HCVLoadAfter || role === "ROLE_REVIEWER" || role === "ROLE_PI"
              }
              maxLength={10}
              onKeyDown={handleNumbers}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Sustained virological response (SVR) after HCV treatment (undetectable HCV RNA 12 weeks after completion of treatment)"
                name="sustainedHCV"
                section="section12"
                {...props}
              />
            }
            onChange={(e) => {
              setState((val) => ({
                ...val,
                SVR: e.target.value === "Yes",
              }));
              if (e.target.value !== "Yes")
                form.setFieldsValue({
                  section12: { yearSVRHCV: null },
                });
            }}
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section12", "sustainedHCV"]}
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
                title="Year SVR Achieved"
                name="yearSVRHCV"
                section="section12"
                {...props}
              />
            }
            rules={[
              {
                required: SVR,
                message: "required",
              },
            ]}
            name={["section12", "yearSVRHCV"]}
          >
            <Input
              style={{ width: "120px" }}
              disabled={!SVR || role === "ROLE_REVIEWER" || role === "ROLE_PI"}
              maxLength={4}
              onKeyDown={handleNumbers}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
export default Section12;
