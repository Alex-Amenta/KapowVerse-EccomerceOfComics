// import Axios from "axios";


// Axios.interceptors.request.use(
//   () => {
//     const {token} = JSON.parse(localStorage.getItem("userlog")) ;
//     return {
//       headers: {
//         ...(token && { Authorization: `${token}` }),
//       },
//     };
//   },
//   (error) => {console.log(error)}
// );

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
    console.error(error);
    return Promise.reject(error);
  }
);
