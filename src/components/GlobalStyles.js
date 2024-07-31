import styled from "styled-components";
import theme from "../helpers/theme";

export const MainAppStyles = styled.div`
  .ant-collapse-header {
    font-weight: 600;
    font-size: 16px;
    color: ${theme.token.colorTeritiary} !important;
    display: flex;
    align-items: center !important;
    border-radius: 5px;
  }

  .ant-collapse-header:hover,
  .ant-collapse-item-active .ant-collapse-header {
    border-radius: 0 0 5px 5px !important;
    color: ${theme.token.colorTeritiary} !important;
  }

  .ant-collapse-item-active .ant-collapse-header {
    font-size: 20px;
  }

  .ant-form-item-label > label {
    font-weight: 600;
    font-size: 14px;
    color: black;
    // margin: 0 !important;
  }

  .ant-form-item .ant-form-item-label::before {
    margin-left: -10px;
  }
  .ant-input[disabled] {
    color: black;
  }

  .ant-message .ant-message-notice-wrapper .ant-message-notice-content {
    font-weight: 600 !important;
  }

  .ant-divider-inner-text {
    color: ${theme.token.colorPrimary} !important;
  }

  .ant-card {
    padding: 5px;
  }

  .ant-layout-content {
    background-color: ${theme.token.colorTeritiary};
  }

  .ant-card-head-title {
    font-size: 24px;
    text-align: start;
    font-weight: 600;
    // margin-left: 16px;
    padding: 8px;
    color: ${theme.token.colorTeritiary};
  }

  .ant-table-thead .ant-table-cell {
    font-size: 14px !important;
    background: #f5f5f5;
    font-weight: 700;
  }

  .ant-table-tbody .ant-table-cell {
    font-size: 14px !important;
    font-weight: 400;
    color: black;
    paddingleft: 20px;
  }

  :where(.css-dev-only-do-not-override-6c20p7).ant-menu-light
    .ant-menu-submenu-selected
    > .ant-menu-submenu-title {
    color: black;
  }

  .ant-menu-light .ant-menu-submenu-selected > .ant-menu-submenu-title {
    color: black;
  }

  .ant-card.bt-info {
    border-top: 5px solid ${theme.token.colorSecondary};
  }

  :where(.css-dev-only-do-not-override-19fq1kh).ant-badge.ant-badge-status
    .ant-badge-status-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    vertical-align: middle;
    border-radius: 0;
  }
`;
