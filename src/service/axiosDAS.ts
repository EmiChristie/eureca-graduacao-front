import { dominio } from "@/util/constants";
import axios, { AxiosError } from "axios";


const eureca_DAS = `https://eureca.${dominio}.ufcg.edu.br/das/v2/`

export const axiosDAS = axios.create({
  baseURL: eureca_DAS,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

axiosDAS.interceptors.response.use(
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

export default axiosDAS;