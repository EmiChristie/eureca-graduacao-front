import { ENDPOINT } from "@/util/constants";
import axiosInstance from "./axios";
import { CursoHome } from "@/components/interfaces/types";

export const testarConexao = async () => {
    const { data } = await axiosInstance.get<String>(
        `/${ENDPOINT.CONEXAO}`
    );
    
    return data;
}

export const getCursos = async () => {
    const { data } = await axiosInstance.get<CursoHome[]>(
        `/${ENDPOINT.CURSOS}`
    );

    console.log(data);
    
    return data;
}