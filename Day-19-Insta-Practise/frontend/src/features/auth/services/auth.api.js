import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const login = async (username, password) => {
  const res = await api.post("/login", {
    username,
    password,
  });

  return res.data;
};

export const register = async (username, email, password) => {
  const res = await api.post("/register", {
    username,
    email,
    password,
  });
  return res.data;
};

export const getMe = async () => {
  const res = await get.api("/get-me");
  return res.data;
};
