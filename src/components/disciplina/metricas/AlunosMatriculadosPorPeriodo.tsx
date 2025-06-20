import { DistribuicaoDePeriodos, PeriodoMaisComumDeEvadir } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box } from "@chakra-ui/react";
import { LuCalendarOff, LuCalendarSearch, LuMedal, LuThumbsUp, LuUserRoundCheck, LuUsersRound } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList } from "recharts";

interface AlunosMatriculadosPorPeriodoProps{
    quantidade:number,
    quantidade_menos_dp:number,
    quantidade_mais_dp:number,
    desvio_padrao:number
}

export const AlunosMatriculadosPorPeriodo = (
  {
    quantidade,
    quantidade_menos_dp,
    quantidade_mais_dp,
    desvio_padrao
  }: AlunosMatriculadosPorPeriodoProps
) => {

    return(
        <>
            <Card.Root minW={"25vw"} maxW={"full"} w={"full"}  boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Média de matriculados por período</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuUsersRound strokeWidth={2.6}/>
                    </Icon>
                </HStack>

                <Flex h={"full"} alignItems={"center"} gap={0}>
                    <Flex direction={"column"}>
                        <Stat.ValueText color={`${EURECA_COLORS.CINZA}/80`}>{quantidade} alunos</Stat.ValueText>
                        <Stat.Label color={`${EURECA_COLORS.CINZA}/80`}>Com uma variação média de {desvio_padrao} matrículas</Stat.Label>
                    </Flex>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}