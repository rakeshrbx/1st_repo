import React from "react";
import { Table } from "antd";
import styled from "styled-components";

const AntdExcelTable = ({ dataSource, columns }) => {
  return (
    <TableStyles>
      <div className="table-container">
        <Table
          size="small"
          dataSource={dataSource}
          columns={columns}
          pagination={true} // Disable built-in pagination for now
          className="styled-table"
          scroll={{ x: true }} // Adjust y value as needed
        />
      </div>
    </TableStyles>
  );
};

export default AntdExcelTable;

export const TableStyles = styled.div`
  /* Styles for the scrollable container */
  .table-container {
    overflow-x: auto; /* Enable horizontal scrolling */
    max-width: 100%; /* Ensure it doesn't overflow the parent */
    padding: 10px; /* Add padding for spacing */
  }

  /* Styles for the table itself */
  .styled-table {
    width: 100%; /* Take full width of its container */
    border-collapse: collapse; /* Remove space between cells */
    border: 1px solid #ddd; /* Add border for clarity */
  }

  .styled-table th,
  .styled-table td {
    padding: 8px; /* Add padding inside cells */
    text-align: left; /* Align text to the left */
    border: 1px solid #ddd; /* Add border between cells */
    overflow: hidden; /* Hide overflowing content */
    white-space: nowrap; /* Prevent text from wrapping */
  }
  .styled-table th {
    background-color: #f2f2f2; /* Light gray background for headers */
    color: #333; /* Dark text color for headers */
  }

  .styled-table tbody tr:nth-child(even) {
    background-color: #f9f9f9; /* Alternate row background color */
  }

  .styled-table tbody tr:hover {
    background-color: #f2f2f2; /* Hover background color */
  }
`;
