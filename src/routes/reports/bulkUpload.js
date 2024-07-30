import { InboxOutlined } from "@ant-design/icons";
import { Card, Col, Form, Row, Spin } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SwalError, SwalSuccess } from "../../components/Swal";
import UserInfo from "../../helpers/user_info";
function BulkUpload() {
  const [form] = Form.useForm();

  const history = useHistory();
  const apiUrl = window["apiBaseUrl"];
  const [state, setState] = useState({
    submiting: false,
  });
  const handleSubmit = async (file) => {
    if (!UserInfo.getToken()) {
      history.push("/sigin");
    }
    if (!file) {
      SwalError("Please select a file first!");
      return;
    }

    try {
      setState({ ...state, submiting: true });
      const formData = new FormData();
      formData.append("file", file);
      const url = `${apiUrl}/upload`;
      // Use the fetch API to send the file content as an octet stream
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${UserInfo.getToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        //throw new Error(`HTTP error! status: ${response.status}`);
        SwalError("Error while submitting the excel.");
      } else {
        const responseData = await response.text();
        console.log("Response from the server:", responseData);
        // setFile(null)
        SwalSuccess("File uploaded successfully!");
        form.resetFields();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      SwalError("Error while submitting the excel.");
    } finally {
      setState({ ...state, submiting: false });
    }
  };

  const props = {
    action: handleSubmit,
    multiple: false,
  };

  return (
    <Card className="bt-info" title="Bulk Upload">
      <Form
        form={form}
        labelCol={{ span: 24 }}
        onFinish={(data) => {
          const { upload } = data;
          console.log("upload", upload.file.originFileObj);
          handleSubmit(upload.file.originFileObj);
        }}
      >
        <Row align="top" gutter={60}>
          <Col lg={24}>
            <Form.Item
              label="Upload"
              name="upload"
              required
              rules={[
                {
                  required: true,
                  message: "Excel file missing",
                },
              ]}
            >
              {/* <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload> */}
              <Spin
                tip="Uploading Excel File..."
                size="large"
                spinning={state.submiting}
              >
                <Dragger maxCount={1} {...props} disabled={state.submiting}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  {/* <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p> */}
                </Dragger>
              </Spin>
            </Form.Item>
          </Col>
        </Row>
        {/* <Row align="center">
          <Col>
            <Form.Item>
              <Button
                loading={state.submiting}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row> */}
      </Form>
    </Card>
  );
}

export default BulkUpload;
