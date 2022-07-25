import axios from "axios";
import { Navigate } from "react-router-dom";

// const Post = async ({ path, data }) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API_BASE_URL}/${path}`,
//     data
//   );
// };

// const Patch = async ({ path, data }) => {
//   const token = localStorage.getItem("token");
//   return await axios.patch(
//     `${process.env.REACT_APP_API_BASE_URL}/${path}`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };

const server = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

server.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response);

    if (error.response.status === 401) {
      console.log("AUTH ERROR");
      return <Navigate to="/landing" />;
    }
    return Promise.reject(error);
  }
);

export { server };
