import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, Row, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfo from "../../helpers/user_info";
import { manageRecordRequest, manageRecordSuccess } from "../../redux/actions";
import recordStatus from "./Record/recordStatus.json";

function Study(props) {
  const [{ records }, setState] = useState({
    records: [],
  });
  const [form] = Form.useForm();
  const {
    manageRecordRequestAsync,
    record_reducer,
    manageRecordSuccess,
    source,
  } = props;

  const {
    record_loading,
    record_request_type,
    records_list,
    filtered_records,
  } = record_reducer;

  useEffect(() => {
    if (records_list && records_list?.length > 0) {
      setState((val) => ({ ...val, records: records_list }));
    }
  }, [records_list]);

  const getRecords = (data) => {
    const { fromDate, toDate } = form.getFieldsValue();
    const obj = {
      request_type: "GET_RECORDS",
      roleName: UserInfo.getRoles(),
      siteId: UserInfo.getSiteID(),
      startDate: moment(new Date(fromDate)).format("YYYY-MM-DD") + " 00:00:00",
      endDate: moment(new Date(toDate)).format("YYYY-MM-DD") + " 23:50:59",
    };
    manageRecordSuccess(null, "GET_RECORDS");
    manageRecordRequestAsync(obj);
  };

  useEffect(() => {
    manageRecordRequestAsync({
      request_type: "GET_RECORDS",
      roleName: UserInfo.getRoles(),
      siteId: UserInfo.getSiteID(),
    });
  }, [manageRecordRequestAsync]);
  console.log(records);
  return (
    <>
      <Card
        title={source === "dashboard" ? "Study Data" : "Records List"}
        size="small"
        className={source === "dashboard" ? "" : "bt-info"}
        extra={
          <>
            {UserInfo.getRoles() === "ROLE_DATAENTRY" && (
              <Link to="/record">
                <Button
                  type="primary"
                  onClick={() => {
                    manageRecordSuccess(null, "GET_RECORD_DETAILS");
                  }}
                  style={{ marginTop: "5px", marginBottom: "5px" }}
                  icon={<PlusCircleOutlined />}
                >
                  Add Record
                </Button>
              </Link>
            )}
          </>
        }
      >
        {(UserInfo.getRoles() === "ROLE_DATAENTRY" ||
          UserInfo.getRoles() === "ROLE_REVIEWER" ||
          UserInfo.getRoles() === "ROLE_PI") && (
          <Form form={form} onFinish={getRecords} labelCol={{ span: 24 }}>
            <Row gutter={20}>
              <Col lg={8} md={12} sm={24} xs={24}>
                <Form.Item label="Search">
                  <Input
                    onChange={(e) => {
                      const target = e.target.value;
                      if (target) {
                        const required = `${target}`?.toLowerCase();
                        setState((val) => ({
                          ...val,
                          records:
                            records_list &&
                            records_list?.length > 0 &&
                            records_list?.filter(
                              (val) =>
                                Object.keys(val).filter(function (ele) {
                                  let truth;
                                  if (typeof val[ele] === "string") {
                                    truth = val[ele]
                                      ?.toLowerCase()
                                      ?.includes(required);
                                  }
                                  return truth;
                                }).length > 0
                            ),
                        }));
                      } else
                        setState((val) => ({
                          ...val,
                          records:
                            records_list &&
                            records_list?.length > 0 &&
                            records_list,
                        }));
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={4} md={12} sm={24} xs={24}>
                <Form.Item name="fromDate" label="From Date">
                  <DatePicker allowClear format={"DD-MMM-YYYY"} />
                </Form.Item>
              </Col>
              <Col lg={4} md={12} sm={24} xs={24}>
                <Form.Item name="toDate" label="To Date">
                  <DatePicker allowClear format="DD-MMM-YYYY" />
                </Form.Item>
              </Col>
              <Col lg={4} md={12} sm={24} xs={24} style={{ marginTop: "38px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={
                    record_loading && record_request_type === "GET_RECORDS"
                  }
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        <Table
          className="bg-primary"
          bordered
          size="small"
          loading={record_request_type === "GET_RECORDS" && record_loading}
          columns={[
            {
              title: "Site ID",
              sorter: (a, b) => String(a.siteId).localeCompare(b.siteId),
              render: (record) => <>{record.siteId}</>,
            },
            {
              title: "Subject ID",
              render: (record) => (
                <>
                  {(UserInfo.getRoles() === "ROLE_DATAENTRY" &&
                    record?.dispatchedTo === "ROLE_DATAENTRY") ||
                  (UserInfo.getRoles() === "ROLE_REVIEWER" &&
                    record?.dispatchedTo === "ROLE_REVIEWER") ||
                  (UserInfo.getRoles() === "ROLE_PI" &&
                    record?.dispatchedTo === "ROLE_PI") ? (
                    <Link to={`/record/${record?.id}`}>
                      <Button size="small" type="primary">
                        {record?.subjectId}
                      </Button>
                    </Link>
                  ) : (
                    <Button size="small" type="primary">
                      {record?.subjectId}
                    </Button>
                  )}
                </>
              ),
              align: "center",
              sorter: (a, b) => String(a.subjectId).localeCompare(b.subjectId),
            },
            {
              title: "Status",
              // dataIndex: "status",
              sorter: (a, b) => String(a.status).localeCompare(b.status),
              render: (record) => <>{recordStatus?.[record?.status]}</>,
            },
            // {
            //   title: "Created Date",
            //   align: "center",
            //   sorter: (a, b) => new Date(a.createDate) - new Date(b.createDate),
            //   render: (record) => (
            //     <>{moment(record?.createDate).format("DD-MMM-YYYY")}</>
            //   ),
            // },
            {
              title: "Created By",
              render: (record) => <>{record?.section14?.createdBy}</>,
            },
            {
              title: "Changed By",
              render: (record) => <>{record?.section14?.changedBy}</>,
            },
            {
              title: "Changed On",
              render: (record) => (
                <>
                  {moment(record?.section14?.changedOn).format(
                    "DD-MM-YYYY,  HH:mm:ss"
                  )}
                </>
              ),
              sorter: (a, b) =>
                String(a.section14?.changedOn).localeCompare(
                  b.section14?.changedOn
                ),
            },
          ]}
          dataSource={
            source === "dashboard"
              ? filtered_records &&
                filtered_records?.length > 0 &&
                filtered_records
              : records
          }
        />
      </Card>
    </>
  );
}
const mapStateToProps = ({ record_reducer }) => {
  return { record_reducer };
};

const mapDispatchToProps = {
  manageRecordRequestAsync: manageRecordRequest,
  manageRecordSuccess: manageRecordSuccess,
};
export default connect(mapStateToProps, mapDispatchToProps)(Study);
