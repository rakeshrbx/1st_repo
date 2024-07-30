import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({ children, role }) => {
  let location = useLocation();
  let roles = "";
  let redirectedUrl = "";
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    const cData = jwtDecode(token);
    if (cData) {
      roles = cData?.roles;
      if (roles === "ROLE_ADMIN") redirectedUrl = "admin/user-management";
      else redirectedUrl = "/";
    }
  } else redirectedUrl = "/";
  console.log(roles);
  return role?.split(",")?.includes(roles) ? (
    // true
    children
  ) : (
    <Redirect
      to={`${redirectedUrl}`}
      state={{ from: location }}
      replace={true}
    />
  );
};

export default ProtectedRoute;
