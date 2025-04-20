// axiosInstance.ts
import axios from "axios";

export const axiosInstance = axios.create({
  //TODO: put it inside .env
  baseURL: "http://localhost:3000", // Replace with your API base URL
  // withCredentials: true, // Optional, if you're using cookies for auth
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
