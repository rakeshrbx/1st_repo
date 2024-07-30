import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button, Card, Modal, Popconfirm, Table, message } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { MainAppStyles } from "../../../components/GlobalStyles";
import theme from "../../../helpers/theme";
import { manageAdminRequest } from "../../../redux/actions";
import AddStudy from "./AddStudy";

function Study(props) {
  const [{ isAddModalOpen, isEditModalOpen, editDetails }, setState] = useState(
    {
      isAddModalOpen: false,
      isEditModalOpen: false,
      editDetails: null,
    }
  );

  const { manageAdminRequest, admin_reducer } = props;

  const {
    study_details_list,
    admin_loading,
    admin_success,
    admin_error,
    admin_request_type,
    study_details_delete_status,
    study_details_submit_status,
    study_details_edit_status,
  } = admin_reducer;

  const toggleModal = useCallback(() => {
    setState((val) => ({
      ...val,
      isAddModalOpen: false,
      isEditModalOpen: false,
    }));
  }, [setState]);

  useEffect(() => {
    manageAdminRequest({ request_type: "GET_STUDY_DETAILS", payload: {} });
  }, [manageAdminRequest]);

  useEffect(() => {
    if (admin_request_type === "ADD_STUDY_DETAILS") {
      if (admin_success) {
        message.success(
          study_details_submit_status?.id > 0 &&
            "Study Master Data is Saved Successfully"
        );
        manageAdminRequest({
          request_type: "GET_STUDY_DETAILS",
          payload: {},
        });
        toggleModal();
      } else if (admin_error) {
        message.error(admin_error);
      }
    } else if (admin_request_type === "EDIT_STUDY_DETAILS") {
      if (admin_success) {
        message.success(
          study_details_edit_status?.id > 0 &&
            "Study Master Data is Updated Successfully"
        );
        manageAdminRequest({
          request_type: "GET_STUDY_DETAILS",
          payload: {},
        });
        toggleModal();
      } else if (admin_error) {
        message.error(admin_error);
      }
    } else if (admin_request_type === "DELETE_STUDY_DETAILS") {
      if (admin_success) {
        message.success(study_details_delete_status);
        manageAdminRequest({
          request_type: "GET_STUDY_DETAILS",
        });
      } else if (admin_error) {
        message.error(admin_error);
      }
    }
  }, [
    study_details_edit_status,
    study_details_submit_status,
    study_details_delete_status,
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
        title="Study Details"
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
            Add Study Details
          </Button>
        }
      >
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 40px", color: "grey", padding: "0" }}>
              Study
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
            <AddStudy toggleModal={toggleModal} />
          </MainAppStyles>
        </Modal>
        <Modal
          title={
            <h4 style={{ margin: "0 0 0 40px", color: "grey", padding: "0" }}>
              Study
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
              editDetails: false,
            }))
          }
        >
          <MainAppStyles>
            <AddStudy toggleModal={toggleModal} editDetails={editDetails} />
          </MainAppStyles>
        </Modal>
        <Table
          className="bg-primary"
          bordered
          size="small"
          loading=""
          columns={[
            {
              title: "Study ID",
              dataIndex: "studyId",
              sorter: (a, b) => String(a.studyId).localeCompare(b.studyId),
            },
            {
              title: "Sponsor Name",
              dataIndex: "sponsorName",
              sorter: (a, b) =>
                String(a.sponsorName).localeCompare(b.sponsorName),
            },
            { title: "CRO Name", dataIndex: "croName" },
            {
              title: "Regulatory Agency",
              dataIndex: "regulatoryAgency",
            },
            {
              title: "Study Design",
              dataIndex: "studyDesign",
            },
            { title: "Phase", dataIndex: "phase" },
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
                        request_type: "DELETE_STUDY_DETAILS",
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
            study_details_list &&
            study_details_list?.length > 0 &&
            study_details_list
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
export default connect(mapStateToProps, mapDispatchToProps)(Study);
