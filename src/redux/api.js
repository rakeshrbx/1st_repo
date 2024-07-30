import axios from "axios";
import { Multipartheader, header, token } from "../helpers/utils";

export const LOGIN = async (url, request) => {
  return await axios
    .post(url, request?.payload)
    .then((x) => x.data)
    .catch((error) => {
      if (error) {
        error["is_error"] = true;
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
          } else if (error.response.data) {
            error.message = error.response.data;
          }
        } else {
          throw new Error(error.message);
        }
      }
      return error;
    });
};
export const POST = async (url, request) => {
  return await axios
    .post(url, request, header())
    .then((x) => x.data)
    .catch((error) => {
      if (error) {
        error["is_error"] = true;
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
          } else if (error.response.data && error.response.data.error) {
            error.message = error.response.data.error;
          } else if (error.response.data) {
            error.message = error.response.data;
          }
        } else {
          throw new Error(error.message);
        }
      }
      return error;
    });
};

export const FORMDATA_POST = async (url, request) => {
  return await axios
    .post(url, request, Multipartheader())
    .then((x) => x.data)

    .catch((error) => {
      if (error) {
        error["is_error"] = true;
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
          } else if (error.response.data) {
            error.message = error.response.data;
          }
        }
      }
      return error;
    });
};

export const FORMDATA_PATCH = async (url, request) => {
  return await axios
    .patch(url, request, Multipartheader())
    .then((x) => x.data)
    .catch((error) => {
      if (error) {
        error["is_error"] = true;
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
          } else if (error.response.data && error.response.data.Message) {
            error.message = error.response.data.Message;
          } else if (error.response.data) {
            error.message = error.response.data;
          }
        }
      }
      return error;
    });
};

export const GET = async (url) => {
  return await axios
    .get(url, header())
    .then((x) => x.data)
    .catch((error) => {
      if (error) {
        error["is_error"] = true;
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
          } else if (error.response.data && error.response.data.Message) {
            error.message = error.response.data.Message;
          } else if (error.response.data) {
            error.message = error.response.data;
          }
        }
      }
      return error;
    });
};

export const LIST = async (url, request) => {
  return await axios
    .get(url, header())
    .then((x) => x.data)

    .catch((error) => {
      if (error) {
        error["is_error"] = true;
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
          } else if (error.response.data && error.response.data.Message) {
            error.message = error.response.data.Message;
          } else if (error.response.data) {
            error.message = error.response.data;
          }
        }
      }
      return error;
    });
};

export const PATCH = async (url, request) => {
  return await axios
    .patch(url, request, header())
    .then((x) => x.data)

    .catch((error) => {
      if (error) {
        error["is_error"] = true;
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
          } else if (error.response.data && error.response.data.error) {
            error.message = error.response.data.error;
          } else if (error.response.data) {
            error.message = error.response.data;
          }
        }
      }
      return error;
    });
};

export const PUT = async (url, request) => {
  return await axios
    .put(url, request, header())
    .then((x) => x.data)
    .catch((error) => {
      if (error) {
        error["is_error"] = true;
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
          } else if (error.response.data && error.response.data.Message) {
            error.message = error.response.data.Message;
          } else if (error.response.data) {
            error.message = error.response.data;
          }
        }
      }
      return error;
    });
};

export const DELETE = async (url, request) => {
  return await axios
    .delete(url, {
      data: request,
      headers: {
        Authorization: "Bearer " + token(),
      },
    })
    .then((x) => x.data)

    .catch((error) => {
      if (error) {
        error["is_error"] = true;
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
          } else if (error.response.data && error.response.data.error) {
            error.message = error.response.data.error;
          } else if (error.response.data) {
            error.message = error.response.data;
          }
        }
      }
      return error;
    });
};
