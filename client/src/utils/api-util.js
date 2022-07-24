import axios from "axios";

const Post = async ({ path, data }) => {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${path}`,
    data
  );
};

const Patch = async ({ path, data }) => {
  const token = localStorage.getItem("token");
  return await axios.patch(
    `${process.env.REACT_APP_API_BASE_URL}/${path}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { Post, Patch };
