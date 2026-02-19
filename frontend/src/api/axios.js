import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-by-mk.onrender.com",
  withCredentials: true, // IMPORTANT for cookies
});

export default api;
