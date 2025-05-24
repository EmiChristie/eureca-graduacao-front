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
import { DistribuicaoNotasFaixaDeAprovacao } from "./metricas/DistribuicaoNotasFaixaDeAprovacao";
import { DistribuicaoNotas } from "./metricas/DistribuicaoNotas";
import { TaxaDeReprovacao } from "./metricas/TaxaDeReprovacao";

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
                    <TaxaDeReprovacao metricas={metricas.distribuicao_de_status}/>
                </Flex>
                <Flex gap={4} w={"full"} placeContent={"space-between"} placeItems={"stretch"}>
                    <DistribuicaoStatus metricas={metricas.distribuicao_de_status} />
                    <DistribuicaoNotas metricas={metricas.distribuicao_de_notas}/>
                </Flex>
                <Flex gap={4} w={"full"} placeContent={"space-between"} placeItems={"stretch"}>
                    <DistribuicaoNotasFaixa metricas={metricas.distribuicao_de_notas_faixa}/>
                    <DistribuicaoPeriodos metricas={metricas.distribuicao_de_periodos}/>
                </Flex>
            </Flex>
            
        </>
    )
}