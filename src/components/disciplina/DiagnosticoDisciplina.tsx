import { Curso, Disciplina, DisciplinaCurriculo, MetricasDisciplina, PlanoDeCurso, RelacionamentosDisciplina } from "@/interfaces/types"
import { TituloPerfilDisciplina } from "./TituloPerfilDisciplina"
import { Sobre } from "./Sobre"
import { Box, Center, Flex, Icon, VStack,Text} from "@chakra-ui/react"
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
import { EURECA_COLORS } from "@/util/constants";
import { LuFrown } from "react-icons/lu";
import { AlunosMatriculadosPorPeriodo } from "./metricas/AlunosMatriculadosPorPeriodo";

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
            {
                metricas ?
                <Flex flexDir={"column"} gap={4} mt={4}>
                    <Flex gap={4} w={"full"} placeContent={"space-between"} placeItems={"stretch"}>
                        <MediaDeAprovacao media={metricas.media_de_notas_dos_aprovados}/>
                        <TaxaDeReprovacao metricas={metricas.distribuicao_de_status}/>
                        <AlunosMatriculadosPorPeriodo quantidade={0}quantidade_mais_dp={0}quantidade_menos_dp={0} desvio_padrao={0}/>
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
                :
                <>
                    <Box>
                        <Center h={"80vh"}>
                            <VStack>
                            <Icon color={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
                                <LuFrown size={36} strokeWidth={1.8} />
                            </Icon>
                            <Text fontWeight={"normal"} color={`${EURECA_COLORS.AZUL_MEDIO}/70`}>Não foi possível fazer um diagnóstico da disciplina</Text>
                            </VStack>
                        </Center>
                    </Box>
                
                </>
            }
            
        </>
    )
}