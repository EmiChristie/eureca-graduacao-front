import { DAS_ENDPOINT, ENDPOINT } from "@/util/constants";
import axiosInstance from "./axios";
import { Autenticacao, Curriculo, CursoHome, Disciplina, DisciplinaCurriculo, DisciplinaPreRequisito, Token, User, UserInfoPayload } from "@/interfaces/types";
import axiosEureca from "./axiosEureca";
import { cursorTo } from "readline";
import axiosDAS from "./axiosDAS";

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

    sessionStorage.setItem("token",data.token);
    return data.token;
};

export const getUserInfo = async ({matricula}:UserInfoPayload) => {
    const { data } = await axiosInstance.get<User>(
        `/${ENDPOINT.USER_INFO}?matricula=${matricula}`,
    );
    
    return data;
}

export const getCurriculoAtivoMaisRecente = async (curso: number) => {
    const { data } = await axiosInstance.get<number>(
        `/${ENDPOINT.CURRICULO_ATIVO_MAIS_RECENTE}?curso=${curso}`,
    );
    
    return data;
}

export const getCurriculo = async (curso: number,curriculo:number) => {
    const { data } = await axiosInstance.get<Curriculo>(
        `/${ENDPOINT.CURRICULO}?curso=${curso}&curriculo=${curriculo}`,
    );
    
    return data;
}

export const getDisciplinasPorCurriculo = async (curso: number,curriculo:number) => {
    const { data } = await axiosDAS.get<DisciplinaCurriculo[]>(
        `/${DAS_ENDPOINT.DISCIPLINAS_CURRICULO}?curso=${curso}&curriculo=${curriculo}`,
    );
    
    return data;
}

export const getDisciplinaCurriculo = async (curso: number,curriculo:number,disciplina:number) => {
    const { data } = await axiosDAS.get<DisciplinaCurriculo[]>(
        `/${DAS_ENDPOINT.DISCIPLINAS_CURRICULO}?curso=${curso}&curriculo=${curriculo}&disciplina=${disciplina}`,
    );
    
    return data;
}

export const getPreRequisitos = async (curso: number,curriculo:number) => {
    const { data } = await axiosDAS.get<DisciplinaPreRequisito[]>(
        `/${DAS_ENDPOINT.PRE_REQUISITOS}?curso=${curso}&curriculo=${curriculo}`,
    );
    
    return data;
}

export const getDisciplina = async (disciplina:number) => {
    const { data } = await axiosDAS.get<Disciplina[]>(
        `/${DAS_ENDPOINT.DISCIPLINAS}?disciplina=${disciplina}`,
    );
    
    return data;
}