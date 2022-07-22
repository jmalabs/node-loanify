import axios from "axios";

const Post = async ({ path, data }) => {
  console.log(process.env);
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${path}`,
    data
  );
};

export { Post };
