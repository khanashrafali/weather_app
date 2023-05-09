import * as api from "./apiHelper";

export const userSignup = async (params) => {
  const postSignupResponse = await api.post(`/signup`, params);
  return postSignupResponse;
};

export const userLogin = async (params) => {
  const postLoginResponse = await api.post(`/login`, params);
  return postLoginResponse;
};
