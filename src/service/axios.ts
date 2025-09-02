import axios, { AxiosError } from "axios";

const api_url = "https://eureca.sti.ufcg.edu.br/graduacao-backend/"//"http://localhost:8080/" //

export const axiosInstance = axios.create({
  baseURL: api_url,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "any",
    "Content-Type": "application/json",
  }
});

axiosInstance.interceptors.request.use((config) => {
  let token = sessionStorage.getItem("token")
  if (token) {
    config.headers.token = `${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      window.location.href = "/graduacao/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;