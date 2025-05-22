import { MediaPeriodosParaSeFormar, PeriodoMaisComumDeEvadir } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box,Text } from "@chakra-ui/react";
import { LuCalendarOff, LuGraduationCap, LuMedal } from "react-icons/lu";
import { PieChart, Pie, Cell,Tooltip, Legend, LabelList, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface PeriodosMaisComunsDeSeFormarProps{
    metricas:MediaPeriodosParaSeFormar;
    curso?:string;
}

export const PeriodosMaisComunsDeSeFormar = (
  {
    metricas,
    curso
  }: PeriodosMaisComunsDeSeFormarProps
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
    
    metricas.graduados_por_qtd_periodos.map(
        (x)=>periodos.push({quantidade_de_graduados: x.quantidade_de_graduados, porcentagem_de_graduados: x.porcentagem_de_graduados, quantidade_de_periodos: x.quantidade_de_periodos})
    )

  const chart = useChart({
    data: periodos,
    series: [{ name: "porcentagem_de_graduados", label: "Porcentagem de Graduados", color: "orange.400" }],
  })

    return(
        <>
            <Card.Root w={"6/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Distribuição de quantidade de períodos para se graduar</Stat.Label>
                    <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                    <LuGraduationCap strokeWidth={2.6} />
                    </Icon>
                </HStack>

                <Flex h={"full"} w={"full"} mt={4} alignItems={"center"} gap={0}>
                    <Box w={"full"}>
                        {
                            metricas.quantidade_media_periodos_para_se_formar.length == 1 ?
                            <Stat.ValueText fontSize={"xl"} lineHeight={"short"} color={`${EURECA_COLORS.CINZA}/80`}>
                                Os estudantes de {formatarNome(curso)} se graduam, em média, em {metricas.quantidade_media_periodos_para_se_formar[0]} períodos.
                            </Stat.ValueText>
                            :
                            <Stat.ValueText fontSize={"xl"} lineHeight={"short"} color={`${EURECA_COLORS.CINZA}/80`}>
                                Os estudantes de {formatarNome(curso)} se graduam, em média, entre {metricas.quantidade_media_periodos_para_se_formar[0]} e {metricas.quantidade_media_periodos_para_se_formar[1]} períodos.
                            </Stat.ValueText>
                        }
                    
                    <Chart.Root pr={8} justifyContent={"left"} mt={6} maxH="2xs" chart={chart}>
                    <BarChart data={chart.data}>
                        <CartesianGrid vertical={false} />
                        <XAxis 
                            axisLine={false} 
                            tickLine={false} 
                            dataKey={chart.key("quantidade_de_periodos")} 
                            tickFormatter={(value) =>value.includes("mais") ? value.slice(0,2)+"+" : value.includes("menos") ? "-"+value.slice(0,2) : value.slice(0,2)}
                        />
                        <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                        cursor={{ fill: chart.color("transparent") }}
                        animationDuration={100}
                        content={<Chart.Tooltip />}
                        />
                        {chart.series.map((item) => (
                        <Bar
                            barSize={50}
                            key={item.name}
                            isAnimationActive={true}
                            dataKey={chart.key(item.name)}
                            fill={chart.color(item.color)}
                            radius={4}
                        />
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