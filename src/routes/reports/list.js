import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as XLSX from "xlsx";
import { SwalError, SwalSuccess } from "../../components/Swal";
import UserInfo from "../../helpers/user_info";
import { objectToQueryString } from "../../helpers/utils";
import {
  manageAdminRequest,
  manageRecordRequest,
  manageRecordSuccess,
} from "../../redux/actions";
import RecordsDashboard from "../records/RecordsDashboard";

export const ReportsList = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [state, setState] = useState({
    searching: false,
    report_type: "overview",
  });
  const [sites, setSites] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [excelBlob, setExcelBlob] = useState(null);
  const [_html_, sethtml] = useState("");
  const {
    manageRecordRequest,
    record_reducer,
    manageAdminRequest,
    admin_reducer,
    manageRecordSuccess,
  } = props;
  const role = UserInfo.getRoles();
  const token = UserInfo.getToken();
  const apiUrl = window["apiBaseUrl"];

  const [tableList, setTable] = useState({
    columns: [],
    rows: [],
  });
  const { filtered_records, record_loading, record_request_type } =
    record_reducer;
  const { overview_report, admin_loading, admin_request_type } = admin_reducer;

  useEffect(() => {
    form.setFieldValue("reportType", "overview");
    if (token) {
      const data = jwtDecode(token);
      if (
        data &&
        role &&
        (role === "ROLE_DATAENTRY" || role === "ROLE_REVIEWER")
      ) {
        // setSiteId(data.SiteId);
        form.setFieldsValue({
          siteId: data.SiteId,
        });
      }
    }

    if (role && role !== "ROLE_DATAENTRY" && role !== "ROLE_REVIEWER") {
      getSiteDetails();
    }
  }, []);
  const handleSearch = (data) => {
    if (data.fromSubjectId && !data.toSubjectId) {
      message.warning("TO Subject is missing");
      return false;
    }
    if (data.toSubjectId && !data.fromSubjectId) {
      message.warning("From Subject is missing");
      return false;
    }

    if (data.startDate) {
      data.startDate = moment(new Date(data.startDate)).format("YYYY-MM-DD");
    }
    if (data.endDate) {
      data.endDate = moment(new Date(data.endDate)).format("YYYY-MM-DD");
    }
    Object.keys(data).map((key) => {
      if (key == "siteId") {
        if (data[key]?.length > 0) {
          data[key] = data[key]?.reduce(
            (acc, val, idx) => (acc ? `${acc},${val}` : val),
            ""
          );
        } else {
          data[key] = "ALL";
        }
      }
      if (!data[key]) delete data[key];
    });

    const {
      reportType,
      startDate,
      endDate,
      siteId,
      subjectId,
      fromSubjectId,
      toSubjectId,
    } = data;
    const siteIdStr = "";
    // console.log(fromSubjectId, toSubjectId);
    // const siteIdStr =
    //   siteId?.length > 0
    //     ? siteId?.reduce(
    //         (acc, val, idx) => (acc ? `${acc},${val}` : val),
    //         "ALL"
    //       )
    //     : "ALL";
    if (data.reportType === "summary") {
      if (data.startDate) {
        data.startDate = moment(new Date(data.startDate)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      if (data.endDate) {
        data.endDate = moment(new Date(data.endDate)).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      //console.log(fromSubjectId, toSubjectId);
      manageRecordSuccess(null, "GET_FILTERED_RECORDS");
      manageRecordRequest({
        request_type: "GET_FILTERED_RECORDS",
        roleName: "ALL",
        ...data,
      });
    } else if (data.reportType === "overview") {
      // console.log({
      //   SiteId:
      //     siteId?.length > 0 &&
      //     siteId?.reduce((acc, val, idx) => (acc ? `${acc},${val}` : val), ""),
      // });
      manageAdminRequest({
        request_type: "GET_OVERVIEW_REPORT",
        roleName: "ALL",
        ...data,
      });
    } else {
      setState({ ...state, searching: true });
      let queryParams = "";
      if (!UserInfo.getToken()) {
        //   navigate("/login");
        history.push("/");
      }

      // if (startDate && endDate) {
      //   queryParams = `fromDate=${moment(new Date(startDate)).format(
      //     "YYYY-MM-DD"
      //   )}&toDate=${moment(new Date(endDate)).format("YYYY-MM-DD")}`;
      // } else if (
      //   (!siteId || siteId === "") &&
      //   (!subjectId || subjectId === "")
      // ) {
      //   alert("Enter fields to proceed");
      //   return false;
      // }
      // if (fromSubjectId) {
      //   queryParams += queryParams.length
      //     ? `&fromSubjectId=${fromSubjectId}`
      //     : `fromSubjectId=${fromSubjectId}`;
      // }

      // if (toSubjectId) {
      //   queryParams += queryParams.length
      //     ? `&toSubjectId=${toSubjectId}`
      //     : `toSubjectId=${toSubjectId}`;
      // }

      // queryParams += queryParams.length
      //   ? `&siteId=${siteIdStr}`
      //   : `siteId=${siteIdStr}`;

      setTableData([]);
      sethtml(null);
      setExcelBlob(null);
      const url =
        reportType === "addData"
          ? `${apiUrl}/export/excel?${objectToQueryString(data)}`
          : `${apiUrl}/export/auditexcel?${objectToQueryString(data)}`;

      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/octet-stream",
        },
        responseType: "blob",
      })
        .then((response) => {
          console.log("response", response);
          if (!response.ok) {
            throw new Error(
              "Request failed with status code " + response.status
            );
          }
          return response.blob();
        })
        .then((blob) => {
          handleExcelBlob(blob, reportType);
          setExcelBlob(blob);
        })
        .catch((err) => {
          SwalError(JSON.stringify(err));
        })
        .finally(() => {
          setState({ ...state, searching: false });
        });
    }
  };

  const getSiteDetails = () => {
    if (!UserInfo.getToken()) {
      history.push("/sigin");
    }
    fetch(`${apiUrl}/siteids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserInfo.getToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setSites([]);
          throw new Error("Request failed with status code " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setSites(data);
        // if(data?.length) setUserInfo(prevUserInfo => ({ ...prevUserInfo, siteId: data[0].siteId }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Function to handle the Excel blob
  const handleExcelBlob = (blob, reportType) => {
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: "binary", cellHTML: true });
      // Assuming you're interested in the first sheet
      const sheetName =
        reportType == "addData"
          ? "ExportTemplate"
          : reportType == "audit"
          ? "ExportAuditTemplate"
          : "Sheet 1";
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON format (array of arrays)
      let jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log("jsonData", jsonData);
      let htmlData = XLSX.utils.sheet_to_html(sheet, {
        id: "1",
      });

      // Update state with table data
      setTableData(jsonData);
      sethtml(htmlData);
    };

    reader.readAsBinaryString(blob);
  };
  const downloadExcel = () => {
    if (excelBlob) {
      const url = window.URL.createObjectURL(excelBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `export_${moment().format(
        "YYYY-MM-DD"
      )}_to_${moment().format("YYYY-MM-DD")}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      form.setFieldsValue({
        startDate: null,
        endDate: null,
      });
      SwalSuccess("Report downloaded successfully!");
    }
  };
  return (
    <>
      <Card
        className="bt-info"
        title="Dashboard"
        size="small"
        // style={{ minHeight: "100vh" }}
      >
        <Form
          onFinish={handleSearch}
          form={form}
          labelCol={{
            span: 24,
          }}
        >
          <Row
            gutter={20}
            align="bottom"
            // style={{ paddingLeft: "32px", marginBottom: "64px" }}
          >
            <Col xl={4} lg={4} md={8} sm={12}>
              <Form.Item
                name="reportType"
                label="Report Type"
                required
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Report Type required",
                  },
                ]}
              >
                <Select
                  onChange={(e) => {
                    setState((val) => ({
                      ...val,
                      report_type: e,
                    }));
                    sethtml("");
                  }}
                  options={[
                    {
                      value: "overview",
                      label: "Overview",
                    },
                    {
                      value: "summary",
                      label: "Study Data",
                    },
                    {
                      value: "addData",
                      label: "HCC Reports",
                    },
                    {
                      value: "audit",
                      label: "Audit Log",
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col xl={4} lg={3} md={8} sm={12}>
              <Form.Item
                name="startDate"
                label="From Date"
                rules={[
                  {
                    required: true,
                    message: "From Date required",
                  },
                ]}
              >
                <DatePicker format={"DD-MMM-YYYY"} />
              </Form.Item>
            </Col>
            <Col xl={4} lg={3} md={8} sm={12}>
              <Form.Item
                name="endDate"
                label="To Date"
                rules={[
                  {
                    required: true,
                    message: "To Date required",
                  },
                ]}
              >
                <DatePicker format={"DD-MMM-YYYY"} />
              </Form.Item>
            </Col>

            <Col xl={12} lg={4} md={8} sm={12}>
              <Form.Item name="siteId" label="Site">
                {role === "ROLE_DATAENTRY" || role === "ROLE_REVIEWER" ? (
                  <>
                    <Input disabled type="text" className="form-control" />
                  </>
                ) : (
                  <>
                    <Select allowClear mode="multiple">
                      {/* <Select.Option value="ALL">ALL</Select.Option> */}
                      {sites &&
                        sites.map((option, index) => (
                          <Select.Option key={index} value={option.siteId}>
                            {option.siteId} - {option.siteName}
                          </Select.Option>
                        ))}
                    </Select>
                  </>
                )}
              </Form.Item>
            </Col>

            {/* <Col xl={5} lg={5} md={8} sm={12}>
              <Form.Item name="subjectId" label="Subject">
                <Input />
              </Form.Item>
            </Col> */}

            <Col xl={8} lg={8} md={8} sm={12}>
              <Space.Compact>
                <Form.Item
                  name="fromSubjectId"
                  label="Subject ID (From)"
                  // dependencies={["toSubjectId"]}
                  // rules={[
                  //   ({ getFieldValue }) => ({
                  //     validator(_, value) {
                  //       if (!form.getFieldValue("toSubjectId") && value) {
                  //         return Promise.reject(
                  //           new Error("To Subject Id is missing")
                  //         );
                  //       }
                  //       Promise.resolve();
                  //     },
                  //   }),
                  // ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="toSubjectId"
                  label="Subject ID (To)"
                  // dependencies={["fromSubjectId"]}
                  // rules={[
                  //   ({ getFieldValue }) => ({
                  //     validator(_, value) {
                  //       if (!form.getFieldValue("fromSubjectId") && value) {
                  //         return Promise.reject(
                  //           new Error("From Subject Id is missing")
                  //         );
                  //       }
                  //       Promise.resolve();
                  //     },
                  //   }),
                  // ]}
                >
                  <Input />
                </Form.Item>
                {/* <Input
                  style={{
                    width: "20%",
                  }}
                  defaultValue="0571"
                />
                <Input
                  style={{
                    width: "80%",
                  }}
                  defaultValue="26888888"
                /> */}
              </Space.Compact>
            </Col>

            <Col xl={3} lg={5} md={8} sm={12}>
              <Form.Item>
                <Button
                  loading={state.searching}
                  htmlType="submit"
                  type="primary"
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {state?.report_type === "summary" && filtered_records?.length > 0 && (
          <RecordsDashboard source={"dashboard"} />
        )}

        {state?.report_type === "overview" && overview_report?.length > 0 && (
          <TableContainer2>
            <Card title="Overview">
              <Table
                scroll={{
                  x: "calc(700px + 50%)",
                }}
                bordered
                size="small"
                loading={
                  admin_request_type === "GET_OVERVIEW_REPORT" && admin_loading
                }
                columns={[
                  {
                    title: "Site ID",
                    dataIndex: "siteid",
                    width: 100,
                    fixed: "left",
                    align: "center",
                  },
                  {
                    title: "Created",
                    dataIndex: "init",
                    width: 100,
                    // fixed: "left",
                    align: "center",
                  },
                  {
                    title: "Data Entry",
                    children: [
                      {
                        title: "In progress",
                        align: "center",
                        children: [
                          {
                            title: "Submission",
                            dataIndex:
                              "inprogress_at_dataentry_from_reviewer_submission",
                            width: 150,
                            align: "center",
                          },
                          {
                            title: "Resubmission",
                            dataIndex:
                              "inprogress_at_dataentry_from_reviewer_resubmission",
                            width: 150,
                            align: "center",
                          },
                        ],
                      },
                      {
                        title: "Submitted",
                        dataIndex: "submitted_to_reviewer_from_dataentry",
                        width: 150,
                        align: "center",
                      },
                      {
                        title: "Resubmitted",
                        dataIndex: "resubmitted_to_reviewer_from_dataentry",
                        width: 150,
                        align: "center",
                      },
                    ],
                    align: "center",
                  },
                  {
                    title: "Reviewer",
                    children: [
                      {
                        title: "In progress",
                        align: "center",
                        children: [
                          {
                            title: "Data Entry Submission",
                            dataIndex:
                              "inprogress_at_reviewer_from_dataentry_submission",
                            width: 150,
                            align: "center",
                          },
                          {
                            title: "Data Entry Resubmission",
                            dataIndex:
                              "inprogress_at_reviewer_from_dataentry_resubmission",
                            width: 150,
                            align: "center",
                          },
                          {
                            title: "PI Submission",
                            dataIndex:
                              "inprogress_at_reviewer_from_pi_submission",
                            width: 150,
                            align: "center",
                          },
                          {
                            title: "PI Resubmission",
                            dataIndex:
                              "inprogress_at_reviewer_from_pi_resubmission",
                            width: 150,
                            align: "center",
                          },
                        ],
                      },
                      {
                        title: "Submitted",
                        align: "center",
                        children: [
                          {
                            title: "PI Submission",
                            dataIndex: "submitted_to_pi",
                            width: 150,
                            align: "center",
                          },
                          {
                            title: "Data Entry Submission",
                            dataIndex: "submitted_to_dataentry_from_reviewer",
                            width: 150,
                            align: "center",
                          },
                        ],
                      },
                      {
                        title: "Resubmitted",
                        align: "center",
                        children: [
                          {
                            title: "PI Resubmission",
                            dataIndex: "resubmitted_to_pi",
                            width: 150,
                            align: "center",
                          },
                          {
                            title: "Data Entry Resubmission",
                            dataIndex: "resubmitted_to_dataentry_from_reviewer",
                            width: 150,
                            align: "center",
                          },
                        ],
                      },
                    ],
                    align: "center",
                  },
                  {
                    title: "PI",
                    children: [
                      {
                        title: "In progress",
                        align: "center",
                        children: [
                          {
                            title: "Submission",
                            dataIndex: "inprogress_at_pi_submission",
                            width: 150,
                            align: "center",
                          },
                          {
                            title: "Resubmission",
                            dataIndex: "inprogress_at_pi_resubmission",
                            width: 150,
                            align: "center",
                          },
                        ],
                      },
                      {
                        title: "Submitted",
                        dataIndex: "submitted_to_reviwer_from_pi",
                        width: 150,
                        align: "center",
                      },
                      {
                        title: "Resubmitted",
                        dataIndex: "resubmitted_to_reviwer_from_pi",
                        width: 150,
                        align: "center",
                      },
                    ],
                    align: "center",
                  },
                  {
                    align: "center",
                    width: 100,
                    title: "Signed Off",
                    dataIndex: "sign_off",
                  },
                  {
                    title: "Total",
                    dataIndex: "entered",
                    width: 100,
                    fixed: "right",
                    align: "center",
                  },
                ]}
                dataSource={overview_report}
              />
            </Card>
          </TableContainer2>
        )}

        {state.searching && state?.report_type === "addData" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" spinning={state.searching} />
          </div>
        ) : _html_ && state?.report_type === "addData" ? (
          <>
            <Card
              title="HCC Reports"
              extra={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                    onClick={downloadExcel}
                  >
                    Download Excel
                  </Button>
                </div>
              }
            >
              <TableContainer>
                <div
                  className="table-container"
                  dangerouslySetInnerHTML={{
                    __html: _html_,
                  }}
                ></div>
              </TableContainer>
            </Card>
          </>
        ) : _html_ && state?.report_type === "audit" ? (
          <>
            <Card
              title="Audit Log"
              extra={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                    onClick={downloadExcel}
                  >
                    Download Excel
                  </Button>
                </div>
              }
            >
              <TableContainer>
                <div
                  className="table-container"
                  dangerouslySetInnerHTML={{
                    __html: _html_,
                  }}
                ></div>
              </TableContainer>
            </Card>
          </>
        ) : (
          <></>
        )}
      </Card>
      {/* {state?.report_type === "addData" && <RecordsDashboard />} */}
    </>
  );
};

