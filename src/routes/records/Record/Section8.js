import { Checkbox, Col, Form, Input, Radio, Row, Space } from "antd";
import { useEffect, useState } from "react";
import UserInfo from "../../../helpers/user_info";
import CustomLabel from "./CustomLabel";
const fields = {
  mittalCriteriaValue: [
    {
      label: "(a) Level 1 Evidence (very high probability) of no Cirrhosis",
      value: "(a) Level 1 Evidence (very high probability) of no Cirrhosis",
      id: 1,
    },
    {
      label:
        "(b) Level 2 Evidence (high probability) of no cirrhosis, which lacks histology but is based on imaging and laboratory criteria",
      value:
        "(b) Level 2 Evidence (high probability) of no cirrhosis, which lacks histology but is based on imaging and laboratory criteria",
      id: 2,
    },
    {
      label:
        "(c) Confirmed Cirrhosis, Which is based on Histological, Imaging, Clinical or Laboratory Criteria",
      value:
        "(c) Confirmed Cirrhosis, Which is based on Histological, Imaging, Clinical or Laboratory Criteria",
      id: 3,
    },
    {
      label:
        "(d) Unclassified (insufficient data to classify into any of the above cirrhosis categories)",
      value:
        "(d) Unclassified (insufficient data to classify into any of the above cirrhosis categories)",
      id: 4,
    },
  ],
  underlyingEtiologyValue: [
    {
      label: "HCV (Hepatitis C virus)",
      value: "HCV (Hepatitis C virus)",
    },
    {
      label: "HBV (Hepatitis B virus)",
      value: "HBV (Hepatitis B virus)",
    },
    { label: "Alcohol", value: "Alcohol" },
    { label: "NAV", value: "NAV" },

    {
      label: "NAFLD (Non-alcoholic fatty liver disease)",
      value: "NAFLD (Non-alcoholic fatty liver disease)",
    },
    {
      label: "AIH (Autoimmune hepatitis)",
      value: "AIH (Autoimmune hepatitis)",
    },
    {
      label: "PBC (Primary biliary cholangitis/Primary biliary cirrhosis)",
      value: "PBC (Primary biliary cholangitis/Primary biliary cirrhosis)",
    },
    {
      label: "PSC (Primary sclerosing cholangitis)",
      value: "PSC (Primary sclerosing cholangitis)",
    },
    { label: "Hemochromatosis", value: "Hemochromatosis" },

    {
      label: "Alpha 1 antitrypsin deficiency",
      value: "Alpha 1 antitrypsin deficiency",
    },
    {
      label: "Other etiologies",
      value: "Other etiologies",
    },
    {
      label: "Idiopathic (enough information but no obvious etiology)",
      value: "Idiopathic (enough information but no obvious etiology)",
    },
    {
      label: "Unknown etiology(not enough information)",
      value: "Unknown etiology(not enough information)",
    },
  ],
  complicationCLD: [
    {
      label: "Ascites",
      value: "Ascites",
    },
    { label: "Encephalopathy", value: "Encephalopathy" },
    {
      label: "Varices",
      value: "Varices",
    },
    {
      label: "SBP (Spontaneous Bacterial Peritonitis)",
      value: "SBP (Spontaneous Bacterial Peritonitis)",
    },
    {
      label: "Other (renal failure, etc)",
      value: "Other (renal failure, etc)",
    },
    {
      label: "No complications occurred",
      value: "No complications occurred",
    },
    {
      label:
        "Information not available or not applicable (Patient not cirrhotic)",
      value:
        "Information not available or not applicable (Patient not cirrhotic)",
    },
    {
      label: "Portal vein thrombosis",
      value: "Portal vein thrombosis",
    },
  ],
  barcelonaClinic: [
    {
      label: "Stage 0: Very early HCC (all criteria should be fulfilled)",
      value: "Stage 0: Very early HCC (all criteria should be fulfilled)",
    },
    {
      label: "Stage A: Early HCC (all criteria should be fulfilled)",
      value: "Stage A: Early HCC (all criteria should be fulfilled)",
    },
    {
      label: "Stage B: Intermediate HCC (all criteria should be Fulfilled)",
      value: "Stage B: Intermediate HCC (all criteria should be Fulfilled)",
    },
    {
      label:
        "Stage C: Advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)",
      value:
        "Stage C: Advanced HCC(at least one criteria ECOG 1-2 or vascular invasion/extrahepatic spread)",
    },
    {
      label:
        "Stage D: End-stage HCC(at least one criteria ECOG 3-4 or Child C)",
      value:
        "Stage D: End-stage HCC(at least one criteria ECOG 3-4 or Child C)",
    },
    {
      label: "Not Available/Cannot be Calculated",
      value: "Not Available/Cannot be Calculated",
    },
  ],
};

