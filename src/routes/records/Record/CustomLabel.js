import { Badge, Card, Input, Popover, Timeline } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import theme from "../../../helpers/theme";
import UserInfo from "../../../helpers/user_info";
import fields from "./fields";
import sectionNumbers from "./sectionNumbers";
import sections from "./sections";

function CustomLabel(props) {
  const [{ filteredData, currentComments }, setLocalState] = useState({
    filteredData: null,
    currentComments: { ...fields },
  });
  const {
    title,
    isCommentsVisible,
    name,
    visibility,
    section,
    setState,
    isPopOverOpen,
    handleCommentData,
    currentCommentBox,
    comments,
    oldComments,
    auditData,
    record,
    auditDataRef,
  } = props;

  const sortedData = auditData?.sort((a, b) =>
    String(a?.["Date & Time of User Entry"]).localeCompare(
      b?.["Date & Time of User Entry"]
    )
  );

  useEffect(() => {
    if (sortedData) {
      let localComments = { ...fields };
      sortedData?.forEach((val) => {
        localComments = {
          ...localComments,
          [sectionNumbers?.[val?.Section]]: {
            ...localComments[sectionNumbers?.[val?.Section]],
            [val?.FieldName]: val?.["User Role"],
          },
        };
        // }
      });
      setState((val) => ({
        ...val,
        oldComments: { ...localComments },
        comments: { ...localComments },
      }));
    }
  }, [auditData, setState, sortedData]);

  const compareArrays = (a, b) =>
    a?.length === b?.length &&
    a?.every((element, index) => element === b[index]);

  const items = filteredData
    ?.sort((a, b) =>
      String(a?.["Date & Time of User Entry"])?.localeCompare(
        b?.["Date & Time of User Entry"]
      )
    )
    .map((val) => ({
      // label: dayjs(val?.["Date & Time of User Entry"]).format(
      //   "DD-MMM-YYYY, HH:mm"
      // ),
      position: UserInfo?.getRoles() === val?.["User Role"] ? "left" : "right",
      children:
        val?.["User Role"] === "ROLE_REVIEWER" ? (
          <>
            <span
              style={{ fontWeight: "600", color: theme?.token?.colorPrimary }}
            >
              {dayjs(val?.["Date & Time of User Entry"]).format(
                "DD-MMM-YYYY, HH:mm"
              )}{" "}
              {`(${val?.["User Name"]})`}
              {/* - (${val?.["User Role"]?.slice(5)})`} */}
              <br />
            </span>
            <span style={{ fontWeight: "600", color: "black" }}>comment: </span>
            {val?.Comment}
          </>
        ) : (
          <>
            <span
              style={{ fontWeight: "600", color: theme?.token?.colorPrimary }}
            >
              {dayjs(val?.["Date & Time of User Entry"]).format(
                "DD-MMM-YYYY, HH:mm"
              )}{" "}
              {`(${val?.["User Name"]})`}
              {/* - (${val?.["User Role"]?.slice(5)})`} */}
            </span>
            <br />
            <>
              <span style={{ fontWeight: "600", color: "black" }}>
                comment:{" "}
              </span>
              {val?.Comment}
            </>
            <br />
            <>
              <span style={{ fontWeight: "600", color: "black" }}>
                Old Value:{" "}
              </span>
              {/* {`${val?.["Old Value"]}`} */}
              {val?.["Old Value"] ? `${val?.["Old Value"]}` : "--"}
            </>
            <br />
            <>
              <span style={{ fontWeight: "600", color: "black" }}>
                New Value:{" "}
              </span>
              {val?.["New Value"] ? `${val?.["New Value"]}` : "--"}
            </>
          </>
        ),
    }));

  return (
    <>
      {isCommentsVisible ? (
        <>
          <Popover
            content={
              <Card>
                <Timeline
                  // mode="alternate"
                  items={items}
                  style={{
                    maxWidth: "600px",
                    maxHeight: "70vh",
                    overflowY: "scroll",
                    padding: "10px",
                    marginBottom: "10px",
                    overflow: "auto",
                    scrollbarWidth: "none",
                  }}
                />
                <Input.TextArea
                  // style={{ width: "50vh" }}
                  placeholder="Comments (If Any)"
                  disabled={UserInfo?.getRoles() === "ROLE_PI"}
                  rows={2}
                  style={{ minWidth: "400px", maxWidth: "600px" }}
                  size="large"
                  // defaultValue={comments?.[section]?.[name]}
                  onBlur={(e) => {
                    setState((val) => ({
                      ...val,
                      comments: {
                        ...val.comments,
                        [section]: {
                          ...val.comments[section],
                          [name]: e.target.value
                            ? UserInfo?.getRoles()
                            : oldComments?.[section]?.[name],
                        },
                      },
                    }));

                    if (UserInfo?.getRoles() === "ROLE_DATAENTRY") {
                      let tempAuditData;
                      if (
                        auditDataRef?.current?.filter(
                          (val) => val.fieldName === name
                        )?.length > 0
                      ) {
                        const record = auditDataRef?.current?.filter(
                          (val) => val.fieldName === name
                        )?.[0];
                        tempAuditData = {
                          ...record,
                          comment: e.target.value,
                        };
                      } else {
                        tempAuditData = {
                          id: section?.split("")?.at(-1),
                          sectionName: sections?.[section],
                          labelName: title,
                          fieldName: name,
                          oldValue: record?.[section]?.[name],
                          newValue: record?.[section]?.[name],
                          comment: e.target.value,
                        };
                      }
                      const data = [
                        ...auditDataRef?.current?.filter(
                          (val) => val.fieldName !== name
                        ),
                        tempAuditData,
                      ];

                      auditDataRef.current = data?.filter((val) =>
                        !Array.isArray(val?.newValue) &&
                        !Array.isArray(val?.oldValue)
                          ? val?.comment || val?.oldValue !== val?.newValue
                          : val?.comment ||
                            !compareArrays(val?.oldValue, val?.newValue)
                      );
                    } else {
                      handleCommentData(section, title, name, e.target.value);
                    }
                    setLocalState((val) => ({
                      ...val,
                      currentComments: {
                        ...val?.currentComments,
                        [section]: {
                          ...val?.currentComments?.[section],
                          [name]: e.target.value,
                        },
                      },
                    }));
                  }}
                />
              </Card>
            }
            title={
              <div
                style={{
                  marginLeft: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {title}
              </div>
            }
            trigger="click"
            open={currentCommentBox === name && isPopOverOpen}
            onOpenChange={(newOpen) => {
              setLocalState((val) => ({
                ...val,
                currentName: name,
                currentSection: section,
                filteredData: auditData?.filter(
                  (val) =>
                    val?.Section === sections[section] &&
                    val?.FieldName === name
                ),
              }));
              setState((val) => ({
                ...val,
                isPopOverOpen: newOpen,
                currentCommentBox: name,
              }));
            }}
          >
            <Badge
              dot
              // count={0}
              color={
                currentComments?.[section]?.[name]
                  ? "yellow"
                  : comments?.[section]?.[name] &&
                    comments?.[section]?.[name] === UserInfo.getRoles() &&
                    !currentComments?.[section]?.[name]
                  ? "red"
                  : !comments?.[section]?.[name]
                  ? "green"
                  : "orange"
              }
              // text={title}
              style={{
                marginRight: "10px",
              }}
            />
          </Popover>
          {/* <span
            style={{
              color: visibility === "hidden" ? "rgba(0, 0, 0, 0)" : "black",
            }}
          >
            { */}
          <div
            className="label"
            style={{
              display: visibility === "hidden" ? "none" : "block",
            }}
          >
            {title}
          </div>
          {/* }
          </span> */}
        </>
      ) : (
        <div
          className="label"
          style={{
            display: visibility === "hidden" ? "none" : "block",
          }}
        >
          {title}
        </div>
        // <>{visibility !== "hidden" && title}</>
      )}
    </>
  );
}

export default CustomLabel;
