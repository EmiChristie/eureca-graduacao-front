import { ENDPOINT } from "@/util/constants";
import axiosInstance from "./axios";
import { Autenticacao, CursoHome, Token, User, UserInfoPayload } from "@/interfaces/types";
import axiosEureca from "./axiosEureca";

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

export const getToken = async (credenciais: Autenticacao) => {
    const {username, password} = credenciais;
    const body = {
      credentials: {
        username,
        password,
      },
    };
    const { data } = await axiosEureca.post<Token>(
      `/tokens`,
      body
    );

    console.log(data.token);
    sessionStorage.setItem("token",data.token);
    return data.token;
};


export const getUserInfo = async ({matricula}:UserInfoPayload) => {
    const { data } = await axiosInstance.get<User>(
        `/${ENDPOINT.USER_INFO}?matricula=${matricula}`,
    );

    console.log(data);
    
    return data;
}