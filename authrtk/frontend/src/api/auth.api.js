import api from "./axios";
import axios from "./axios";


export const signinApi = (data) =>
  api.post("/signin", data);

export const signupApi = (data) =>
  api.post("/signup", data);

export const signoutApi = () =>
  api.post("/signout");

export const refreshApi = (refreshToken) =>
  api.post("/refresh", { refreshToken });

export const forgotPasswordApi = (data) =>
  axios.post("/forgot-password", data);

export const resetPasswordApi = ({ token, password }) =>
  axios.post(`/reset-password/${token}`, { password });

export const verifyEmailApi = (token) =>
  axios.get(`/verify-email/${token}`);



