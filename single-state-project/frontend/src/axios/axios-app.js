import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const fetchUsers = () => {
  return axiosApi.get("/users");
};
