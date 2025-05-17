import { PeriodoMaisComumDeEvadir } from "@/interfaces/types"
import { EURECA_COLORS } from "@/util/constants";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box } from "@chakra-ui/react";
import { LuCalendarOff, LuMedal } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList } from "recharts";

interface PeriodosMaisComunsDeEvadirProps{
    metricas:PeriodoMaisComumDeEvadir[];
}

export const PeriodosMaisComunsDeEvadir = (
  {
    metricas
  }: PeriodosMaisComunsDeEvadirProps
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
    
    metricas.map(
        (p,index)=> periodos.push({name: p.periodo, quantidade_de_evadidos:p.quantidade_de_evadidos,porcentagem_de_evadidos:p.porcentagem_de_evadidos,color:cores[index]})
    )

    const chart = useChart({
        data: periodos,
    })

    return(
        <>
            <Card.Root w={"full"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label color={"gray.muted"}>Períodos mais comuns de evadir</Stat.Label>
                    <Icon color={"gray.muted"}>
                    <LuCalendarOff />
                    </Icon>
                </HStack>

                <Flex h={"full"} alignItems={"center"} gap={0}>
                        <Chart.Root boxSize={"300px"} mx="auto" chart={chart}>
                        <PieChart>
                            <Tooltip
                            cursor={false}
                            animationDuration={100}
                            content={<Chart.Tooltip />}
                            />
                            <Pie
                            isAnimationActive={true}
                            data={chart.data}
                            dataKey={chart.key("quantidade_de_evadidos")}
                            stroke="none"
                            >
                            <LabelList dataKey={"porcentagem_de_evadidos"} formatter={(v)=>v+"%"} position="inside" fill="white" stroke="none" />
                            {chart.data.map((item) => (
                                <Cell key={item.name} fill={chart.color(item.color)} />
                            ))}
                            </Pie>
                        </PieChart>
                        </Chart.Root>
                        <BarSegment.Root justifySelf={"left"} chart={chart}>
                        <BarSegment.Legend display={"flex"} flexDir={"column"} align={"left"} color={EURECA_COLORS.BRANCO}/>
                        </BarSegment.Root>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}