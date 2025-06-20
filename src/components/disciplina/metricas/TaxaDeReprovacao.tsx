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
        return "baixo"
    }else if(taxa < 25){
        return "médio"
    }else if(taxa < 35){
        return "alto"
    }else{
        return "preocupante"
    }
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
                        <Stat.Label color={`${EURECA_COLORS.CINZA}/80`}>Considerado um percentual de reprovação {mapear(percentual)}</Stat.Label>
                    </Flex>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}