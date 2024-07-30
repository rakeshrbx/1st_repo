import { Col, Form, Input, Radio, Row, Space } from "antd";
import CustomLabel from "./CustomLabel";
const fields = {
  tumorStageValue: [
    {
      label: "Single(with or without microvascular invasion)",
      value: "Single(with or without microvascular invasion)",
    },
    {
      label:
        "3 tumors < 3cm (≤ 3 tumors and none is > 3 cm with or without microvascular invasion)",
      value:
        "3 tumors < 3cm (≤ 3 tumors and none is > 3 cm with or without microvascular invasion)",
    },
    {
      label:
        "Large multinodular(> 3 tumors or ≥2 tumors any larger than 3 cm with or without microvascular invasion )",
      value:
        "Large multinodular(> 3 tumors or ≥2 tumors any larger than 3 cm with or without microvascular invasion )",
    },
    {
      label:
        "Vascular invasion or extrahepatic spread (only macrovascular invasion of great vessels or mets)",
      value:
        "Vascular invasion or extrahepatic spread (only macrovascular invasion of great vessels or mets)",
    },
    { label: "Any", value: "Any" },
    { label: "Not Available", value: "Not Available" },
  ],
  typeOfVascular: [
    {
      label:
        "Macrovascular invasion: radiographic and vascular invasion based on large",
      value:
        "Macrovascular invasion: radiographic and vascular invasion based on large",
    },
    {
      label:
        "Vessel disease seen on imaging at the time of diagnosis.(Outside Milan).",
      value:
        "Vessel disease seen on imaging at the time of diagnosis.(Outside Milan).",
    },
    {
      label: "Extrahepatic spread(outside Milan)",
      value: "Extrahepatic spread(outside Milan)",
    },
  ],
  tumorWithinMilan: [
    {
      label:
        "Yes (Single lesion 5 cm or less, OR up to 3 separate lesions none larger than 3 cm, and Nomacroscopic vascular invasion or distant metastases): Microvascular invasion is OK",
      value:
        "Yes (Single lesion 5 cm or less, OR up to 3 separate lesions none larger than 3 cm, and Nomacroscopic vascular invasion or distant metastases): Microvascular invasion is OK",
    },
    {
      label:
        "No (Single lesion>5 cm, OR >3 separate lesions any larger than 3 cm, OR evidence of macroscopic vascular invasion or distant metastases)",
      value:
        "No (Single lesion>5 cm, OR >3 separate lesions any larger than 3 cm, OR evidence of macroscopic vascular invasion or distant metastases)",
    },
    {
      label: "Not Enough Information",
      value: "Not Enough Information",
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
function Section7(props) {
  const handleDecimals = (e) => {
    if (
      !/^(\d+)?([.]?\d{0,1})?$/.test(e.target.value + e.key) &&
      e.key !== "Backspace"
    ) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Row gutter={20}>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Largest tumor size/diameter (if multiple nodules, include only the largest)"
                name="largeTurmorValue"
                section="section7"
                {...props}
              />
            }
            name={["section7", "largeTurmorValue"]}
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
          >
            <Input
              style={{ width: "160px" }}
              maxLength={5}
              onKeyDown={handleDecimals}
              addonAfter={
                <div
                  style={{
                    fontWeight: "600",
                    marginTop: "2px",
                  }}
                >
                  CM
                </div>
              }
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="T(Primary Tumor) (as per Current TNM HCC classfication)"
                name="tPrimaryValue"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "tPrimaryValue"]}
          >
            <Radio.Group
              options={[
                {
                  label: "TX",
                  value: "TX",
                },
                { label: "T0", value: "T0" },
                { label: "T1", value: "T1" },
                { label: "T2", value: "T2" },
                { label: "T3a", value: "T3a" },
                { label: "T3b", value: "T3b" },
                { label: "T4", value: "T4" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="N(Regional Lymph Nodes) (as per Current TNM HCC Classfication)"
                name="nRegionalValue"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "nRegionalValue"]}
          >
            <Radio.Group
              options={[
                {
                  label: "NX",
                  value: "NX",
                },
                { label: "N0", value: "N0" },
                { label: "N1", value: "N1" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="M(Distant Metastasis) (as per Current TNM HCC Classfication)"
                name="mRegionalValue"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "mRegionalValue"]}
          >
            <Radio.Group
              options={[
                {
                  label: "MX",
                  value: "MX",
                },
                { label: "M0", value: "M0" },
                { label: "M1", value: "M1" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Anatomic Stage (as per Current TNM HCC Classfication)"
                name="anatomicStageTNM"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "anatomicStageTNM"]}
          >
            <Radio.Group
              options={[
                {
                  label: "Stage I(T1 N0 M0)",
                  value: "Stage I(T1 N0 M0)",
                },
                { label: "Stage II(T2 N0 M0)", value: "Stage II(T2 N0 M0)" },
                {
                  label: "Stage IIIA(T3a N0 M0)",
                  value: "Stage IIIA(T3a N0 M0)",
                },
                {
                  label: "Stage IIIB(T3b N0 M0)",
                  value: "Stage IIIB(T3b N0 M0)",
                },

                {
                  label: "Stage IIIC(T4 N0 M0)",
                  value: "Stage IIIC(T4 N0 M0)",
                },
                {
                  label: "Stage IVA(Any T N1 M0)",
                  value: "Stage IVA(Any T N1 M0)",
                },
                {
                  label: "Stage IVB(Any T Any N M1)",
                  value: "Stage IVB(Any T Any N M1)",
                },
                {
                  label: "NAV/Cannot be staged",
                  value: "NAV/Cannot be staged",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Tumor Differentiation"
                name="tumorDiffValue"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "tumorDiffValue"]}
          >
            <Radio.Group
              options={[
                {
                  label: "Well",
                  value: "Well",
                },
                { label: "Moderate", value: "Moderate" },
                { label: "Poor", value: "Poor" },
                { label: "NAV", value: "NAV" },

                {
                  label: "Undifferentiated/Anaplastic",
                  value: "Undifferentiated/Anaplastic",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="ECOG performance score (or Karnofsky equivalent) (as per Current ECOG performance scale if applicable)"
                name="ecogperformace"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "ecogperformace"]}
          >
            <Radio.Group
              options={[
                {
                  label: "0 (KPS 90 or 100)",
                  value: "0 (KPS 90 or 100)",
                },
                { label: "1 (KPS 70 or 80)", value: "1 (KPS 70 or 80)" },
                { label: "2 (KPS 50 or 60)", value: "2 (KPS 50 or 60)" },
                { label: "3 (KPS 30 or 40)", value: "3 (KPS 30 or 40)" },
                { label: "4 (KPS 10 or 20)", value: "4 (KPS 10 or 20)" },
                { label: "5 (KPS 0 = dead)", value: "5 (KPS 0 = dead)" },
                { label: "NAV", value: "NAV" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Tumor Stage"
                name="tumorStageValue"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "tumorStageValue"]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {fields?.tumorStageValue.map((val) => (
                  <Radio value={val.value}>{val.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Type of Vascular Invasion/Extrahepatic Spread"
                name="typeOfVascular"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "typeOfVascular"]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {fields?.typeOfVascular.map((val) => (
                  <Radio value={val.value}>{val.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Is Microvascular invasion present on histology? (fill only if macrovascular invasion is absent)"
                name="microvascularInvasion"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "microvascularInvasion"]}
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
                  label: "Not enough information from histology",
                  value: "Not enough information from histology",
                },
                {
                  label: "Histology is not available",
                  value: "Histology is not available",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Tumor Within Milan Criteria"
                name="tumorWithinMilan"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "tumorWithinMilan"]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {fields?.tumorWithinMilan.map((val) => (
                  <Radio value={val.value}>{val.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            label={
              <CustomLabel
                title="Child-Pugh classification (at time of diagnosis)"
                name="childPughClassfication"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "childPughClassfication"]}
          >
            <Radio.Group
              options={[
                {
                  label: "Child A",
                  value: "Child A",
                },
                {
                  label: "Child A-B",
                  value: "Child A-B",
                },
                {
                  label: "Child B",
                  value: "Child B",
                },
                {
                  label: "Child C",
                  value: "Child C",
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
                title="Barcelona Clinic Liver Cancer (BCLC) Stage"
                name="barcelonaClinic"
                section="section7"
                {...props}
              />
            }
            rules={[
              {
                required: true,
                message: "required",
              },
            ]}
            name={["section7", "barcelonaClinic"]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {fields?.barcelonaClinic.map((val) => (
                  <Radio value={val.value}>{val.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
export default Section7;
