import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5500/api/users",
});

export const signUp = (userData) => API.post("/register", userData);
export const signIn = (userData) => API.post("/login", userData);
