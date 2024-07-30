import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
export const SwalWarning = (text) => {
  Swal.fire({
    icon: "Warning",
    title: "Oops...",
    text: text,
  }).then((result) => {
    if (result.isConfirmed) {
    }
  });
};

export const SwalSuccess = (text) => {
  Swal.fire({
    icon: <CheckCircleOutlined />,
    title: "Success",
    text: text,
  }).then((result) => {
    if (result.isConfirmed) {
    }
  });
};

export const SwalError = (text) => {
  Swal.fire({
    icon: <CloseCircleOutlined />,
    title: "Error",
    text: text,
  }).then((result) => {
    if (result.isConfirmed) {
    }
  });
};
