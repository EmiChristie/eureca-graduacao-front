import { MediaPeriodosParaSeFormar, PeriodoMaisComumDeEvadir } from "@/interfaces/types"
import { EURECA_COLORS } from "@/util/constants";
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
    series: [{ name: "porcentagem_de_graduados", label: "Porcentagem de Graduados", color: "orange.500" }],
  })

      function formatarNome(texto: string): string {
      return texto
        .toLowerCase()
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');
    }

    return(
        <>
            <Card.Root w={"full"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
            <Card.Body>
                <Stat.Root >
                <HStack justify="space-between">
                    <Stat.Label color={"gray.muted"}>Distribuição de quantidade de períodos para se graduar</Stat.Label>
                    <Icon color={"gray.muted"}>
                    <LuGraduationCap />
                    </Icon>
                </HStack>

                <Flex h={"full"} w={"full"} mt={4} alignItems={"center"} gap={0}>
                    <Box w={"full"}>
                        {
                            metricas.quantidade_media_periodos_para_se_formar.length == 1 ?
                            <Stat.ValueText color={EURECA_COLORS.BRANCO}>
                                Os estudantes de {formatarNome(curso)} se graduam, em média, em {metricas.quantidade_media_periodos_para_se_formar[0]} períodos.
                            </Stat.ValueText>
                            :
                            <Stat.ValueText color={EURECA_COLORS.BRANCO}>
                                Os estudantes de {formatarNome(curso)} se graduam, em média, entre {metricas.quantidade_media_periodos_para_se_formar[0]} e {metricas.quantidade_media_periodos_para_se_formar[1]} períodos.
                            </Stat.ValueText>
                        }
                    
                    <Chart.Root mt={6} maxH="300px" chart={chart}>
                    <BarChart data={chart.data}>
                        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
                        <XAxis axisLine={false} tickLine={false} dataKey={chart.key("quantidade_de_periodos")} />
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