function Section8(props) {
  const [{ cirrhosisStatus }, setState] = useState({
    cirrhosisStatus: true,
  });
  const role = UserInfo.getRoles();

  const form = props?.form;
  const { record } = props;
  useEffect(() => {
    setState((val) => ({
      ...val,
      cirrhosisStatus: record?.section8?.cirrhosisStatusValue,
    }));
  }, [record]);
  return (
    <Row gutter={20}>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Form.Item
          label={
            <CustomLabel
              title="Is Fatty Liver Present?"
              name="fattyLiverCLD"
              section="section8"
              {...props}
            />
          }
          rules={[
            {
              required: true,
              message: "required",
            },
          ]}
          name={["section8", "fattyLiverCLD"]}
        >
          <Radio.Group
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
              { label: "Unknown", value: "Unknown" },
            ]}
          />
        </Form.Item>
      </Col>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Form.Item
          label={
            <CustomLabel
              title="Fatty Liver Diagnostic Modality"
              name="fattyLiverRadioLast"
              section="section8"
              {...props}
            />
          }
          rules={[
            {
              required: true,
              message: "required",
            },
          ]}
          name={["section8", "fattyLiverRadioLast"]}
        >
          <Radio.Group
            options={[
              {
                label: "Imaging",
                value: "Imaging",
              },
              { label: "Biopsy", value: "Biopsy" },
              { label: "Clinical", value: "Clinical" },
              { label: "Other", value: "Other" },
              { label: "NA", value: "NA" },
            ]}
          />
        </Form.Item>
      </Col>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Form.Item
          label={
            <CustomLabel
              title="Fatty Liver Diagnostic Modality Free Text"
              name="fattyLiverDiagnosticFreeText"
              section="section8"
              {...props}
            />
          }
          name={["section8", "fattyLiverDiagnosticFreeText"]}
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Form.Item
          label={
            <CustomLabel
              title="Cirrhosis Status"
              name="cirrhosisStatusValue"
              section="section8"
              {...props}
            />
          }
          rules={[
            {
              required: true,
              message: "required",
            },
          ]}
          name={["section8", "cirrhosisStatusValue"]}
        >
          <Radio.Group
            onChange={(e) => {
              const truth = e.target.value;
              setState((val) => ({
                ...val,
                cirrhosisStatus: truth,
              }));

              form.setFieldsValue({
                section8: {
                  mittalCriteriaValue: null,
                },
              });
            }}
            options={[
              {
                label: "Yes",
                value: "Yes",
              },
              { label: "No", value: "No" },
              {
                label: "Unknown/Unclassified",
                value: "Unknown/Unclassified",
              },
            ]}
          />
        </Form.Item>
      </Col>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Form.Item
          label={
            <CustomLabel
              title="Mittal's Criteria"
              name="mittalCriteriaValue"
              section="section8"
              {...props}
            />
          }
          rules={[
            {
              required: true,
              message: "required",
            },
          ]}
          name={["section8", "mittalCriteriaValue"]}
        >
          <Radio.Group>
            <Space direction="vertical">
              {fields?.mittalCriteriaValue.map((val) => (
                <Radio
                  disabled={
                    (cirrhosisStatus === "Yes" && val.id === 4) ||
                    cirrhosisStatus === "No" ||
                    (cirrhosisStatus === "Unknown/Unclassified" &&
                      val.id < 4) ||
                    role === "ROLE_REVIEWER" ||
                    role === "ROLE_PI"
                  }
                  checked={cirrhosisStatus === "Yes" && val.id === 4}
                  value={val.value}
                >
                  {val.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col lg={12} md={24} sm={24} xs={24}>
        <Form.Item
          label={
            <CustomLabel
              title="Underlying Etiology"
              name="underlyingEtiologyValue"
              section="section8"
              {...props}
            />
          }
          rules={[
            {
              required: true,
              message: "required",
            },
          ]}
          name={["section8", "underlyingEtiologyValue"]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              {fields?.underlyingEtiologyValue.map((val) => (
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
              title="Etiology of Cirrhosis Free Text"
              name="etiologyCirrhosisFreeValue"
              section="section8"
              {...props}
            />
          }
          rules={[
            {
              required: true,
              message: "required",
            },
          ]}
          name={["section8", "etiologyCirrhosisFreeValue"]}
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
      <Col lg={24} md={24} sm={24} xs={24}>
        <Form.Item
          label={
            <CustomLabel
              title="Complications (at the time of HCC diagnosis)"
              name="complicationCLD"
              section="section8"
              {...props}
            />
          }
          rules={[
            {
              required: true,
              message: "required",
            },
          ]}
          name={["section8", "complicationCLD"]}
        >
          <Checkbox.Group>
            <Space direction="vertical">
              {fields?.complicationCLD.map((val) => (
                <Checkbox value={val.value}>{val.label}</Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
      </Col>
    </Row>
  );
}
export default Section8;
