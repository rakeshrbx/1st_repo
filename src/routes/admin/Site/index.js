import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  message,
} from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { MainAppStyles } from "../../../components/GlobalStyles";
import theme from "../../../helpers/theme";
import { manageAdminRequest } from "../../../redux/actions";
import AddSite from "./AddSite";

function Site(props) {
  const [{ isAddModalOpen, isEditModalOpen, editDetails, records }, setState] =
    useState({
      isAddModalOpen: false,
      isEditModalOpen: false,
      editDetails: null,
      records: null,
    });

  const { manageAdminRequest, admin_reducer } = props;

  const {
    site_details_list,
    admin_loading,
    admin_success,
    admin_error,
    admin_request_type,
    site_details_delete_status,
    site_details_edit_status,
    site_details_submit_status,
  } = admin_reducer;

  const toggleModal = useCallback(() => {
    setState((val) => ({
      ...val,
      isAddModalOpen: false,
      isEditModalOpen: false,
    }));
  }, [setState]);

  useEffect(() => {
    manageAdminRequest({ request_type: "GET_SITE_DETAILS", payload: {} });
  }, [manageAdminRequest]);

  useEffect(() => {
    if (site_details_list && site_details_list?.length > 0)
      setState((val) => ({
        ...val,
        records: site_details_list,
      }));
  }, [site_details_list]);

  useEffect(() => {
    if (admin_request_type === "ADD_SITE_DETAILS") {
      if (admin_success) {
        message.success(
          site_details_submit_status?.id > 0 &&
            "Site Master Data is Saved Successfully"
        );
        manageAdminRequest({
          request_type: "GET_SITE_DETAILS",
          payload: {},
        });

        toggleModal();
      } else if (admin_error) {
        message.error(admin_error);
      }
    } else if (admin_request_type === "EDIT_SITE_DETAILS") {
      if (admin_success) {
        message.success(
          site_details_edit_status?.id > 0 &&
            "Site Master Data is Updated Successfully"
        );
        manageAdminRequest({
          request_type: "GET_SITE_DETAILS",
          payload: {},
        });
        toggleModal();
      } else if (admin_error) {
        message.error(admin_error);
      }
    } else if (admin_request_type === "DELETE_SITE_DETAILS") {
      if (admin_success) {
        message.success(site_details_delete_status);
        manageAdminRequest({
          request_type: "GET_SITE_DETAILS",
        });
      } else if (admin_error) {
        message.error(admin_error);
      }
    }
  }, [
    site_details_delete_status,
    site_details_edit_status,
    site_details_submit_status,
    manageAdminRequest,
    toggleModal,
    admin_request_type,
    admin_error,
    admin_loading,
    admin_success,
  ]);

  return (
    <>
      <Card
        className="bt-info"
        size="small"
        title="Site Details"
        extra={
          <Button
            icon={<PlusCircleFilled />}
            type="primary"
            onClick={() => {
              setState((val) => ({
                ...val,
                isAddModalOpen: true,
              }));
            }}
            style={{ margin: "16px", fontWeight: "600" }}
          >
            Add Site Details
          </Button>
        }
      >
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 40px", color: "grey", padding: "0" }}>
              Site
            </h4>
          }
          width="90vw"
          height="90%"
          centered
          footer={null}
          visible={isAddModalOpen}
          onCancel={() =>
            setState((val) => ({
              ...val,
              isAddModalOpen: false,
            }))
          }
        >
          <MainAppStyles>
            <AddSite toggleModal={toggleModal} />
          </MainAppStyles>
        </Modal>
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 40px", color: "grey", padding: "0" }}>
              Site
            </h4>
          }
          width="90vw"
          height="90%"
          centered
          footer={null}
          visible={isEditModalOpen}
          onCancel={() =>
            setState((val) => ({
              ...val,
              isEditModalOpen: false,
              editDetails: null,
            }))
          }
        >
          <MainAppStyles>
            <AddSite toggleModal={toggleModal} editDetails={editDetails} />
          </MainAppStyles>
        </Modal>
        <Row align={"start"}>
          <Col lg={6} md={8} sm={12} xs={24}>
            <Form.Item>
              <Input
                placeholder="Search"
                onChange={(e) => {
                  const target = e.target.value;
                  if (target) {
                    const required = `${target}`?.toLowerCase();
                    setState((val) => ({
                      ...val,
                      records:
                        site_details_list &&
                        site_details_list?.length > 0 &&
                        site_details_list?.filter(
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
                        site_details_list &&
                        site_details_list?.length > 0 &&
                        site_details_list,
                    }));
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Table
          className="bg-primary"
          bordered
          size="small"
          loading=""
          columns={[
            {
              title: "Site ID",
              dataIndex: "siteId",
              sorter: (a, b) => String(a.siteId).localeCompare(b.siteId),
            },
            {
              title: "Site Name",
              dataIndex: "siteName",
              sorter: (a, b) => String(a.siteName).localeCompare(b.siteName),
            },
            { title: "Email", dataIndex: "email" },
            { title: "Mobile", dataIndex: "mobile_number" },
            { title: "Created By", dataIndex: "createdBy" },
            { title: "Changed By", dataIndex: "changedBy" },
            {
              title: "Changed On",
              render: (record) =>
                record?.changedOn && (
                  <>
                    {moment(record?.changedOn).format("DD-MM-YYYY, HH:mm:ss")}
                  </>
                ),
            },
            {
              title: "Actions",
              align: "center",
              render: (record) => (
                <div className="d-flex justify-content-center">
                  <EditFilled
                    style={{
                      color: theme?.token?.colorPrimary,
                      marginRight: "16px",
                    }}
                    onClick={() =>
                      setState((val) => ({
                        ...val,
                        isEditModalOpen: true,
                        editDetails: { ...record },
                      }))
                    }
                  />
                  <Popconfirm
                    title="Delete?"
                    onConfirm={() =>
                      manageAdminRequest({
                        request_type: "DELETE_SITE_DETAILS",
                        id: record?.id,
                      })
                    }
                    onCancel="Cancel"
                    cancelText="Cancel"
                  >
                    <DeleteFilled style={{ color: "red" }} />
                  </Popconfirm>
                </div>
              ),
            },
          ]}
          dataSource={
            records &&
            records?.length > 0 &&
            records.map((val) => ({
              ...val,
              email: val.communicationDetails?.email,
              mobile_number: val?.communicationDetails?.mobile_number,
            }))
          }
        />
      </Card>
    </>
  );
}
const mapStateToProps = ({ admin_reducer }) => {
  return { admin_reducer };
};

const mapDispatchToProps = {
  manageAdminRequest: manageAdminRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Site);
