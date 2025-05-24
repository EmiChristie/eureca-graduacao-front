import { DistribuicaoFaixa, MediaPeriodosParaSeFormar, PeriodoMaisComumDeEvadir } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box,Text } from "@chakra-ui/react";
import { LuCalendarOff, LuChartColumn, LuGraduationCap, LuMedal } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface DistribuicaoProps{
    metricas:DistribuicaoFaixa[];
}

export const DistribuicaoNotasFaixaDeAprovacao = (
  {
    metricas,
  }: DistribuicaoProps
) => {

    const periodos = [];
    
    metricas.map(
        (x,index)=>periodos.push({index:index,faixa:x.faixa,quantidade:x.quantidade_de_alunos,porcentagem:x.porcentagem_de_alunos})
    )

  const chart = useChart({
    data: periodos,
    series: [{ name: "porcentagem", label: "Porcentagem", color: "orange.400" }],
  })

    return(
        <>
            <Card.Root w={"8/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Distribuição de notas por faixa de aprovação</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuChartColumn strokeWidth={2.6} />
                    </Icon>
                </HStack>

                <Flex h={"full"} w={"full"} mt={4} alignItems={"center"} gap={0}>
                    <Box w={"full"}>
                    <Chart.Root pr={8} justifyContent={"left"} mt={6} maxH="2xs" chart={chart}>
                    <BarChart data={chart.data}>
                        <CartesianGrid vertical={false} />
                        <XAxis 
                            axisLine={false} 
                            tickLine={false} 
                            dataKey={chart.key("faixa")} 
                         />
                        <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                        cursor={{ fill: chart.color("transparent") }}
                        animationDuration={100}
                        content={<Chart.Tooltip labelFormatter={(value)=> value[0] == "0" ? "Reprovados" : value[0] == "5" ? "Aprovados abaixo da média" : "Aprovados"}  />}
                        />
                        {chart.series.map((item) => (
                        <Bar
                            key={"porcentagem"}
                            isAnimationActive={true}
                            dataKey={chart.key("porcentagem")}
                            fill={chart.color(item.color)}
                            radius={4}
                        >
                        {chart.data.map((item) => (
                            <Cell
                                key={item.name}
                                fill={chart.color(item.faixa[0] == "0" ? "red.500" : item.faixa[0] == "5" ? "yellow.500" : "teal.500")}
                            />
                            ))}
                        </Bar>
                        ))}
                    </BarChart>
                    </Chart.Root>

                    </Box>
                </Flex>
                </Stat.Root>
            </Card.Body>
            </Card.Root>
        </>
    )
}