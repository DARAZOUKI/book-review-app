import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-bookreviewapp.onrender.com", // Adjust if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
