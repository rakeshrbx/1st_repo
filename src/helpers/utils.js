import { jwtDecode as decode } from "jwt-decode";

export const Multipartheader = () => {
  return {
    headers: {
      Authorization: "Bearer " + token(),
      "content-type": "multipart/form-data",
      Accept: "application/json",
      processData: false,
    },
  };
};
export const token = () => {
  return localStorage.getItem("token");
};

export const header = () => {
  return {
    headers: {
      Authorization: "Bearer ".concat(token()),
    },
  };
};

export const CheckAuth = () => {
  const current_user = localStorage.getItem("token");
  if (!current_user) {
    return false;
  }
  try {
    let token = current_user;
    if (token) {
      const { exp } = decode(token);
      if (exp < new Date().getTime() / 1000) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
export const objectToQueryString = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export const _groupBy_ = (obj, key) => {
  return obj.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
