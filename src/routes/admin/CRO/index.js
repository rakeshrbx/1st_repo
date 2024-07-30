import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button, Card, Modal, Popconfirm, Table, message } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { MainAppStyles } from "../../../components/GlobalStyles";
import theme from "../../../helpers/theme";
import {
  MANAGE_ADMIN_REQUEST,
  manageAdminRequest,
  manageAdminSuccess,
} from "../../../redux/actions";
import AddCROData from "./AddCRO";

function CRO(props) {
  const [{ isAddModalOpen, isEditModalOpen, editDetails }, setState] = useState(
    {
      isAddModalOpen: false,
      isEditModalOpen: false,
      editDetails: null,
    }
  );

  const { manageAdminRequest, admin_reducer, manageAdminSuccess } = props;

  const {
    cro_details_list,
    admin_loading,
    admin_success,
    admin_error,
    admin_request_type,
    cro_details_delete_status,
    cro_details_submit_status,
    admin_action,
    cro_details_edit_status,
  } = admin_reducer;
  const toggleModal = useCallback(() => {
    setState((val) => ({
      ...val,
      isAddModalOpen: false,
      isEditModalOpen: false,
    }));
  }, [setState]);

  useEffect(() => {
    if (admin_action === MANAGE_ADMIN_REQUEST) {
      if (admin_request_type === "ADD_CRO_DETAILS") {
        if (admin_success) {
          message.success(
            cro_details_submit_status?.id > 0 &&
              "CRO Master Data is Saved Successfully"
          );
          manageAdminRequest({
            request_type: "GET_CRO_DETAILS",
            payload: {},
          });
          toggleModal();
        } else if (admin_error) {
          message.error(admin_error);
        }
      } else if (admin_request_type === "EDIT_CRO_DETAILS") {
        if (admin_success) {
          message.success(
            cro_details_edit_status?.id > 0 &&
              "CRO Master Data is Updated Successfully"
          );
          manageAdminRequest({
            request_type: "GET_CRO_DETAILS",
            payload: {},
          });
          toggleModal();
        } else if (admin_error) {
          message.error(admin_error);
        }
      } else if (admin_request_type === "DELETE_CRO_DETAILS") {
        if (admin_success) {
          message.success(cro_details_delete_status);
          manageAdminRequest({
            request_type: "GET_CRO_DETAILS",
          });
        } else if (admin_error) {
          message.error(admin_error);
        }
      }
    }
  }, [
    toggleModal,
    cro_details_submit_status,
    admin_loading,
    admin_action,
    admin_error,
    admin_request_type,
    admin_success,
    cro_details_delete_status,
    manageAdminRequest,
    cro_details_edit_status,
  ]);

  useEffect(() => {
    manageAdminRequest({ request_type: "GET_CRO_DETAILS", payload: {} });
  }, [manageAdminRequest]);

  return (
    <>
      <Card
        className="bt-info"
        size="small"
        title="CRO Details"
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
            Add CRO Details
          </Button>
        }
      >
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 40px", color: "grey", padding: "0" }}>
              CRO
            </h4>
          }
          width="90vw"
          height="90%"
          centered
          forceRender
          destroyOnClose
          footer={null}
          open={isAddModalOpen}
          onCancel={() =>
            setState((val) => ({
              ...val,
              isAddModalOpen: false,
            }))
          }
        >
          <MainAppStyles>
            <AddCROData />
          </MainAppStyles>
        </Modal>
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 40px", color: "grey", padding: "0" }}>
              CRO
            </h4>
          }
          width="90vw"
          height="90%"
          centered
          footer={null}
          open={isEditModalOpen}
          onCancel={() =>
            setState((val) => ({
              ...val,
              isEditModalOpen: false,
              editDetails: null,
            }))
          }
        >
          <MainAppStyles>
            <AddCROData editDetails={editDetails} />
          </MainAppStyles>
        </Modal>
        <Table
          className="bg-primary"
          bordered
          size="small"
          loading={admin_loading && admin_request_type === "GET_CRO_DETAILS"}
          columns={[
            {
              title: "CRO Code",
              dataIndex: "croCode",
              sorter: (a, b) => String(a.croCode).localeCompare(b.croCode),
            },
            {
              title: "CRO Name",
              dataIndex: "croName",
              sorter: (a, b) => String(a.croName).localeCompare(b.croName),
            },
            {
              title: "Email",
              dataIndex: "email",
            },
            {
              title: "Mobile",
              dataIndex: "mobile",
            },
            {
              title: "Created By",
              dataIndex: "createdBy",
            },
            {
              title: "Changed By",
              dataIndex: "changedBy",
            },
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
                    onConfirm={() => {
                      manageAdminRequest({
                        request_type: "DELETE_CRO_DETAILS",
                        id: record?.id,
                      });
                    }}
                    onCancel="Cancel"
                    cancelText="Cancel"
                  >
                    <DeleteFilled style={{ color: "red" }} />
                  </Popconfirm>
                </div>
              ),
            },
          ].map((val, idx) => ({ ...val, key: idx }))}
          dataSource={
            cro_details_list &&
            cro_details_list?.length > 0 &&
            cro_details_list.map((val) => ({
              ...val,
              email: val.communicationDetails?.email,
              mobile: val?.communicationDetails?.mobile_number,
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
  manageAdminSuccess: manageAdminSuccess,
};
export default connect(mapStateToProps, mapDispatchToProps)(CRO);
