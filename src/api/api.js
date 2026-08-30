import axios from "axios";

const api = axios.create({
  baseURL: `/api`,
});
api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.jwtToken) config.headers.Authorization = `Bearer ${auth.jwtToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
