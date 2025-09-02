import { dominio } from "@/util/constants";
import axios, { AxiosError } from "axios";


const eureca_DASSIG = `https://eureca.${dominio}.ufcg.edu.br/das-sig/v1/`

export const axiosDASSIG = axios.create({
  baseURL: eureca_DASSIG,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

axiosDASSIG.interceptors.response.use(
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

export default axiosDASSIG;