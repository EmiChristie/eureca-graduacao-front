import { ENDPOINT } from "@/util/constants";
import axiosInstance from "./axios";

export const testarConexao = async () => {
    const { data } = await axiosInstance.get<String>(
        `/${ENDPOINT.CONEXAO}`
    );
    
    return data;
}