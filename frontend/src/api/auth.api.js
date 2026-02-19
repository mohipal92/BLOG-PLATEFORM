import api from "./axios";

export const loginUser = (data) => api.post("/user/login", data);
export const signupUser = (data) => api.post("/user/signup", data);
export const getProfile = () => api.get("/user/getProfile");
export const logoutUser = () => api.post("/user/logout");
export const updateProfile=(data)=> api.put("/user/updateProfile",data);