const mapStateToProps = ({ record_reducer, admin_reducer }) => {
  return { record_reducer, admin_reducer };
};

const mapDispatchToProps = {
  manageRecordRequest: manageRecordRequest,
  manageAdminRequest: manageAdminRequest,
  manageRecordSuccess: manageRecordSuccess,
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportsList);

const TableContainer = styled.div`
  /* Styles for the scrollable container */
  .table-container {
    overflow-x: auto; /* Enable horizontal scrolling */
    max-width: 100%; /* Ensure it doesn't overflow the parent */
    padding: 10px; /* Add padding for spacing */
    max-height: 60vh;
  }

  /* Styles for the table itself */
  table {
    width: 100%; /* Take full width of its container */
    border-collapse: collapse; /* Remove space between cells */
    border: 1px solid #ddd; /* Add border for clarity */
  }

  table th,
  table td {
    padding: 2px; /* Add padding inside cells */
    text-align: left; /* Align text to the left */
    border: 1px solid #ddd; /* Add border between cells */
    overflow: hidden; /* Hide overflowing content */
    white-space: nowrap; /* Prevent text from wrapping */
  }

  table th {
    background-color: #f2f2f2; /* Light gray background for headers */
    color: #333; /* Dark text color for headers */
  }

  table tbody tr:nth-child(even) {
    background-color: #f9f9f9; /* Alternate row background color */
  }

  td:not([data-v]) {
    display: none;
  }

  table tr:nth-child(-n + 3) {
    font-weight: bold;
  }
`;

const TableContainer2 = styled.div`
  .ant-table-thead .ant-table-cell {
    // background: #0073aa;
    border: 1px solid #0073aa;
    color: "black";
  }
`;
