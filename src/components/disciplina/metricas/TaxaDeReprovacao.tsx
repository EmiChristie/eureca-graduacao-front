import { DisciplinasReprovacao, DistribuicaoDePeriodos, DistribuicaoDeStatus, PeriodoMaisComumDeEvadir } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { round2 } from "@/util/utilities";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box } from "@chakra-ui/react";
import { LuCalendarOff, LuCalendarSearch, LuMedal, LuThumbsDown, LuUserRoundCheck } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList } from "recharts";

 interface DistribuicaoProps{
     metricas:DistribuicaoDeStatus[];
     disciplinasReprovacao?:DisciplinasReprovacao[];
     codigo_disciplina:number;
 }
 
 export const TaxaDeReprovacao = (
   {
     metricas,
     disciplinasReprovacao,
     codigo_disciplina,
   }: DistribuicaoProps
 ) => {

    let total = 0;
    let reprovacoes = 0;
    metricas.forEach(
        (m)=>{
            total+=m.quantidade_de_alunos;
            if(m.status.toLowerCase().includes("reprovado")){
                reprovacoes+=m.quantidade_de_alunos;
            }
        }
    )

    console.log(total);
    console.log(reprovacoes);
    console.log(metricas);

    const percentual = total == 0 ? 0 : round2((reprovacoes/total)*100);

    const mapear = (taxa:number) => {
        if(taxa < 15){
            return "baixo"
        }else if(taxa < 25){
            return "médio"
        }else if(taxa < 35){
            return "alto"
        }else{
            return "preocupante"
        }
    }

    const classificacaoDeReprovacao = (
        codigoDisciplina: number,
        ranking: DisciplinasReprovacao[]
    ) => {
        const total = ranking.length;
        if (total === 0) return "Sem dados disponíveis para comparação com outras disciplinas";

        for (let i = 0; i < total; i++) {
            const disciplina = ranking[i];

            if (disciplina.codigo_da_disciplina === codigoDisciplina) {
            const taxa = disciplina.porcentagem_de_reprovacoes;

            if (taxa === 0) {
                return "Este componente não possui registros de reprovação nos últimos anos";
            }

            if (i === 0) {
                return "É a disciplina com maior taxa de reprovação no curso";
            } else if (i === total - 1) {
                return "É a disciplina com menor taxa de reprovação no curso";
            }

            const posicao = i + 1;
            const percentual = (posicao / total) * 100;

            if (percentual <= 50) {
                return `A disciplina está entre as ${Math.ceil(percentual)}% com maior reprovação`;
            } else {
                const percentualMenores = 100 - percentual;
                return `A disciplina está entre as ${Math.ceil(percentualMenores)}% com menor reprovação`;
            }
            }
        }

        return "Disciplina não encontrada no ranking para comparação";
    }

    return(
        <>
            <Card.Root maxW={"full"} w={"full"} minW={"23vw"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Taxa média de reprovação</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuThumbsDown  strokeWidth={2.6}/>
                    </Icon>
                </HStack>

                <Flex h={"full"} alignItems={"center"} gap={0}>
                    <Flex direction={"column"}>
                        <Stat.ValueText color={`${EURECA_COLORS.CINZA}/80`}>Cerca de {percentual}%</Stat.ValueText>
                        <Stat.Label color={`${EURECA_COLORS.CINZA}/80`}>{disciplinasReprovacao ? classificacaoDeReprovacao(codigo_disciplina,disciplinasReprovacao):""}</Stat.Label>
                    </Flex>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}