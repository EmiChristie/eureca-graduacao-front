import { DistribuicaoDePeriodos, DistribuicaoDeStatus, PeriodoMaisComumDeEvadir } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { round2 } from "@/util/utilities";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box } from "@chakra-ui/react";
import { LuCalendarOff, LuCalendarSearch, LuMedal, LuThumbsDown, LuUserRoundCheck } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList } from "recharts";

 interface DistribuicaoProps{
     metricas:DistribuicaoDeStatus[];
 }
 
 export const TaxaDeReprovacao = (
   {
     metricas
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
        return "baixa"
    }else if(taxa < 25){
        return "média"
    }else if(taxa < 35){
        return "alta"
    }else{
        return "preocupante"
    }
    }

    return(
        <>
            <Card.Root w={"6/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Taxa de reprovação</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuThumbsDown  strokeWidth={2.6}/>
                    </Icon>
                </HStack>

                <Flex h={"full"} alignItems={"center"} gap={0}>
                    <Stat.ValueText color={`${EURECA_COLORS.CINZA}/80`}>A taxa média de reprovação é de {percentual}%, a qual é considerada {mapear(percentual)}.</Stat.ValueText>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}