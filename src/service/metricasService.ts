import { ENDPOINT } from "@/util/constants";
import axiosInstance from "./axios";
import { Autenticacao, Curso, CursoHome, DesempenhoAlunoResponse, DisciplinasReprovacao, GetDesempenhoAlunoPayload, MetricasCurso, MetricasDisciplina, Token, User, UserInfoPayload } from "@/interfaces/types";

export const getCurso = async (curso: number) => {
    const { data } = await axiosInstance.get<Curso>(
        `/${ENDPOINT.CURSO}`,
        {params:{curso: curso}}
    );

    console.log(data);
    
    return data;
}

export const getDisciplinasObrigatoriasQueMaisReprovam = async (curso: number,curriculo: number|string) => {
    const { data } = await axiosInstance.get<DisciplinasReprovacao[]>(
      `/${ENDPOINT.DISCIPLINAS_OBRIGATORIAS_REPROVACAO}`,
      {
        params: {
          curso,
          curriculo,
        },
      }
    );
  
    console.log(data);
  
    return data;
  };


export const getMetricasCurso = async (curso: number,curriculo: number|string) => {
    const { data } = await axiosInstance.get<MetricasCurso>(
      `/${ENDPOINT.METRICAS_CURSO}`,
      {
        params: {
          curso,
          curriculo,
        },
      }
    );
  
    console.log(data);
  
    return data;
  };


export const getMetricasDisciplina = async (disciplina: number,curso: number) => {
    const { data } = await axiosInstance.get<MetricasDisciplina>(
      `/${ENDPOINT.METRICAS_DISCIPLINA}`,
      {
        params: {
          curso,
          disciplina,
        },
      }
    );
  
    console.log(data);
  
    return data;
  };


export const getDesempenhoAluno = async (params: GetDesempenhoAlunoPayload) => {
  const { data } = await axiosInstance.get<DesempenhoAlunoResponse>(
    `/${ENDPOINT.DESEMPENHO_ALUNO}`,
    { params }
  );

  console.log("metricas aluno:")
  console.log(data);
  return data;
};