import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button, Card, Modal, Popconfirm, Table, message } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { MainAppStyles } from "../../../components/GlobalStyles";
import theme from "../../../helpers/theme";
import { manageAdminRequest } from "../../../redux/actions";
import AddSponsor from "./AddSponsor";

function Sponsor(props) {
  const [{ isAddModalOpen, isEditModalOpen, editDetails }, setState] = useState(
    {
      isAddModalOpen: false,
      isEditModalOpen: false,
      editDetails: null,
    }
  );

  const { manageAdminRequest, admin_reducer } = props;

  const {
    sponsor_details_list,
    admin_loading,
    admin_success,
    admin_error,
    admin_request_type,
    sponsor_details_delete_status,
    sponsor_details_submit_status,
    sponsor_details_edit_status,
  } = admin_reducer;

  const toggleModal = useCallback(
    (modal_type) => {
      setState((val) => ({
        ...val,
        isAddModalOpen: false,
        isEditModalOpen: false,
      }));
    },
    [setState]
  );

  useEffect(() => {
    manageAdminRequest({ request_type: "GET_SPONSOR_DETAILS", payload: {} });
  }, [manageAdminRequest]);

  useEffect(() => {
    if (admin_request_type === "ADD_SPONSOR_DETAILS") {
      if (admin_success) {
        message.success(
          sponsor_details_submit_status?.id > 0 &&
            "Sponsor Master Data is Saved Successfully"
        );
        manageAdminRequest({
          request_type: "GET_SPONSOR_DETAILS",
          payload: {},
        });
        toggleModal();
      } else if (admin_error) {
        message.error(admin_error);
      }
    } else if (admin_request_type === "EDIT_SPONSOR_DETAILS") {
      if (admin_success) {
        message.success(
          sponsor_details_edit_status?.id > 0 &&
            "Sponsor Master Data is Updated Successfully"
        );
        manageAdminRequest({
          request_type: "GET_SPONSOR_DETAILS",
          payload: {},
        });
        toggleModal();
      } else if (admin_error) {
        message.error(admin_error);
      }
    } else if (admin_request_type === "DELETE_SPONSOR_DETAILS") {
      if (admin_success) {
        message.success(sponsor_details_delete_status);
        manageAdminRequest({
          request_type: "GET_SPONSOR_DETAILS",
        });
      } else if (admin_error) {
        message.error(admin_error);
      }
    }
  }, [
    sponsor_details_delete_status,
    sponsor_details_edit_status,
    sponsor_details_submit_status,
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
        title="Sponsor Details"
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
            Add Sponsor Details
          </Button>
        }
      >
        <Table
          className="bg-primary"
          bordered
          size="small"
          loading={
            admin_request_type === "ADD_SPONSOR_DETAILS" && admin_loading
          }
          columns={[
            {
              title: "Sponsor Code",
              dataIndex: "sponsorCode",
              sorter: (a, b) =>
                String(a.sponsorCode).localeCompare(b.sponsorCode),
            },
            {
              title: "Sponsor Name",
              dataIndex: "sponsorName",
              sorter: (a, b) =>
                String(a.sponsorName).localeCompare(b.sponsorName),
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
                        request_type: "DELETE_SPONSOR_DETAILS",
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
            sponsor_details_list &&
            sponsor_details_list?.length > 0 &&
            sponsor_details_list.map((val) => ({
              ...val,
              email: val.communicationDetails?.email,
              mobile_number: val?.communicationDetails?.mobile_number,
            }))
          }
        />
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 26px", color: "grey", padding: "0" }}>
              Sponsor
            </h4>
          }
          width="90vw"
          height="90%"
          centered
          destroyOnClose
          forceRender
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
            <AddSponsor toggleModal={toggleModal} />
          </MainAppStyles>
        </Modal>
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 26px", color: "grey", padding: "0" }}>
              Sponsor
            </h4>
          }
          width="90vw"
          height="90%"
          centered
          destroyOnClose
          forceRender
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
            <AddSponsor toggleModal={toggleModal} editDetails={editDetails} />
          </MainAppStyles>
        </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(Sponsor);
