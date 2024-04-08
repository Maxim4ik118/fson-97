import axios from "axios";

const instance = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = "";
};

export const requestSignUp = async (formData) => {
  const { data } = await instance.post("/users/signup", formData);
  setToken(data.token);

  return data;
};

export const requestSignIn = async (formData) => {
  const { data } = await instance.post("/users/login", formData);
  setToken(data.token);
  
  return data;
};

export const requestGetCurrentUser = async () => {
  const { data } = await instance.get("/users/current");

  return data;
};

export const requestLogOut = async () => {
  const { data } = await instance.post("/users/logout");

  return data;
};
