import { DistribuicaoDePeriodos, PeriodoMaisComumDeEvadir } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box } from "@chakra-ui/react";
import { LuCalendarOff, LuCalendarSearch, LuCrown, LuMedal } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList, Sector, Label } from "recharts";

interface DistribuicaoPeriodosProps{
    metricas:DistribuicaoDePeriodos;
}

export const DistribuicaoPeriodos = (
  {
    metricas
  }: DistribuicaoPeriodosProps
) => {

    const periodos = [];
    const cores = [
        "orange.500",
        "pink.500",
        "purple.500",
        "blue.400",
        "teal.500",
        "yellow.500",
    ]
    
    metricas.distribuicao.map(
        (p,index)=> periodos.push({name: p.periodo, quantidade:p.quantidade_de_alunos,porcentagem:p.porcentagem_de_alunos,color:cores[index]})
    )

    const chart = useChart({
        data: periodos,
    })

    return(
        <>
            <Card.Root w={"6/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Períodos mais comuns de cursar a disciplina</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuCalendarSearch  strokeWidth={2.6}/>
                    </Icon>
                </HStack>

                <Flex h={"full"} alignItems={"center"} gap={0}>
                    <Chart.Root boxSize={"200px"} border={"none"} chart={chart} mx="auto" ml={6}>
                    <PieChart>
                        <Tooltip
                        cursor={false}
                        animationDuration={100}
                        content={<Chart.Tooltip labelFormatter={()=>"Quantidade de Alunos"} />}
                        />
                        <Pie
                        innerRadius={40}
                        outerRadius={70}
                        isAnimationActive={true}
                        data={chart.data}
                        dataKey={chart.key("quantidade")}
                        paddingAngle={8}
                        cornerRadius={4}
                        stroke="none"
                        >
                        <LabelList dataKey={"porcentagem"} formatter={(v)=>v+"%"} position="outside" />
                            {chart.data.map((item) => (
                                <Cell key={item.name} fill={chart.color(item.color)} stroke={chart.color(item.color)} />
                            ))}
                        {chart.data.map((item) => (
                            <Cell key={item.name} fill={chart.color(item.color)} />
                        ))}
                        </Pie>
                        <Chart.Legend color={EURECA_COLORS.BRANCO}/>
                    </PieChart>
                    </Chart.Root>
                        <BarSegment.Root ml={8} mr={6} justifySelf={"left"} chart={chart}>
                            <BarSegment.Legend display={"flex"} flexDir={"column"} align={"left"} color={`${EURECA_COLORS.CINZA}/80`}/>
                        </BarSegment.Root>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}