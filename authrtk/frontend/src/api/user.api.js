import api from "./axios";

export const getMeApi = () =>
  api.get("/auth/me");

export const updateMeApi = (data) =>
  api.put("/auth/me", data);