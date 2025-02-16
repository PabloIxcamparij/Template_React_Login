import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

api.interceptors.request.use((config : any) => {
  const token = localStorage.getItem("AUTH_TOKEN_LOGIN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
});

export default api;
