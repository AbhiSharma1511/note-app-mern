import axios from "axios";
import { BASE_URL } from "./constants.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    // console.log("Access Token:", accessToken); // Log the token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error); // Log the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
