import { DisciplinasReprovacao, MetricasCurso } from "@/interfaces/types";
import { Flex, Skeleton } from "@chakra-ui/react";
import { TituloPerfilCalculado } from "./TituloPerfilCalculado";
import { DisciplinasQueMaisReprovam } from "./DisciplinasQueMaisReprovam";
import { PeriodosMaisComunsDeEvadir } from "./PeriodosMaisComunsDeEvadir";
import { PeriodosMaisComunsDeSeFormar } from "./PeriodosMaisComunsDeSeFormar";
import { GraduadosEvadidosEAtivos } from "./GraduadosEvadidosEAtivos";


export interface MertricasProps {
    metricas?: MetricasCurso;
    disciplinasReprovacao?: DisciplinasReprovacao[];
    curso?:string;
}

export const PerfilCalculado = (
    {
        metricas,
        disciplinasReprovacao,
        curso
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
                    <DisciplinasQueMaisReprovam disciplinasReprovacao={disciplinasReprovacao}/>
                    <GraduadosEvadidosEAtivos metricas={metricas.graduados_evadidos_e_ativos_por_periodo} />
                </Flex>
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <PeriodosMaisComunsDeSeFormar curso={curso} metricas={metricas.media_periodos_para_se_formar}/>
                    <PeriodosMaisComunsDeEvadir metricas={metricas.periodos_mais_comuns_de_evadir}/>
                </Flex>
            </Flex>
        </>
    )
  }