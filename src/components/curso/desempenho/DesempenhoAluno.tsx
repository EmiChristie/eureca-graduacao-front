import { Curriculo, Curso, DesempenhoAlunoResponse, User } from "@/interfaces/types";
import { CRAFda } from "./CRAFda";
import { TituloMeuDesempenho } from "./TituloMeuDesempenho";
import { Alert, Box, Flex, Span } from "@chakra-ui/react";
import { ComentarioCRA } from "./ComentarioCRA";
import { CardBoasVindas } from "./CardBoasVindas";
import { ComentarioTaxaDeSucesso } from "./ComentarioTaxaDeSucesso";
import { TaxaDeSucessoFda } from "./TaxaDeSucessoFDA";
import { ComentarioVelocidadeMedia } from "./ComentarioVelocidadeMedia";
import { VelocidadeMediaFda } from "./VelocidadeMediaFDA";
import { CardDiagnosticoAluno } from "./CardDiagnosticoAluno";

interface DesempenhoAlunoProps {
    metricas: DesempenhoAlunoResponse;
    aluno: User;
    requisitos: Curriculo;
    curso: Curso;
}
export const DesempenhoAluno = (
    {
        aluno,
        metricas,
        requisitos,
        curso,
    }:DesempenhoAlunoProps
) => {

    const creditosMatriculadosIdeal = (requisitos.minimo_creditos_disciplinas_obrigatorias+requisitos.minimo_creditos_disciplinas_optativas)
    const vIdeal = parseFloat((creditosMatriculadosIdeal / requisitos.duracao_minima).toFixed(2));
    return(
        <>
            <Flex flexDir={"column"} gap={4}>
                <Flex flexDir={"column"} gap={4}>
                    <TituloMeuDesempenho/>
                    <CardBoasVindas aluno={aluno} />
                </Flex>
                <Flex gap={4} alignItems={"stretch"}>
                    <CRAFda fda={metricas.cra}/>
                    <ComentarioCRA fda={metricas.cra}/>
                </Flex>
                <Flex gap={4} alignItems={"stretch"}>
                    <ComentarioTaxaDeSucesso fda={metricas.taxa_de_sucesso}/>
                    <TaxaDeSucessoFda fda={metricas.taxa_de_sucesso}/>
                </Flex>
                <Flex gap={4} alignItems={"stretch"}>
                    <VelocidadeMediaFda vIdeal={vIdeal} fda={metricas.velocidade_media}/>
                    <ComentarioVelocidadeMedia fda={metricas.velocidade_media}/>
                </Flex>
                {<Flex gap={4} alignItems={"stretch"}>
                    <CardDiagnosticoAluno curso={curso} aluno={aluno} metricas={metricas} requisitos={requisitos}/>
                </Flex>}
                <Flex flexDir={"column"} gap={4}>
                    <Alert.Root status="info" bg={"blue.muted/70"} variant={"surface"} boxShadow={"sm"} title="Diagnóstico indisponível">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title>O que esses gráficos significam?</Alert.Title>
                            <Alert.Description mt={1}>Os gráficos acima mostram a Função de Distribuição Acumulada (FDA) dos CRAs, Taxas de Sucesso e Velocidades Médias dos alunos ativos do seu curso. A FDA indica, para cada valor de X, a proporção de alunos que possuem um valor menor ou igual a X.</Alert.Description>
                            <Alert.Description>Em outras palavras, A FDA relativa ao CRA, por exemplo responde à pergunta: <Span fontWeight={"semibold"}>"Quantos alunos têm CRA igual ou menor que o meu?"</Span>. Se sua Probabilidade Acumulada é Y, então Y% dos alunos tem CRA igual ou inferior ao seu, e você está entre os ((1 - Y) * 100)% melhores CRAs ativos! As FDAs de Taxa de Sucesso e Velocidade Média seguem esse mesmo princípio.</Alert.Description>
                        </Alert.Content>
                    </Alert.Root>
                </Flex>
            </Flex>
            {/*
                <Flex mt={4} gap={4} alignItems={"stretch"}>
                    <ComentarioCRA fda={metricas.cra}/>
                    <CRAFda fda={metricas.cra}/>
                </Flex>
                <Flex mt={4} gap={4} alignItems={"stretch"}>
                    <CRAFda fda={metricas.cra}/>
                    <ComentarioCRA fda={metricas.cra}/>
                </Flex>
            */}
        </>
    )
}