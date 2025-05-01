import axios, { AxiosError } from "axios";


const eureca_as = "https://eureca.lsd.ufcg.edu.br/as/"

export const axiosEureca = axios.create({
  baseURL: eureca_as,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

axiosEureca.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosEureca;