import { Curso, Disciplina, DisciplinaCurriculo, MetricasDisciplina, PlanoDeCurso, RelacionamentosDisciplina } from "@/interfaces/types"
import { TituloPerfilDisciplina } from "./TituloPerfilDisciplina"
import { Sobre } from "./Sobre"
import { Box, Flex} from "@chakra-ui/react"
import { PreRequisitos } from "./PreRequisitos";
import { DisciplinasEquivalentes } from "./DisciplinasEquivalentes";
import { CoRequisitos } from "./CoRequisitos";
import { Informacoes } from "./Informacoes";
import { TituloDiagnosticoDisciplina } from "./TituloDiagnosticoDisciplina";
import { DistribuicaoPeriodos } from "./metricas/DistribuicaoPeriodos";
import { MediaDeAprovacao } from "./metricas/MediaDeAprovacao";
import { DistribuicaoStatus } from "./metricas/DistribuicaoStatus";
import { DistribuicaoNotasFaixa } from "./metricas/DistribuicaoNotasFaixa";

export interface DiagnosticoDisciplinaProps {
    disciplina?:DisciplinaCurriculo,
    metricas?:MetricasDisciplina,
}

export const DiagnosticoDisciplina = (
    {
        disciplina,
        metricas
    }:DiagnosticoDisciplinaProps
  ) => {
    
    return(
        <>
            <TituloDiagnosticoDisciplina/>
            <Flex flexDir={"column"} gap={4} mt={4}>
                <Flex gap={4} w={"full"} placeContent={"space-between"} placeItems={"stretch"}>
                    <MediaDeAprovacao media={metricas.media_de_notas_dos_aprovados}/>
                </Flex>
                <Flex gap={4} w={"full"} placeContent={"space-between"} placeItems={"stretch"}>
                    {/*
                    <DistribuicaoNotas/>
                    <DistribuicaoNotasFaixaDeAprovacao/>
                    */}
                    <DistribuicaoStatus metricas={metricas.distribuicao_de_status} />
                    <DistribuicaoNotasFaixa metricas={metricas.distribuicao_de_notas_faixa}/>
                </Flex>
                <Flex gap={4} w={"full"} placeContent={"space-between"} placeItems={"stretch"}>
                    {/*
                    <DistribuicaoNotas/>
                    <DistribuicaoNotasFaixaDeAprovacao/>
                    */}
                    <DistribuicaoPeriodos metricas={metricas.distribuicao_de_periodos}/>
                </Flex>
            </Flex>
            
        </>
    )
}