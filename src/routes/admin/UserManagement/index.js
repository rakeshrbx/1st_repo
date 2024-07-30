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
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { MainAppStyles } from "../../../components/GlobalStyles";
import theme from "../../../helpers/theme";
import { manageAdminRequest } from "../../../redux/actions";
import AddUser from "./AddUser";

function UserManagement(props) {
  const [{ isAddModalOpen, isEditModalOpen, editDetails, records }, setState] =
    useState({
      isAddModalOpen: false,
      isEditModalOpen: false,
      editDetails: null,
      records: null,
    });

  const { manageAdminRequest, admin_reducer } = props;

  const {
    user_details_list,
    admin_loading,
    admin_success,
    admin_error,
    admin_request_type,
    user_details_delete_status,
    user_details_submit_status,
    user_details_edit_status,
  } = admin_reducer;

  const toggleModal = useCallback(() => {
    setState((val) => ({
      ...val,
      isAddModalOpen: false,
      isEditModalOpen: false,
    }));
  }, [setState]);

  useEffect(() => {
    manageAdminRequest({ request_type: "GET_USER_DETAILS", payload: {} });
  }, [manageAdminRequest]);

  useEffect(() => {
    if (user_details_list && user_details_list?.length > 0)
      setState((val) => ({
        ...val,
        records: user_details_list,
      }));
  }, [user_details_list]);

  useEffect(() => {
    if (admin_request_type === "ADD_USER_DETAILS") {
      if (admin_success) {
        message.success(user_details_submit_status?.message);
        manageAdminRequest({
          request_type: "GET_USER_DETAILS",
          payload: {},
        });
        toggleModal();
      } else if (admin_error) {
        message.error(admin_error);
      }
    } else if (admin_request_type === "EDIT_USER_DETAILS") {
      if (admin_success) {
        message.success(user_details_edit_status?.message);
        manageAdminRequest({
          request_type: "GET_USER_DETAILS",
          payload: {},
        });
        toggleModal();
      } else if (admin_error) {
        message.error(admin_error);
      }
    } else if (admin_request_type === "DELETE_USER_DETAILS") {
      if (admin_success) {
        message.success(user_details_delete_status?.message);
        manageAdminRequest({
          request_type: "GET_USER_DETAILS",
        });
      } else if (admin_error) {
        message.error(admin_error);
      }
    }
  }, [
    user_details_delete_status,
    user_details_edit_status,
    user_details_submit_status,
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
        title="User Details"
        extra={
          <Button
            icon={<PlusCircleFilled />}
            type="primary"
            onClick={() => {
              setState((val) => ({
                ...val,
                isAddModalOpen: true,
                editFormDetails: {},
              }));
            }}
            style={{ margin: "16px", fontWeight: "600" }}
          >
            Add User Details
          </Button>
        }
      >
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 40px", color: "grey", padding: "0" }}>
              Users
            </h4>
          }
          width="50vw"
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
            <AddUser toggleModal={toggleModal} />
          </MainAppStyles>
        </Modal>
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 40px", color: "grey", padding: "0" }}>
              Users
            </h4>
          }
          width="50vw"
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
            <AddUser toggleModal={toggleModal} editDetails={editDetails} />
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
                        user_details_list &&
                        user_details_list?.length > 0 &&
                        user_details_list?.filter(
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
                        user_details_list &&
                        user_details_list?.length > 0 &&
                        user_details_list,
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
          loading={admin_request_type === "GET_USER_DETAILS" && admin_loading}
          columns={[
            {
              title: "Username",
              dataIndex: "username",
              sorter: (a, b) => String(a.username).localeCompare(b.username),
            },
            {
              title: "Site ID",
              dataIndex: "siteId",
              sorter: (a, b) => String(a.siteId).localeCompare(b.siteId),
            },
            {
              title: "Roles",
              render: (record) => (
                <>{record?.roles[0]?.name?.split("_")?.at(-1)}</>
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
                        request_type: "DELETE_USER_DETAILS",
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
          dataSource={records && records?.length > 0 && records}
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
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
