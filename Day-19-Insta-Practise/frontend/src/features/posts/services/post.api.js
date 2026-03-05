import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export const getFeed = async () => {
  const res = await api.get("/feeds");
  return res.data;
};
