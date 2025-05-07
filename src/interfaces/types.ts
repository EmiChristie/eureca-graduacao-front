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

export type Curso = {
    codigo_do_curso: number;
    descricao: string;
    status: string;
    grau_do_curso: string;
    codigo_do_setor: number;
    nome_do_setor: string;
    campus: number;
    nome_do_campus: string;
    turno: string;
    periodo_de_inicio: string;
    data_de_funcionamento: string;
    codigo_inep: number;
    modalidade_academica: string;
    curriculo_atual: number;
    area_de_retencao: number;
    ciclo_enade: number;
};

export type DisciplinasReprovacao = {
    codigo: number;
    nome: string;
    numeroDeReprovacoes: number;
}

export type MotivoEvasao = {
    motivo: string;
    porcentagem_evadidos: number;
};
  
export type PeriodoQuantidadeGraduados = {
    quantidade_de_periodos: number;
    quantidade_de_graduados: number;
    porcentagem_de_graduados: number;
};
  
export type GraduadosEvadidosPorPeriodo = {
    quantidade_graduados_periodo: number;
    quantidade_evadidos_periodo: number;
    taxa_de_sucesso_periodo: number;
    periodo: string;
};
  
export type MetricasCurso = {
    codigo_do_curso: number;
    taxa_de_sucesso: number;
    quantidade_de_graduados: number;
    quantidade_de_evadidos: number;
    quantidade_mulheres_graduadas: number;
    porcentagem_mulheres_graduadas: number;
    motivo_de_evasao_mais_comum: MotivoEvasao[];
    quantidade_real_periodos: PeriodoQuantidadeGraduados[];
    graduados_e_evadidos_por_periodo: GraduadosEvadidosPorPeriodo[];
    qtd_media_graduados_por_periodo: number;
    qtd_media_evadidos_por_periodo: number;
    periodo_mais_comum_de_evadir: number;
    qtd_media_creditos_reprovados: number;
};

export type MetricasCursoSimples = {
    taxaDeSucesso: number;
    quantidadeDeGraduados: number;
    quantidadeDeEvadidos: number;
    motivoEvasaoMaisComum: string;
}

export type Curriculo = {
    codigo_do_curso: number;
    codigo_do_curriculo: number;
    duracao_minima: number;
    duracao_maxima: number;
    carga_horaria_disciplinas_obrigatorias_minima: number;
    carga_horaria_disciplinas_optativas_minima: number;
    carga_horaria_atividades_complementares_minima: number;
    carga_horaria_minima_total: number;
    minimo_creditos_disciplinas_obrigatorias: number;
    minimo_creditos_disciplinas_optativas: number;
    minimo_creditos_atividades_complementares: number;
    minimo_creditos_total: number;
    numero_disciplinas_obrigatorias_minimo: number;
    numero_disciplinas_optativas_minimo: number;
    numero_disciplinas_minimo: number;
  };