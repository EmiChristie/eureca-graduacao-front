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
    curriculo_atual: number|string;
    area_de_retencao: number;
    ciclo_enade: number;
};

export type DisciplinasReprovacao = {
    codigo_da_disciplina: number;
    nome_da_disciplina: string;
    total_de_matriculas: number;
    total_de_reprovacoes: number;
    porcentagem_de_reprovacoes: number;
}

export type MetricasCurso = {
    taxaDeSucesso: number;
    codigo_do_curso: number;
    graduados_evadidos_e_ativos_por_periodo: GraduadosEvadidosEAtivosPorPeriodo[];
    taxa_de_sucesso_media: number;
    desvio_padrao_percentual: number;
    taxa_sucesso_media_mulheres: number;
    desvio_padrao_percentual_mulheres: number;
    desvio_padrao_percentual_medio_de_genero: number;
    porcentagem_media_mulheres_entre_graduados: number;
    porcentagem_media_homens_entre_graduados: number;
    porcentagem_media_mulheres_graduadas_em_relacao_as_mulheres_ingressantes: number;
    porcentagem_media_homens_graduados_em_relacao_aos_homens_ingressantes: number;
    quantidade_media_ingressantes: number;
    quantidade_media_graduados: number;
    quantidade_media_evadidos: number;
    quantidade_media_mulheres_ingressantes: number;
    quantidade_media_homens_ingressantes: number;
    desvio_padrao_ingressantes: number;
    desvio_padrao_mulheres_ingressantes: number;
    desvio_padrao_graduados: number;
    erro_global: number;
    periodos_mais_comuns_de_evadir: PeriodoMaisComumDeEvadir[];
    media_periodos_para_se_formar: MediaPeriodosParaSeFormar;
    taxas_medias_graduados: TaxaMediaGraduados[];
    taxas_medias_globais: TaxasMediasGlobais;
    perfil_aluno_medio: PerfilAlunoMedioType;
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

export type DisciplinaCurriculo = {
    codigo_do_curso: number;
    codigo_do_curriculo: number|string;
    codigo_da_disciplina: number;
    tipo: string;
    semestre_ideal: string|number|null;
    status: string;
    horas_totais: number;
    nome: string;
    quantidade_de_creditos: number;
}

export type DisciplinaPreRequisito = {
    codigo_do_curso: number;
    codigo_da_disciplina: number;
    codigo_do_curriculo: number | string;
    ordem_de_prioridade: number;
    tipo: string;
    condicao: number;
    operador: string;
}

export type GraduadosEvadidosEAtivosPorPeriodo = {
  periodo: string;
  total_alunos: number;
  mulheres_ingressantes: number;
  mulheres_graduadas: number;
  homens_ingressantes: number;
  homens_graduados: number;
  graduados: number;
  evadidos: number;
  ativos: number;
  taxa_de_sucesso: number;
  porcentagem_ativos: number;
  porcentagem_mulheres_graduadas_em_relacao_aos_graduados: number;
  porcentagem_mulheres_graduadas_em_relacao_ao_total: number;
  porcentagem_mulheres_graduadas_em_relacao_as_mulheres_ingressantes: number;
  porcentagem_homens_graduados_em_relacao_aos_graduados: number;
  porcentagem_homens_graduados_em_relacao_ao_total: number;
  porcentagem_homens_graduados_em_relacao_aos_homens_ingressantes: number;
};

export type PeriodoMaisComumDeEvadir = {
  periodo: string;
  quantidade_de_evadidos: number;
  porcentagem_de_evadidos: number;
};

export type GraduadosPorQtdPeriodos = {
  quantidade_de_periodos: string;
  quantidade_de_graduados: number;
  porcentagem_de_graduados: number;
};

export type MediaPeriodosParaSeFormar = {
  media_periodos_para_se_formar: number;
  periodo_em_destaque: string;
  quantidade_media_periodos_para_se_formar: number[];
  graduados_por_qtd_periodos: GraduadosPorQtdPeriodos[];
};

export type TaxaMediaGraduados = {
  quantidade_de_periodos: string;
  quantidade_de_graduados: number;
  velocidade_media: number;
  taxa_de_sucesso_media: number;
  cra_medio: number;
  desvio_padrao_velocidade_media: number;
  desvio_padrao_taxa_de_sucesso_media: number;
  desvio_padrao_cra_medio: number;
};

export type TaxasMediasGlobais = {
  velocidade_media_global: number;
  taxa_de_sucesso_media_global: number;
  cra_medio_global: number;
};

export type PerfilAlunoMedioType = {
  quantidade_de_periodos_media: number[];
  cra_medio: number;
  taxa_de_sucesso_media: number;
  velocidade_media: number;
  creditos_matriculados_media: number;
  creditos_reprovados_media: number;
};

export type Disciplina = {
  codigo_da_disciplina: number;
  nome: string;
  carga_horaria_teorica_semanal: number;
  carga_horaria_pratica_semanal: number;
  quantidade_de_creditos: number;
  horas_totais: number;
  media_de_aprovacao: number;
  carga_horaria_teorica_minima: number | null;
  carga_horaria_pratica_minima: number | null;
  carga_horaria_teorica_maxima: number | null;
  carga_horaria_pratica_maxima: number | null;
  numero_de_semanas: number | null;
  codigo_do_setor: number;
  nome_do_setor: string;
  campus: number;
  nome_do_campus: string;
  status: string;
  contabiliza_creditos: string;
  tipo_de_componente_curricular: string;
  carga_horaria_extensao: number | null;
}

export type DisciplinaRelacionada = {
  nome: string;
  codigo: string;
};

export type RelacionamentosDisciplina = {
  pre_requisitos: DisciplinaRelacionada[];
  co_requisitos: DisciplinaRelacionada[];
  disciplinas_equivalentes: DisciplinaRelacionada[];
};

export type PlanoDeCurso = {
  turma: number;
  codigo_da_disciplina: number;
  nome_da_disciplina: string;
  codigo_do_setor: number;
  nome_do_setor: string;
  periodo: string;
  ementa: string;
  objetivos: string;
  conteudo: string;
  metodologia: string;
  avaliacao: string;
  referencias: string;
}

export type DistribuicaoDeStatus = {
  status:string;
  quantidade_de_alunos:number;
  porcentagem_de_alunos:number;
};

export type DistribuicaoPeriodo = {
  periodo: string;
  quantidade_de_alunos: number;
  porcentagem_de_alunos: number;
};

export type DistribuicaoDePeriodos = {
  quantidade_de_matriculas: number;
  quantidade_de_estudantes_analisados: number;
  erro_percentual: number;
  distribuicao: DistribuicaoPeriodo[];
};

export type DistribuicaoNota = {
  nota: number;
  quantidade_de_alunos: number;
  porcentagem_de_alunos: number;
};

export type DistribuicaoFaixa = {
  faixa: string;
  quantidade_de_alunos: number;
  porcentagem_de_alunos: number;
};

export type MetricasDisciplina = {
  media_de_notas_dos_aprovados: number;
  distribuicao_de_status: DistribuicaoDeStatus[];
  distribuicao_de_periodos: DistribuicaoDePeriodos;
  distribuicao_de_notas: DistribuicaoNota[];
  distribuicao_de_notas_faixa: DistribuicaoFaixa[];
  distribuicao_de_notas_em_faixas_de_aprovacao: DistribuicaoFaixa[];
}

export type ProfileSig = {
  id: string;
  name: string;
  identityProviderId: string;
  email: string;
  type: string;
  attributes: {
    professor?:string;
    coordenador?:string;
    aluno?:string;
    secretarioCoordenador?:string;
    cursos_centro?:string[];
    unidades_centro?:string[];
    cursos_unidade?:string[];
    unidade?:string;
  }
}

export type ProfileScao = {
  id: string;
  name: string;
  identityProviderId: string;
  attributes: {
    code:string;
    type:string;
    email:string;
  }
}

export type UserProfile = {
  id:string; //matrícula
  name:string;
  type:string;
  code?:string; //se for aluno ou coordenador, tem um curso associado;
  curriculum?:string; //só se for aluno
}