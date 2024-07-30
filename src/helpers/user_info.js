import { jwtDecode as decode } from "jwt-decode";

class UserInfo {
  constructor() {
    const current_user = localStorage.getItem("token");
    let token = current_user;
    if (token) {
    } else {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }

  static getRoles() {
    const current_user = localStorage.getItem("token");
    if (!current_user) return null;
    const { roles } = decode(current_user);
    return roles;
  }

  static getSiteID() {
    const current_user = localStorage.getItem("token");
    if (!current_user) return null;
    const { SiteId } = decode(current_user);
    return SiteId;
  }

  static getUser() {
    const current_user = localStorage.getItem("token");
    if (!current_user) return null;
    const { sub } = decode(current_user);
    return sub;
  }

  static getToken() {
    return localStorage.getItem("token");
  }
}

export default UserInfo;
