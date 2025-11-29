import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: false
});
export default axiosInstance;
