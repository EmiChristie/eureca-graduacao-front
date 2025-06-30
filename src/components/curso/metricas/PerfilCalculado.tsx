import { Curriculo, DisciplinasReprovacao, MetricasCurso } from "@/interfaces/types";
import { Alert, Flex, Skeleton } from "@chakra-ui/react";
import { TituloPerfilCalculado } from "./TituloPerfilCalculado";
import { DisciplinasQueMaisReprovam } from "./DisciplinasQueMaisReprovam";
import { PeriodosMaisComunsDeEvadir } from "./PeriodosMaisComunsDeEvadir";
import { PeriodosMaisComunsDeSeFormar } from "./PeriodosMaisComunsDeSeFormar";
import { GraduadosEvadidosEAtivos } from "./GraduadosEvadidosEAtivos";
import { TaxaDeSucessoGeral } from "./TaxaDeSucessoGeral";
import { CraMedioPorPeriodo } from "./CraMedioPorPeriodo";
import { formatarNome } from "@/util/utilities";
import { VelocidadeMediaPorPeriodo } from "./VelocidadeMediaPorPeriodo";
import { TaxaDeSucessoMediaPorPeriodo } from "./TaxaDeSucessoMediaPorPeriodo";
import { EstatisticasDeMulheres } from "./mulheres/EstatisticasDeMulheres";


export interface MertricasProps {
    metricas?: MetricasCurso;
    disciplinasReprovacao?: DisciplinasReprovacao[];
    curso?:string;
    requisitos?:Curriculo;
}

export const PerfilCalculado = (
    {
        metricas,
        disciplinasReprovacao,
        curso,
        requisitos
    }:MertricasProps
  ) => {
    
    return(
        <>
            <TituloPerfilCalculado/>
            <Flex mt={4} wrap={"wrap"} gap={4} className="text">
                {
                    /*
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                
                </Flex>
                <Flex gap={4} w={"full"} placeItems={"stretch"}>
                    
                </Flex>
                    */
                }
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <TaxaDeSucessoGeral curso={curso} metricas={metricas}/>
                </Flex>
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <DisciplinasQueMaisReprovam disciplinasReprovacao={disciplinasReprovacao}/>
                    <GraduadosEvadidosEAtivos metricas={metricas.graduados_evadidos_e_ativos_por_periodo} />
                </Flex>
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <PeriodosMaisComunsDeSeFormar curso={curso} metricas={metricas.media_periodos_para_se_formar}/>
                    <PeriodosMaisComunsDeEvadir curso={formatarNome(curso)} metricas={metricas.periodos_mais_comuns_de_evadir}/>
                </Flex>
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <CraMedioPorPeriodo curso={formatarNome(curso)} metricas={metricas.taxas_medias_graduados} metricaGlobal={metricas.taxas_medias_globais.cra_medio_global}/>
                </Flex>
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <VelocidadeMediaPorPeriodo requisitos={requisitos} curso={formatarNome(curso)} metricas={metricas.taxas_medias_graduados} metricaGlobal={metricas.taxas_medias_globais.velocidade_media_global}/>
                </Flex>
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <TaxaDeSucessoMediaPorPeriodo curso={formatarNome(curso)} metricas={metricas.taxas_medias_graduados} metricaGlobal={metricas.taxas_medias_globais.taxa_de_sucesso_media_global}/>
                </Flex>
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <EstatisticasDeMulheres disciplinasReprovacao={disciplinasReprovacao} metricas={metricas} curso={formatarNome(curso)}/>
                </Flex>
                <Alert.Root alignItems={"center"} status="info" bg={"blue.muted/70"} title="This is the alert title">
                    <Alert.Indicator />
                    <Alert.Title>As métricas do Eureca Graduação procuram ser o mais atualizadas e relevantes possíveis para os nossos usuários. Nossos cálculos usam dados de alunos ingressantes entre 10 e 5 anos atrás, e podem conter uma taxa de erro de {metricas.erro_global}%, decorrente de alunos analisados que ainda estão ativos no curso.</Alert.Title>
                </Alert.Root>
            </Flex>
        </>
    )
  }