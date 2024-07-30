import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Modal,
  Row,
  Space,
  message,
} from "antd";

import { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as XLSX from "xlsx";
import Section1 from "./Section1";
import Section10 from "./Section10";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section7 from "./Section7";
import Section8 from "./Section8";
import Section9 from "./Section9";
import successMessages from "./successMessges.json";

import {
  CheckCircleFilled,
  CloseCircleFilled,
  LockOutlined,
  SaveFilled,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import theme from "../../../helpers/theme";
import UserInfo from "../../../helpers/user_info";
import { objectToQueryString } from "../../../helpers/utils";
import {
  MANAGE_AUTH_REQUEST,
  manageRecordRequest,
  manageRecordSuccess,
} from "../../../redux/actions";
import {
  manageAuthError,
  manageAuthRequest,
  manageAuthSuccess,
} from "../../../redux/auth/action";
import RecordLog from "./RecordLog";
import Section11 from "./Section11";
import Section12 from "./Section12";
import Section13 from "./Section13";
import fields from "./fields";
import Section6 from "./section6";
import sections from "./sections";
import statusMap from "./statusMap";
function AddRecord(props) {
  const [form] = Form.useForm();
  const [loginForm] = Form.useForm();
  const { getFieldValue: loginFormGetFieldValue } = loginForm;
  const { record_id } = useParams();
  const { Panel } = Collapse;
  const role = UserInfo.getRoles();
  const siteID = UserInfo.getSiteID();
  const user = UserInfo.getUser();
  const history = useHistory();
  const { push } = history;

  const { setFieldsValue, getFieldsValue } = form;
  const {
    manageRecordRequest,
    record_reducer,
    manageAuthAsync,
    manageRecordSuccess,
    auth_reducer,
    manageAuthError,
  } = props;

  const {
    record_loading,
    record_success,
    record_error,
    record_request_type,
    records_details,
    records_count,
    study_details,
    add_record_submit_status,
    edit_record_submit_status,
  } = record_reducer;
  const {
    login_info,
    auth_loading,
    auth_error,
    auth_success,
    auth_action,
    auth_request_type,
  } = auth_reducer;

  const [
    {
      isPopOverOpen,
      currentCommentBox,
      comments,
      isCommentsVisible,
      isSignOffModalOpen,
      isHIVChecked,
      errorFields,
      auditData,
      oldComments,
    },
    setState,
  ] = useState({
    isPopOverOpen: false,
    currentCommentBox: null,
    comments: { ...fields },
    isCommentsVisible: false,
    isSignOffModalOpen: false,
    isHIVChecked: false,
    errorFields: null,
    auditData: null,
    oldComments: null,
  });

  const auditDataRef = useRef([]);
  const commentsDataRef = useRef([]);
  const signOffRef = useRef({ comment: "" });
  const piCommentRef = useRef({ comment: "" });

  useEffect(() => {
    setFieldsValue({
      section2: {
        subjectCounter: records_count,
      },
    });
  }, [records_count, setFieldsValue]);

  useEffect(() => {
    setFieldsValue({
      section1: {
        studyTitle: study_details?.[0]?.studyTitle,
        projectNo: study_details?.[0]?.studyId,
        siteId: UserInfo?.getSiteID(),
      },
    });
  }, [study_details, setFieldsValue]);

  useEffect(() => {
    records_details &&
      records_details?.comments &&
      setState((val) => ({
        ...val,
        comments: { ...records_details?.comments },
      }));
  }, [records_details]);

  useEffect(() => {
    setState((val) => ({
      ...val,
      isCommentsVisible:
        records_details?.status && records_details?.status !== "INIT",
    }));
  }, [records_details]);

  function submitRecordData(data) {
    const status = data?.status;

    if (!record_id) {
      manageRecordRequest({
        request_type: "ADD_RECORD",
        ...data,
        createDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        status: status,
        dispatchedFrom: UserInfo?.getRoles(),
        dispatchedTo: status === "INIT" ? "ROLE_DATAENTRY" : "ROLE_REVIEWER",
        // subjectId: records_details?.subjectId,
        siteId: siteID,
        section1: {
          ...data?.section1,
          studyDate:
            dayjs(data?.section1?.studyDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section1?.studyDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
        },
        section3: {
          ...data?.section3,
          dateOfHcc:
            dayjs(data?.section3?.dateOfHcc).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section3?.dateOfHcc).format("YYYY-MM-DD HH:mm:ss")
              : "",
        },

        section4: {
          ...data?.section4,
          hemoGlobinDate:
            dayjs(data?.section4?.hemoGlobinDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.hemoGlobinDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          alanineDate:
            dayjs(data?.section4?.alanineDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.alanineDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          aspartateDate:
            dayjs(data?.section4?.aspartateDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.aspartateDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          bilirubinDate:
            dayjs(data?.section4?.bilirubinDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.bilirubinDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          alkalineDate:
            dayjs(data?.section4?.alkalineDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.alkalineDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          albuminDate:
            dayjs(data?.section4?.albuminDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.albuminDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          platelatesDate:
            dayjs(data?.section4?.platelatesDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.platelatesDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          creatinineDate:
            dayjs(data?.section4?.creatinineDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.creatinineDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          prothrombinDate:
            dayjs(data?.section4?.prothrombinDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.prothrombinDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          internationalDate:
            dayjs(data?.section4?.internationalDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.internationalDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          alphaDate:
            dayjs(data?.section4?.alphaDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.alphaDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          sodiumDate:
            dayjs(data?.section4?.sodiumDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.sodiumDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          bloodDate:
            dayjs(data?.section4?.bloodDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.bloodDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          cholesterolDate:
            dayjs(data?.section4?.cholesterolDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.cholesterolDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          triglyceridesDate:
            dayjs(data?.section4?.triglyceridesDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.triglyceridesDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          highDensityDate:
            dayjs(data?.section4?.highDensityDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.highDensityDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          lowDensityDate:
            dayjs(data?.section4?.lowDensityDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.lowDensityDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
        },
        section6: {
          ...data?.section6,
          hccDiagnosisImagingDate:
            dayjs(data?.section6?.hccDiagnosisImagingDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section6?.hccDiagnosisImagingDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          hccDiagnosisTissueDate:
            dayjs(data?.section6?.hccDiagnosisTissueDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section6?.hccDiagnosisTissueDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
        },
        section9: {
          ...data?.section9,
          selectedDateOfFirstRecurrence:
            dayjs(data?.section9?.selectedDateOfFirstRecurrence).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section9?.selectedDateOfFirstRecurrence).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          selectedDateOfDeath:
            dayjs(data?.section9?.selectedDateOfDeath).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section9?.selectedDateOfDeath).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          selectedDateOfLastContact:
            dayjs(data?.section9?.selectedDateOfLastContact).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section9?.selectedDateOfLastContact).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
        },
        // section11: {
        //   ...data?.section11,
        //   yearOfHIVHCC:
        //     dayjs(data?.section11?.yearOfHIVHCC).format(
        //       "YYYY-MM-DD HH:mm:ss"
        //     ) !== "Invalid Date"
        //       ? dayjs(data?.section11?.yearOfHIVHCC).format(
        //           "YYYY-MM-DD HH:mm:ss"
        //         )
        //       : "",
        // },
        section12: {
          ...data?.section12,
          dateOfHCVCVirus:
            dayjs(data?.section12?.dateOfHCVCVirus).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section12?.dateOfHCVCVirus).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          hcvGenotype: [data?.section12?.hcvGenotype],
          hcvTreatmentCVirus: [data?.section12?.hcvTreatmentCVirus],
        },
        section13: {
          ...data?.section13,
          dateOfHBVBVirus:
            dayjs(data?.section13?.dateOfHBVBVirus).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section13?.dateOfHBVBVirus).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
        },
        section14: {
          createdBy: user,
          createdOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          changedBy: user,

          changedOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
      });
    } else {
      manageRecordRequest({
        request_type: "EDIT_RECORD",
        ...data,
        id: record_id,
        createDate: records_details?.createDate,
        status: status,
        dispatchedFrom: UserInfo?.getRoles(),
        dispatchDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        dispatchedTo:
          status === "INIT" ||
          status === "INPROGRESS_AT_DATAENTRY_FROM_REVIEWER_SUBMISSION" ||
          status === "INPROGRESS_AT_DATAENTRY_FROM_REVIEWER_RESUBMISSION" ||
          status === "SUBMITTED_TO_DATAENTRY_FROM_REVIEWER" ||
          status === "RESUBMITTED_TO_DATAENTRY_FROM_REVIEWER"
            ? "ROLE_DATAENTRY"
            : status === "SUBMITTED_TO_REVIEWER_FROM_DATAENTRY" ||
              status === "RESUBMITTED_TO_REVIEWER_FROM_DATAENTRY" ||
              status === "INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_SUBMISSION" ||
              status === "INPROGRESS_AT_REVIEWER_FROM_PI_SUBMISSION" ||
              status === "INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_RESUBMISSION" ||
              status === "INPROGRESS_AT_REVIEWER_FROM_PI_RESUBMISSION" ||
              status === "SUBMITTED_TO_REVIWER_FROM_PI" ||
              status === "RESUBMITTED_TO_REVIWER_FROM_PI"
            ? "ROLE_REVIEWER"
            : status === "SUBMITTED_TO_PI" ||
              status === "RESUBMITTED_TO_PI" ||
              status === "INPROGRESS_AT_PI_SUBMISSION" ||
              status === "INPROGRESS_AT_PI_RESUBMISSION" ||
              status === "SIGN_OFF"
            ? "ROLE_PI"
            : UserInfo?.getRoles(),
        subjectId: records_details?.subjectId,
        siteId: siteID,
        comments: records_details?.status !== "INIT" ? comments : {},
        section1: {
          ...data?.section1,
          studyDate:
            dayjs(data?.section1?.studyDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section1?.studyDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
        },
        section4: {
          ...data?.section4,
          hemoGlobinDate:
            dayjs(data?.section4?.hemoGlobinDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.hemoGlobinDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          alanineDate:
            dayjs(data?.section4?.alanineDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.alanineDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          aspartateDate:
            dayjs(data?.section4?.aspartateDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.aspartateDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          bilirubinDate:
            dayjs(data?.section4?.bilirubinDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.bilirubinDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          alkalineDate:
            dayjs(data?.section4?.alkalineDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.alkalineDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          albuminDate:
            dayjs(data?.section4?.albuminDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.albuminDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          platelatesDate:
            dayjs(data?.section4?.platelatesDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.platelatesDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          creatinineDate:
            dayjs(data?.section4?.creatinineDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.creatinineDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          prothrombinDate:
            dayjs(data?.section4?.prothrombinDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.prothrombinDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          internationalDate:
            dayjs(data?.section4?.internationalDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.internationalDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          alphaDate:
            dayjs(data?.section4?.alphaDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.alphaDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          sodiumDate:
            dayjs(data?.section4?.sodiumDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.sodiumDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          bloodDate:
            dayjs(data?.section4?.bloodDate).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section4?.bloodDate).format("YYYY-MM-DD HH:mm:ss")
              : "",
          cholesterolDate:
            dayjs(data?.section4?.cholesterolDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.cholesterolDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          triglyceridesDate:
            dayjs(data?.section4?.triglyceridesDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.triglyceridesDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          highDensityDate:
            dayjs(data?.section4?.highDensityDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.highDensityDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          lowDensityDate:
            dayjs(data?.section4?.lowDensityDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section4?.lowDensityDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
        },

        section3: {
          ...data?.section3,
          dateOfHcc:
            dayjs(data?.section3?.dateOfHcc).format("YYYY-MM-DD HH:mm:ss") !==
            "Invalid Date"
              ? dayjs(data?.section3?.dateOfHcc).format("YYYY-MM-DD HH:mm:ss")
              : "",
        },
        section6: {
          ...data?.section6,
          hccDiagnosisImagingDate:
            dayjs(data?.section6?.hccDiagnosisImagingDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section6?.hccDiagnosisImagingDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          hccDiagnosisTissueDate:
            dayjs(data?.section6?.hccDiagnosisTissueDate).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section6?.hccDiagnosisTissueDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
        },
        section9: {
          ...data?.section9,
          selectedDateOfFirstRecurrence:
            dayjs(data?.section9?.selectedDateOfFirstRecurrence).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section9?.selectedDateOfFirstRecurrence).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          selectedDateOfDeath:
            dayjs(data?.section9?.selectedDateOfDeath).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section9?.selectedDateOfDeath).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          selectedDateOfLastContact:
            dayjs(data?.section9?.selectedDateOfLastContact).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section9?.selectedDateOfLastContact).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
        },
        // section11: {
        //   ...data?.section11,
        //   yearOfHIVHCC:
        //     dayjs(data?.section11?.yearOfHIVHCC).format(
        //       "YYYY-MM-DD HH:mm:ss"
        //     ) !== "Invalid Date"
        //       ? dayjs(data?.section11?.yearOfHIVHCC).format(
        //           "YYYY-MM-DD HH:mm:ss"
        //         )
        //       : "",
        // },
        section12: {
          ...data?.section12,
          dateOfHCVCVirus:
            dayjs(data?.section12?.dateOfHCVCVirus).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section12?.dateOfHCVCVirus).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
          hcvGenotype: [data?.section12?.hcvGenotype],
          hcvTreatmentCVirus: [data?.section12?.hcvTreatmentCVirus],
        },
        section13: {
          ...data?.section13,
          dateOfHBVBVirus:
            dayjs(data?.section13?.dateOfHBVBVirus).format(
              "YYYY-MM-DD HH:mm:ss"
            ) !== "Invalid Date"
              ? dayjs(data?.section13?.dateOfHBVBVirus).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : "",
        },
        section14: {
          ...data?.section14,
          createdBy: records_details?.section14?.createdBy,
          createdOn: records_details?.section14?.createdOn,
          changedBy: UserInfo?.getUser(),
          changedOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
      });
    }
  }
  // calculateMELD
  const calculateScores = useCallback(
    (valid) => {
      const { section4, section2 } = getFieldsValue();
      const {
        bilirubinValue,
        creatinineValue,
        internationalValue,
        aspartateValue,
        sodiumValue,
        alanineValue,
        aspartateTo,
        platelatesValue,
      } = section4;
      const { subjectYear } = section2;

      const isValid = valid;

      if (isValid) {
        const calculateMELD = () => {
          const tmpCreatinineValue =
            creatinineValue !== ""
              ? creatinineValue < 1
                ? 1
                : creatinineValue > 4
                ? 4
                : creatinineValue
              : 0;
          const tmpBilirubinValue =
            bilirubinValue !== ""
              ? bilirubinValue < 1
                ? 1
                : bilirubinValue
              : 0;
          const tmpInternationalValue =
            internationalValue !== ""
              ? internationalValue < 1
                ? 1
                : internationalValue
              : 0;
          return (
            (0.957 *
              Math.log(tmpCreatinineValue !== "" ? tmpCreatinineValue : 0) +
              0.378 *
                Math.log(tmpBilirubinValue !== "" ? tmpBilirubinValue : 0) +
              1.12 *
                Math.log(
                  tmpInternationalValue !== "" ? tmpInternationalValue : 0
                ) +
              0.643) *
            10
          );
        };
        let meldss = calculateMELD();
        let melds = Number(meldss.toFixed(2));
        setFieldsValue({ section4: { meldScoreLab: melds } });

        const calculateMELDNa = () => {
          const tmpSodiumValue =
            sodiumValue !== ""
              ? sodiumValue < 125
                ? 125
                : sodiumValue > 137
                ? 137
                : sodiumValue
              : 0;
          return (
            melds +
            1.32 * (137 - tmpSodiumValue) -
            0.033 * melds * (137 - tmpSodiumValue)
          );
        };
        if (sodiumValue !== "") {
          let meldsNa = calculateMELDNa();
          setFieldsValue({
            section4: { modelEndStageTextArea: meldsNa.toFixed(2) },
          });
        }

        const calculateAST = () => {
          return (((aspartateValue * 100) / aspartateTo) * 1) / platelatesValue;
        };
        let astss = calculateAST().toFixed(3);
        setFieldsValue({ section4: { astPlateletLab: astss } });
        let totalYear = dayjs().format("YYYY") - subjectYear;

        const calculateFIB4 = () => {
          return (
            (((totalYear * aspartateValue) /
              (platelatesValue * Math.sqrt(alanineValue))) *
              100) /
            100
          );
        };
        let fib4s = calculateFIB4();
        setFieldsValue({ section4: { fib4Lab: fib4s.toFixed(2) } });
      } else {
        setFieldsValue({
          section4: {
            modelEndStageTextArea: "",
            meldScoreLab: "",
            fib4Lab: "",
            astPlateletLab: "",
          },
        });
      }
    },
    [getFieldsValue, setFieldsValue]
  );

  useEffect(() => {
    manageRecordRequest({
      request_type: "GET_RECORD_DETAILS",
      value: record_id,
    });
  }, [record_id, manageRecordRequest]);

  useEffect(() => {
    records_details &&
      setFieldsValue({
        ...records_details,
        section1: {
          ...records_details?.section1,
          studyDate: dayjs(records_details?.section1?.studyDate).isValid()
            ? dayjs(records_details?.section1?.studyDate)
            : "",
        },
        section3: {
          ...records_details?.section3,
          dateOfHcc: dayjs(records_details?.section3?.dateOfHcc).isValid()
            ? dayjs(records_details?.section3?.dateOfHcc)
            : "",
        },

        section4: {
          ...records_details?.section4,

          hemoGlobinDate:
            records_details?.section4.hemoGlobinDate &&
            dayjs(records_details?.section4?.hemoGlobinDate).isValid()
              ? dayjs(records_details?.section4?.hemoGlobinDate)
              : null,
          alanineDate:
            records_details?.section4.alanineDate &&
            dayjs(records_details?.section4?.alanineDate).isValid()
              ? dayjs(records_details?.section4?.alanineDate)
              : "",
          aspartateDate:
            records_details?.section4.aspartateDate &&
            dayjs(records_details?.section4?.aspartateDate).isValid()
              ? dayjs(records_details?.section4?.aspartateDate)
              : "",
          bilirubinDate:
            records_details?.section4.bilirubinDate &&
            dayjs(records_details?.section4?.bilirubinDate).isValid()
              ? dayjs(records_details?.section4?.bilirubinDate)
              : "",
          alkalineDate:
            records_details?.section4.alkalineDate &&
            dayjs(records_details?.section4?.alkalineDate).isValid()
              ? dayjs(records_details?.section4?.alkalineDate)
              : "",
          albuminDate:
            records_details?.section4.albuminDate &&
            dayjs(records_details?.section4?.albuminDate).isValid()
              ? dayjs(records_details?.section4?.albuminDate)
              : "",
          platelatesDate:
            records_details?.section4.platelatesDate &&
            dayjs(records_details?.section4?.platelatesDate).isValid()
              ? dayjs(records_details?.section4?.platelatesDate)
              : "",
          creatinineDate:
            records_details?.section4.creatinineDate &&
            dayjs(records_details?.section4?.creatinineDate).isValid()
              ? dayjs(records_details?.section4?.creatinineDate)
              : "",
          prothrombinDate:
            records_details?.section4.prothrombinDate &&
            dayjs(records_details?.section4?.prothrombinDate).isValid()
              ? dayjs(records_details?.section4?.prothrombinDate)
              : "",
          internationalDate:
            records_details?.section4.internationalDate &&
            dayjs(records_details?.section4?.internationalDate).isValid()
              ? dayjs(records_details?.section4?.internationalDate)
              : "",
          alphaDate:
            records_details?.section4.alphaDate &&
            dayjs(records_details?.section4?.alphaDate).isValid()
              ? dayjs(records_details?.section4?.alphaDate)
              : "",
          sodiumDate:
            records_details?.section4.sodiumDate &&
            dayjs(records_details?.section4?.sodiumDate).isValid()
              ? dayjs(records_details?.section4?.sodiumDate)
              : "",
          bloodDate:
            records_details?.section4.bloodDate &&
            dayjs(records_details?.section4?.bloodDate).isValid()
              ? dayjs(records_details?.section4?.bloodDate)
              : "",
          cholesterolDate:
            records_details?.section4.cholesterolDate &&
            dayjs(records_details?.section4?.cholesterolDate).isValid()
              ? dayjs(records_details?.section4?.cholesterolDate)
              : "",

          triglyceridesDate:
            records_details?.section4.triglyceridesDate &&
            dayjs(records_details?.section4?.triglyceridesDate).isValid()
              ? dayjs(records_details?.section4?.triglyceridesDate)
              : "",
          highDensityDate:
            records_details?.section4.highDensityDate &&
            dayjs(records_details?.section4?.highDensityDate).isValid()
              ? dayjs(records_details?.section4?.highDensityDate)
              : "",
          lowDensityDate:
            records_details?.section4.lowDensityDate &&
            dayjs(records_details?.section4?.lowDensityDate).isValid()
              ? dayjs(records_details?.section4?.lowDensityDate)
              : "",
        },

        section6: {
          ...records_details?.section6,
          hccDiagnosisImagingDate: dayjs(
            records_details?.section6?.hccDiagnosisImagingDate
          ).isValid()
            ? dayjs(records_details?.section6?.hccDiagnosisImagingDate)
            : "",
          hccDiagnosisTissueDate: dayjs(
            records_details?.section6?.hccDiagnosisTissueDate
          ).isValid()
            ? dayjs(records_details?.section6?.hccDiagnosisTissueDate)
            : "",
        },
        section9: {
          ...records_details?.section9,
          selectedDateOfFirstRecurrence: dayjs(
            records_details?.section9?.selectedDateOfFirstRecurrence
          ).isValid()
            ? dayjs(records_details?.section9?.selectedDateOfFirstRecurrence)
            : "",
          selectedDateOfDeath: dayjs(
            records_details?.section9?.selectedDateOfDeath
          ).isValid()
            ? dayjs(records_details?.section9?.selectedDateOfDeath)
            : "",
          selectedDateOfLastContact: dayjs(
            records_details?.section9?.selectedDateOfLastContact
          ).isValid()
            ? dayjs(records_details?.section9?.selectedDateOfLastContact)
            : "",
        },

        section12: {
          ...records_details?.section12,
          dateOfHCVCVirus: dayjs(
            records_details?.section12?.dateOfHCVCVirus
          ).isValid()
            ? dayjs(records_details?.section12?.dateOfHCVCVirus)
            : "",
          hcvGenotype: records_details?.section12?.hcvGenotype?.[0],
          hcvTreatmentCVirus:
            records_details?.section12?.hcvTreatmentCVirus?.[0],
        },
        section13: {
          ...records_details?.section13,
          dateOfHBVBVirus: dayjs(
            records_details?.section13?.dateOfHBVBVirus
          ).isValid()
            ? dayjs(records_details?.section13?.dateOfHBVBVirus)
            : "",
        },
      });
  }, [records_details, setFieldsValue]);

  function handleCommentData(section, title, name, value) {
    const commentsData = {
      sectionName: sections?.[section],
      labelName: title,
      fieldName: name,
      newValue: records_details?.[section]?.[name] || "",
      oldValue: records_details?.[section]?.[name] || "",
      comment: value,
    };

    const data = [
      ...commentsDataRef?.current?.filter((val) => val.fieldName !== name),
      commentsData,
    ];
    commentsDataRef.current = data?.filter((val) => val?.comment);
  }

  useEffect(() => {
    return () => {
      manageAuthError(null);
    };
  }, [manageAuthError]);

  useEffect(() => {
    if (!record_id) {
      manageRecordRequest({
        request_type: "GET_STUDY_DETAILS",
      });
    }

    return () => {
      manageRecordSuccess(null, "GET_RECORD_DETAILS");
      manageRecordSuccess(null, "GET_RECORDS");
    };
  }, [manageRecordRequest, record_id, manageRecordSuccess]);

  useEffect(() => {
    manageRecordRequest({
      request_type: "GET_RECORDS_COUNT",
    });
  }, [manageRecordRequest]);

  useEffect(() => {
    if (record_request_type === "ADD_RECORD") {
      if (record_success) {
        message.success(
          add_record_submit_status?.id &&
            successMessages?.[add_record_submit_status?.status]
        );
        manageRecordRequest({
          request_type: "GET_RECORDS",
          role: UserInfo.getRoles(),
          SiteId: UserInfo.getSiteID(),
        });
        push("/");
      } else if (record_error) {
        message.error(record_error?.error);
      }
    } else if (record_request_type === "EDIT_RECORD") {
      if (record_success) {
        message.success(
          edit_record_submit_status?.id &&
            successMessages?.[edit_record_submit_status?.status]
        );

        ((UserInfo?.getRoles() === "ROLE_DATAENTRY" &&
          (auditDataRef.current || []).length > 0 &&
          records_details?.status !== "INIT") ||
          (UserInfo?.getRoles() === "ROLE_REVIEWER" &&
            (commentsDataRef.current || []).length > 0) ||
          (UserInfo?.getRoles() === "ROLE_PI" &&
            (edit_record_submit_status?.status === "SIGN_OFF" ||
              piCommentRef.current?.comment ||
              records_details?.section14?.pi_comments))) &&
          manageRecordRequest({
            request_type: "ADD_AUDIT_DATA",
            recordId: record_id,
            subjectId: records_details?.subjectId,
            siteId: siteID,
            role: UserInfo?.getRoles(),
            modifiedBy: UserInfo?.getUser(),
            modifiedOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            auditData:
              UserInfo?.getRoles() === "ROLE_DATAENTRY"
                ? auditDataRef.current
                : UserInfo?.getRoles() === "ROLE_REVIEWER"
                ? commentsDataRef.current
                : UserInfo?.getRoles() === "ROLE_PI" &&
                  edit_record_submit_status?.status === "SIGN_OFF"
                ? [signOffRef.current]
                : [
                    piCommentRef.current?.comment
                      ? piCommentRef.current
                      : { comment: records_details?.section14?.pi_comments },
                  ],
          });
        manageRecordRequest({
          request_type: "GET_RECORDS",
          role: UserInfo.getRoles(),
          SiteId: UserInfo.getSiteID(),
        });
        push("/");
      } else if (record_error) {
        message.error(record_error?.message);
      }
    }
  }, [
    push,
    getFieldsValue,
    record_id,
    siteID,
    add_record_submit_status,
    edit_record_submit_status,
    manageRecordRequest,
    records_details,
    record_request_type,
    record_error,
    record_loading,
    record_success,
  ]);

  const compareArrays = (a, b) =>
    a?.length === b?.length &&
    a?.every((element, index) => element === b[index]);

  useEffect(() => {
    if (auth_action === MANAGE_AUTH_REQUEST) {
      if (auth_request_type === "LOGIN") {
        if (auth_success) {
          if (login_info?.roles[0] === "ROLE_PI") {
            const data = {
              ...getFieldsValue(),
              status: statusMap?.SIGN_OFF,
              section14: {
                ...getFieldsValue()?.section14,
                comment: loginFormGetFieldValue("sign_off_comments"),
              },
            };
            manageAuthAsync({
              request_type: "clear_action",
            });
            submitRecordData(data);
          } else message.error("Access Denied");
        } else if (auth_error) {
          message.error(auth_error?.error);
        }
      }
    }
  }, [auth_loading]);

  useEffect(() => {
    if (records_details && Object.keys(records_details)?.length > 0) {
      setState((val) => ({
        ...val,
        isHIVChecked: records_details?.section5?.hivComorbidities === "Yes",
      }));
    }
  }, [records_details]);

  function trimObjectKeys(array) {
    return array.map((obj) => {
      const trimmedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const trimmedKey = key.trim();
          trimmedObj[trimmedKey] = obj[key];
        }
      }
      return trimmedObj;
    });
  }

  const handleExcelBlob = (blob, reportType) => {
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: "binary", cellHTML: true });
      // Assuming you're interested in the first sheet
      const sheetName = "ExportAuditTemplate";
      const sheet = workbook.Sheets[sheetName];
      // Convert sheet to JSON format (array of arrays)
      let jsonData = XLSX.utils.sheet_to_json(sheet);
      setState((val) => ({ ...val, auditData: trimObjectKeys(jsonData) }));
    };

    reader.readAsBinaryString(blob);
  };

  useEffect(() => {
    if (records_details && Object.keys(records_details)?.length > 0) {
      const url = `${
        window["apiBaseUrl"]
      }/export/auditexcel?${objectToQueryString({
        startDate: dayjs(records_details?.section14?.createdOn).format(
          "YYYY-MM-DD"
        ),
        endDate: dayjs().format("YYYY-MM-DD"),
        siteId: UserInfo?.getSiteID(),
        fromSubjectId: records_details?.subjectId,
        toSubjectId: records_details?.subjectId,
      })}`;

      fetch(url, {
        headers: {
          Authorization: `Bearer ${UserInfo?.getToken()}`,
          "Content-Type": "application/octet-stream",
        },
        responseType: "blob",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Request failed with status code " + response.status
            );
          }
          return response.blob();
        })
        .then((blob) => {
          handleExcelBlob(blob);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [records_details]);

  function handleAuditData(e) {
    if (role === "ROLE_DATAENTRY") {
      const label = e.target
        ?.closest(".ant-form-item")
        ?.querySelector("label")?.textContent;

      const fname =
        e?.target?.closest(".ant-checkbox-group")?.getAttribute("id") ||
        e?.target?.closest(".ant-radio-group")?.getAttribute("id") ||
        e?.target?.closest(".ant-input")?.getAttribute("id");

      const section = fname?.split("_")?.[0];
      const id = section?.slice(7);
      const fControlName = fname?.split("_")?.slice(1)?.join("_");
      const formSection = form.getFieldsValue()?.[section];
      const formValue = formSection?.[fControlName];

      if (UserInfo?.getRoles() === "ROLE_DATAENTRY") {
        let tempAuditData;
        if (
          auditDataRef?.current?.filter((val) => val.fieldName === fControlName)
            ?.length > 0
        ) {
          const record = auditDataRef?.current?.filter(
            (val) => val.fieldName === fControlName
          )?.[0];
          tempAuditData = {
            ...record,
            oldValue: records_details?.[section]?.[fControlName],
            newValue: formValue,
          };
        } else {
          tempAuditData = {
            id: id,
            sectionName: sections?.[section],
            labelName: label,
            fieldName: fControlName,
            oldValue: records_details?.[section]?.[fControlName],
            newValue: formValue,
            // comment: comments?.[section]?.[fControlName],
            comment: "",
          };
        }
        const data = [
          ...auditDataRef?.current?.filter(
            (val) => val.fieldName !== fControlName
          ),
          tempAuditData,
        ];
        // auditDataRef.current = data?.filter(
        //   (val) =>
        //     val?.comment ||
        //     records_details?.[section]?.[fControlName] !== formValue
        // );
        auditDataRef.current = data?.filter((val) =>
          !Array.isArray(val?.newValue) && !Array.isArray(val?.oldValue)
            ? val?.comment ||
              records_details?.[section]?.[fControlName] !== val?.newValue
            : val?.comment ||
              !compareArrays(
                records_details?.[section]?.[fControlName],
                val?.newValue
              )
        );
      }
    }
  }

  const getAllErrors = async () => {
    try {
      await form.validateFields();
    } catch (reason) {
      if (reason?.errorFields?.length > 0) {
        const tempArr = reason.errorFields.map((val) => val.name?.[0]);
        const errorSections = [...new Set(tempArr)];
        setState((val) => ({ ...val, errorFields: errorSections }));
      }
    }
  };

  return (
    <>
      <FormContainer>
        <Form
          form={form}
          disabled={role === "ROLE_REVIEWER" || role === "ROLE_PI"}
          onFinish={submitRecordData}
          labelCol={{ span: 24 }}
          onChange={handleAuditData}
          initialValues={{
            ...fields,
            section4: {
              ...fields?.section4,
              hemoglobinUnit: "%",
              alanineUnit: "Units/L",
              aspartateUnit: "Units/L",
              bilirubinUnit: "mg/dl",
              alkalineUnit: "Units/L",
              albuminUnit: "g/dl",
              platelatesUnit: "k/μl (X 109 /μl)",
              creatinineUnit: "mg/dl",
              prothrombinUnit: "seconds",
              internationalUnit: "N/A",
              alphaUnit: "ng/ml",
              sodiumUnit: "Mmol/L",
              bloodUreaUnit: "mg/dl",
              cholesterolUnit: "mg/dl",
              triglyceridesUnit: "mg/dl",
              highDensityUnit: "mg/dl",
              lowDensityUnit: "mg/dl",
            },
          }}
        >
          <Space
            className="collapse-space"
            direction="vertical"
            style={{ width: "100%" }}
            size={"large"}
          >
            <Collapse>
              <Panel
                header="Study Data"
                key="1"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section1") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section1
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  handleAuditData={handleAuditData}
                  setState={setState}
                  handleCommentData={handleCommentData}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditDataRef={auditDataRef}
                  auditData={auditData}
                  oldComments={oldComments}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="Subject Data"
                key="2"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section2") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section2
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  handleCommentData={handleCommentData}
                  setState={setState}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditData={auditData}
                  auditDataRef={auditDataRef}
                  oldComments={oldComments}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="Baseline Characteristics"
                key="3"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section3") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section3
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  setState={setState}
                  handleCommentData={handleCommentData}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditDataRef={auditDataRef}
                  auditData={auditData}
                  oldComments={oldComments}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="Most recent laboratory parameters, 6 months before or after the diagnosis of HCC"
                key="4"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section4") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section4
                  form={form}
                  calculateScores={calculateScores}
                  handleCommentData={handleCommentData}
                  record_details={records_details}
                  isPopOverOpen={isPopOverOpen}
                  setState={setState}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditDataRef={auditDataRef}
                  oldComments={oldComments}
                  auditData={auditData}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="Comorbidities"
                key="5"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section5") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section5
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  handleCommentData={handleCommentData}
                  setState={setState}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  oldComments={oldComments}
                  auditData={auditData}
                  auditDataRef={auditDataRef}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="HCC Diagnosis Information"
                key="6"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section6") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section6
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  handleCommentData={handleCommentData}
                  setState={setState}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditDataRef={auditDataRef}
                  oldComments={oldComments}
                  auditData={auditData}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="HCC Staging"
                key="7"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section7") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section7
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  handleCommentData={handleCommentData}
                  setState={setState}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditData={auditData}
                  auditDataRef={auditDataRef}
                  oldComments={oldComments}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="Chronic Liver Disease (CLD)Etiology"
                key="8"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section8") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section8
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  handleCommentData={handleCommentData}
                  setState={setState}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditData={auditData}
                  auditDataRef={auditDataRef}
                  oldComments={oldComments}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="HCC Outcomes"
                key="9"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section9") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section9
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  setState={setState}
                  handleCommentData={handleCommentData}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditDataRef={auditDataRef}
                  oldComments={oldComments}
                  auditData={auditData}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="Screening Questions"
                key="10"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section10") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section10
                  form={form}
                  handleCommentData={handleCommentData}
                  isPopOverOpen={isPopOverOpen}
                  setState={setState}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditData={auditData}
                  auditDataRef={auditDataRef}
                  oldComments={oldComments}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="HIV-Specific Lab Data within 6 months of HCC diagnosis"
                key="11"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section11") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section11
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  handleCommentData={handleCommentData}
                  setState={setState}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  isHIVChecked={isHIVChecked}
                  auditData={auditData}
                  auditDataRef={auditDataRef}
                  oldComments={oldComments}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="Hepatitis C virus (HCV) data within 6 months of HCC diagnosis"
                key="12"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section12") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section12
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  handleCommentData={handleCommentData}
                  setState={setState}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditDataRef={auditDataRef}
                  auditData={auditData}
                  oldComments={oldComments}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="Hepatitis B virus (HBV) data within 6 months of HCC diagnosis"
                key="13"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section13") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <Section13
                  form={form}
                  isPopOverOpen={isPopOverOpen}
                  setState={setState}
                  handleCommentData={handleCommentData}
                  currentCommentBox={currentCommentBox}
                  comments={comments}
                  isCommentsVisible={isCommentsVisible}
                  record={records_details}
                  auditDataRef={auditDataRef}
                  auditData={auditData}
                  oldComments={oldComments}
                />
              </Panel>
            </Collapse>
            <Collapse>
              <Panel
                header="Log"
                key="14"
                forceRender
                extra={
                  <>
                    {errorFields && (
                      <>
                        {errorFields?.includes("section14") ? (
                          <CloseCircleFilled style={{ color: "red" }} />
                        ) : (
                          <CheckCircleFilled style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </>
                }
              >
                <RecordLog record={records_details} />
              </Panel>
            </Collapse>

            <Form.Item
              hidden={role === "ROLE_DATAENTRY"}
              label="Comments"
              name={["section14", "pi_comments"]}
            >
              <Input.TextArea
                disabled={role === "ROLE_REVIEWER"}
                onChange={(e) =>
                  (piCommentRef.current = { comment: e.target.value })
                }
              />
            </Form.Item>
          </Space>
          <Form.Item hidden name="status">
            <Input />
          </Form.Item>
          {role === "ROLE_DATAENTRY" && (
            <>
              <Row align="center" gutter={20} style={{ marginTop: "32px" }}>
                <Col>
                  <Button
                    size="large"
                    icon={<SaveFilled />}
                    type="primary"
                    onClick={() => {
                      const data = {
                        ...form.getFieldsValue(),
                        status:
                          records_details?.status === "INIT" || !record_id
                            ? statusMap?.INIT
                            : records_details?.status ===
                              "SUBMITTED_TO_DATAENTRY_FROM_REVIEWER"
                            ? statusMap?.INPROGRESS_AT_DATAENTRY_FROM_REVIEWER_SUBMISSION
                            : statusMap?.INPROGRESS_AT_DATAENTRY_FROM_REVIEWER_RESUBMISSION,
                      };
                      submitRecordData(data);
                    }}
                    loading={
                      record_loading &&
                      (record_request_type === "ADD_RECORD" ||
                        record_request_type === "EDIT_RECORD")
                    }
                  >
                    Save
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                      getAllErrors();
                      form.setFieldsValue({
                        status:
                          !record_id || records_details?.status === "INIT"
                            ? statusMap?.SUBMITTED_TO_REVIEWER_FROM_DATAENTRY
                            : statusMap?.RESUBMITTED_TO_REVIEWER_FROM_DATAENTRY,
                      });
                    }}
                    loading={
                      record_loading &&
                      (record_request_type === "ADD_RECORD" ||
                        record_request_type === "EDIT_RECORD")
                    }
                    htmlType="submit"
                  >
                    Send to Reviewer
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {role === "ROLE_REVIEWER" && (
            <>
              <Row align="center" gutter={20} style={{ marginTop: "32px" }}>
                <Col>
                  <Button
                    size="large"
                    icon={<SaveFilled />}
                    disabled={false}
                    type="primary"
                    onClick={() => {
                      const data = {
                        ...form.getFieldsValue(),
                        status:
                          records_details?.status ===
                          "SUBMITTED_TO_REVIEWER_FROM_DATAENTRY"
                            ? statusMap?.INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_SUBMISSION
                            : records_details?.status ===
                              "RESUBMITTED_TO_REVIEWER_FROM_DATAENTRY"
                            ? statusMap?.INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_RESUBMISSION
                            : records_details?.status ===
                              "SUBMITTED_TO_REVIWER_FROM_PI"
                            ? statusMap?.INPROGRESS_AT_REVIEWER_FROM_PI_SUBMISSION
                            : statusMap?.INPROGRESS_AT_REVIEWER_FROM_PI_RESUBMISSION,
                      };
                      submitRecordData(data);
                    }}
                    loading={
                      record_loading && record_request_type === "EDIT_RECORD"
                    }
                  >
                    Save
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="large"
                    disabled={false}
                    type="primary"
                    onClick={() => {
                      const data = {
                        ...form.getFieldsValue(),
                        status:
                          records_details?.status ===
                            "INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_SUBMISSION" ||
                          records_details?.status ===
                            "SUBMITTED_TO_REVIEWER_FROM_DATAENTRY"
                            ? statusMap?.SUBMITTED_TO_DATAENTRY_FROM_REVIEWER
                            : statusMap?.RESUBMITTED_TO_DATAENTRY_FROM_REVIEWER,
                      };
                      submitRecordData(data);

                      // form.setFieldsValue({
                      //   status:
                      //     records_details?.status ===
                      //       "INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_SUBMISSION" ||
                      //     records_details?.status ===
                      //       "SUBMITTED_TO_REVIEWER_FROM_DATAENTRY"
                      //       ? statusMap?.SUBMITTED_TO_DATAENTRY_FROM_REVIEWER
                      //       : statusMap?.RESUBMITTED_TO_DATAENTRY_FROM_REVIEWER,
                      // });
                    }}
                    loading={
                      record_loading && record_request_type === "EDIT_RECORD"
                    }
                  >
                    Send back to Data Entry
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="large"
                    disabled={false}
                    type="primary"
                    onClick={() => {
                      const data = {
                        ...form.getFieldsValue(),
                        status:
                          auditData?.filter(
                            (val) => val?.["User Role"] === "ROLE_PI"
                          )?.length > 0
                            ? statusMap?.RESUBMITTED_TO_PI
                            : statusMap?.SUBMITTED_TO_PI,
                      };
                      submitRecordData(data);
                    }}
                    loading={
                      record_loading && record_request_type === "EDIT_RECORD"
                    }
                  >
                    Send to PI
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {role === "ROLE_PI" && (
            <>
              <Row align="center" gutter={20} style={{ marginTop: "32px" }}>
                <Col>
                  <Button
                    size="large"
                    icon={<SaveFilled />}
                    disabled={false}
                    type="primary"
                    onClick={() => {
                      const data = {
                        ...form.getFieldsValue(),
                        status:
                          records_details?.status === "SUBMITTED_TO_PI"
                            ? statusMap?.INPROGRESS_AT_PI_SUBMISSION
                            : statusMap?.INPROGRESS_AT_PI_RESUBMISSION,
                      };
                      submitRecordData(data);
                    }}
                    loading={
                      record_loading && record_request_type === "EDIT_RECORD"
                    }
                  >
                    Save
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="large"
                    disabled={false}
                    type="primary"
                    onClick={() => {
                      const comment =
                        form.getFieldValue("section14")?.pi_comments;
                      if (comment) {
                        const data = {
                          ...form.getFieldsValue(),
                          status:
                            records_details?.status === "SUBMITTED_TO_PI" ||
                            records_details?.status ===
                              "INPROGRESS_AT_PI_SUBMISSION"
                              ? statusMap?.SUBMITTED_TO_REVIWER_FROM_PI
                              : statusMap?.RESUBMITTED_TO_REVIWER_FROM_PI,
                        };
                        submitRecordData(data);
                      } else {
                        form.setFields([
                          {
                            name: ["section14", "pi_comments"],
                            errors: ["Please Enter Comment"],
                          },
                        ]);
                      }
                    }}
                    loading={
                      record_loading && record_request_type === "EDIT_RECORD"
                    }
                  >
                    Send back to Reviewer
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="large"
                    disabled={false}
                    type="primary"
                    onClick={() => {
                      setState((val) => ({ ...val, isSignOffModalOpen: true }));
                    }}
                    loading={
                      (auth_loading && auth_request_type === "LOGIN") ||
                      (record_loading && record_request_type === "EDIT_RECORD")
                    }
                  >
                    Sign Off
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </FormContainer>
      <Modal
        title="Sign Off"
        width="40vw"
        height="90%"
        centered
        footer={null}
        destroyOnClose
        visible={isSignOffModalOpen}
        onCancel={() => {
          setState((val) => ({
            ...val,
            isSignOffModalOpen: false,
          }));
          loginForm.setFieldsValue({ comment: "" });
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={function logIn(data) {
            manageAuthAsync({
              request_type: "LOGIN",
              payload: { ...data },
            });
          }}
          form={loginForm}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="sign_off_comments">
            <Input.TextArea
              rows={4}
              onChange={(e) => {
                signOffRef.current = { comment: e.target.value };
              }}
            />
          </Form.Item>
          <Row align="center">
            <Col>
              <Form.Item style={{ alignItems: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={
                    (auth_loading && auth_request_type === "LOGIN") ||
                    (record_loading && record_request_type === "EDIT_RECORD")
                  }
                >
                  Sign Off
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
const mapStateToProps = ({ record_reducer, auth_reducer }) => {
  return { record_reducer, auth_reducer };
};

const mapDispatchToProps = {
  manageRecordRequest: manageRecordRequest,
  manageRecordSuccess: manageRecordSuccess,
  manageAuthAsync: manageAuthRequest,
  manageAuthSuccess: manageAuthSuccess,
  manageAuthError: manageAuthError,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddRecord);

const FormContainer = styled.div`
  .collapse-space .ant-collapse-item {
    // min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top: 5px solid ${theme.token.colorSecondary};
    background: ${theme.token.colorWhite};
  }

  .ant-collapse-content {
    background: ${theme.token.colorWhite};
  }
  .ant-collapse-item-active .ant-collapse-header,
  .ant-collapse-header:hover {
    // background: ${theme.token.colorSecondary} !important;
    border-radius: 0 !important;
  }
`;
