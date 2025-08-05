import { DesempenhoAlunoResponse, User } from "@/interfaces/types";
import { CRAFda } from "./CRAFda";
import { TituloMeuDesempenho } from "./TituloMeuDesempenho";
import { Alert, Box, Flex, Span } from "@chakra-ui/react";
import { ComentarioCRA } from "./ComentarioCRA";
import { CardBoasVindas } from "./CardBoasVindas";

interface DesempenhoAlunoProps {
    metricas: DesempenhoAlunoResponse;
    aluno: User;
}
export const DesempenhoAluno = (
    {
        aluno,
        metricas,
    }:DesempenhoAlunoProps
) => {
    return(
        <>
            <Flex flexDir={"column"} gap={4}>
                <Flex flexDir={"column"} gap={4}>
                    <TituloMeuDesempenho/>
                    {/*<CardBoasVindas aluno={aluno} />*/}
                </Flex>
                <Flex gap={4} alignItems={"stretch"}>
                    <CRAFda fda={metricas.cra}/>
                    <ComentarioCRA fda={metricas.cra}/>
                </Flex>
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