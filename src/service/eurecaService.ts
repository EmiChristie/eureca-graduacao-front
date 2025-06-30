import { DAS_ENDPOINT, ENDPOINT, periodoDe } from "@/util/constants";
import axiosInstance from "./axios";
import { Autenticacao, Curriculo, CursoHome, Disciplina, DisciplinaCurriculo, DisciplinaPreRequisito, PlanoDeCurso, ProfileSig, ProfileScao, RelacionamentosDisciplina, Token, User, UserInfoPayload } from "@/interfaces/types";
import axiosEureca from "./axiosEureca";
import { cursorTo } from "readline";
import axiosDAS from "./axiosDAS";
import axiosDASSIG from "./axiosDASSIG";

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

export const getProfile = async (token: string) => {
  const { data } = await axiosEureca.get<ProfileSig>(
    '/profile',
    {
      headers: {
        'accept': 'application/json',
        'token-de-autenticacao': token
      }
    }
  );
  return data;
};

export const getUserInfo = async ({matricula}:UserInfoPayload) => {
    const { data } = await axiosInstance.get<User>(
        `/${ENDPOINT.USER_INFO}?matricula=${matricula}`,
    );
    
    return data;
}

export const getCurriculoAtivoMaisRecente = async (curso: number) => {
    console.log("aaaaaaaaaaaaaaaaa")
    const { data } = await axiosInstance.get<number>(
        `/${ENDPOINT.CURRICULO_ATIVO_MAIS_RECENTE}?curso=${curso}`,
    );
    
    return data;
}

export const getCurriculo = async (curso: number,curriculo:string) => {
    console.log("dsfsdfdsfsdfdsfds")
    console.log("curriculo enviado: "+curriculo)
    const { data } = await axiosInstance.get<Curriculo>(
        `/${ENDPOINT.CURRICULO}?curso=${curso}&curriculo=${curriculo}`,
    );
    
    console.log(data)
    return data;
}

export const getCurriculoAtivoMaisRecenteScao = async (curso: number) => {
    console.log("bbbbbbbbbbbbbbb")
    const { data } = await axiosInstance.get<number>(
        `/${ENDPOINT.CURRICULO_ATIVO_MAIS_RECENTE_SCAO}?curso=${curso}`,
    );
    
    return data;
}

export const getCurriculoScao = async (curso: number,curriculo:string) => {
    const { data } = await axiosInstance.get<Curriculo>(
        `/${ENDPOINT.CURRICULO_SCAO}?curso=${curso}&curriculo=${curriculo}`,
    );
    
    return data;
}

export const getRequisitosDisciplina = async (disciplina:number,curso: number,curriculo:number) => {

    console.log(curso)

    const { data } = await axiosInstance.get<RelacionamentosDisciplina>(
        `/${ENDPOINT.REQUISITOS_DISCIPLINA}?disciplina=${disciplina}&curso=${curso}&curriculo=${curriculo}`,
    );
    
    console.log("relacionamentos:")
    console.log(data)
    return data;
}

export const getDisciplinasPorCurriculo = async (curso: number,curriculo:string) => {
    const { data } = await axiosDASSIG.get<DisciplinaCurriculo[]>(
        `/${DAS_ENDPOINT.DISCIPLINAS_CURRICULO}?curso=${curso}&curriculo=${curriculo}`,
    );
    
    return data;
}

export const getDisciplinaCurriculo = async (curso: number,curriculo:number,disciplina:number) => {
    const { data } = await axiosDASSIG.get<DisciplinaCurriculo[]>(
        `/${DAS_ENDPOINT.DISCIPLINAS_CURRICULO}?curso=${curso}&curriculo=${curriculo}&disciplina=${disciplina}`,
    );
    
    return data;
}

export const getPreRequisitos = async (curso: number,curriculo:string) => {
    const { data } = await axiosDASSIG.get<DisciplinaPreRequisito[]>(
        `/${DAS_ENDPOINT.PRE_REQUISITOS}?curso=${curso}&curriculo=${curriculo}`,
    );
    
    return data;
}

export const getPreRequisitosScao = async (curso: number,curriculo:string) => {
    const { data } = await axiosDAS.get<DisciplinaPreRequisito[]>(
        `/${DAS_ENDPOINT.PRE_REQUISITOS}?curso=${curso}&curriculo=${curriculo}`,
    );
    
    return data;
}

export const getDisciplina = async (disciplina:number) => {
    const { data } = await axiosDASSIG.get<Disciplina[]>(
        `/${DAS_ENDPOINT.DISCIPLINAS}?disciplina=${disciplina}`,
    );
    
    return data;
}

export const getPlanoDeCurso = async (disciplina:number,curso:number) => {
    const { data } = await axiosDAS.get<PlanoDeCurso[]>(
        `/${DAS_ENDPOINT.PLANO_DE_CURSO}?curso=${curso}&disciplina=${disciplina}&periodo-de=2019.1`,
    );
    
    
    if (!data || data.length === 0) return null;

    const sorted = data.sort((a, b) => {
        const [anoA, semestreA] = a.periodo.split('.').map(Number);
        const [anoB, semestreB] = b.periodo.split('.').map(Number);

        if (anoA !== anoB) return anoB - anoA;
        return semestreB - semestreA;
    });

    return sorted[0];
}

export const getAreaRetencao = async (curso:number) => {
    const { data } = await axiosInstance.get<string>(
        `/${ENDPOINT.AREA_RETENCAO}?curso=${curso}`,
    );
    
    return data;
}

export const getExisteEstudanteScao = async (curso:number) => {
    const { data } = await axiosDAS.get<any>(
        `/${DAS_ENDPOINT.ESTUDANTES}?curso=${curso}&periodo-de-ingresso-de=${periodoDe}&pagina=1&tamanho=1`,
    );
    
    return data;
}

export const getExisteEstudanteSig = async (curso:number) => {
    const { data } = await axiosDASSIG.get<any>(
        `/${DAS_ENDPOINT.ESTUDANTES}?curso=${curso}&periodo-de-ingresso-de=${periodoDe}&pagina=1&tamanho=1`,
    );
    
    return data;
}
