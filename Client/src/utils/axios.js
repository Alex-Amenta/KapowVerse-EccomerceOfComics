import Axios from "axios";

Axios.interceptors.request.use(
  (config) => {
    const userlog = JSON.parse(localStorage.getItem("userlog"));
    if (userlog && userlog.token) {
      config.headers.Authorization = `${userlog.token}`;
    }
    return config;
  },
  (error) => {
    console.error("axios", error);
    return Promise.reject(error);
  }
);
