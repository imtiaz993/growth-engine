import axios from "axios";
import { message, notification } from "antd";
import { ssoLogin } from "../utils/sso";
import { getToken } from "../utils/auth";

const sabreService = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60 * 1000,
});

sabreService.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
sabreService.interceptors.response.use(
  (response) => {
    switch (response.status) {
      case 200:
        if (response && response.data.code && response.data.code !== 0) {
          notification.error({
            message: "Error",
            description: response.data.msg,
          });
        }
        return response;
      default:
        return Promise.reject(new Error("Network Error"));
    }
  },
  (error) => {
    let msg = "Request Error";
    const res = error.response;
    if (res?.status === 401) {
      message.error("Token invalid");
      ssoLogin();
    } else {
      if (res?.data) {
        msg = res.data.msg;
        if (typeof res.data.detail === "string" && !msg) {
          msg = res.data.detail;
        } else if (typeof res.data.detail === "object" && !msg) {
          msg = res.data.detail[0].msg;
        }
      }
      notification.error({ message: "Error", description: msg });
    }
    return Promise.reject(error);
  }
);

export { sabreService };
