import { Descriptions } from "antd";

function RecordLog(props) {
  const { record } = props;

  console.log(record);
  return (
    <Descriptions bordered size="small" column={2}>
      <Descriptions.Item label="Created By">
        {record?.section14?.createdBy}
      </Descriptions.Item>
      <Descriptions.Item label="Created Date/Time">
        {record?.section14?.createdOn}
      </Descriptions.Item>
      <Descriptions.Item label="Changed By">
        {record?.section14?.changedBy}
      </Descriptions.Item>
      <Descriptions.Item label="Changed Date/Time">
        {record?.section14?.changedOn}
      </Descriptions.Item>
    </Descriptions>
  );
}
export default RecordLog;
