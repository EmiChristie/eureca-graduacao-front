export type CursoHome = {
    codigo_do_curso: number,
    descricao: string,
    campus: number,
    nome_do_campus: string,
    area_de_retencao: number,
    area_de_retencao_descricao: string,
    codigo_do_curriculo: number|null
}

export type User = {
    matricula_do_estudante: string;
    nome: string;
    codigo_do_curso: number;
    codigo_do_curriculo: number;
    campus: number;
    codigo_do_setor: number;
    situacao: string;
    cra: number;
    mc: number;
    iech: number;
    iepl: number;
    iea: number;
    mcn: number;
    iean: number;
    creditos_do_cra: number;
    notas_acumuladas: number;
    periodos_completados: number;
    creditos_tentados: number;
    creditos_completados: number;
    creditos_isentos: number;
    creditos_falhados: number;
    creditos_suspensos: number;
    creditos_em_andamento: number;
    velocidade_media: number;
    taxa_de_sucesso: number;
  };

export type Autenticacao = {
    username: string,
    password: string
}

export type Token = { 
    token: string 
}

export type UserInfoPayload = {
    matricula: string,
    token: string
}