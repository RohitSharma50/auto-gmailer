import axios from "axios";
const API_BASE =
  import.meta.env.VITE_API_BASE || "https://auto-gmailer.onrender.com";
export const api = axios.create({ baseURL: API_BASE, withCredentials: false });
export const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
