import { GraduadosEvadidosEAtivosPorPeriodo } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box,Text,Span, ColorSwatch } from "@chakra-ui/react";
import { LuCalendarFold, LuUsers, LuUsersRound } from "react-icons/lu";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

interface GraduadosEvadidosEAtivosProps{
    metricas:GraduadosEvadidosEAtivosPorPeriodo[];
}

export const GraduadosEvadidosEAtivos = (
  {
    metricas,
  }: GraduadosEvadidosEAtivosProps
) => {

    const qtdPeriodosAnalisada = metricas.length;

    const dist = [];

    metricas.map(
        (p)=>dist.push({ Graduados: p.graduados, Evadidos: p.evadidos, Ativos: p.ativos, periodo: p.periodo })
    )
    
    const chart = useChart({
        data: dist,
        series: [
        { name: "Graduados", color: `blue.400`, stackId: "a" },
        { name: "Evadidos", color: "orange.400", stackId: "a" },
        { name: "Ativos", color: "green.400", stackId: "a" },
        ],
    })

    return(
        <>
            <Card.Root h={"full"} w={"7/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
                <Card.Body>
                    <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Distribuição de estudantes graduados, evadidos e ativos nos últimos {qtdPeriodosAnalisada} períodos, por período de ingresso</Stat.Label>
                        <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                        <LuUsersRound strokeWidth={2.6}/>
                        </Icon>
                    </HStack>

                    <Flex mt={8} alignItems={"center"} h={"full"}>
                        <Chart.Root pr={8} maxH="xs" w={"full"} chart={chart}>
                        <BarChart stackOffset="expand" data={chart.data}>
                            <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
                            <XAxis
                            axisLine={false}
                            tickLine={false}
                            dataKey={chart.key("periodo")}
                            tickFormatter={(value) => value.slice(2, 6)}
                            />
                            <YAxis
                            stroke={chart.color("border.emphasized")}
                            tickFormatter={chart.formatNumber({ style: "percent" })}
                            />
                            <Tooltip
                            cursor={{ fill: chart.color("transparent") }}
                            animationDuration={100}
                            content={({ payload }) => {
                                if (!payload || !payload.length) return null;

                                const data = payload[0].payload;
                                const total = data.Graduados + data.Evadidos + data.Ativos;

                                const formatPercent = (value: number) =>
                                `${((value / total) * 100).toFixed(1)}%`;

                                return (
                                <Box p={2} bg="white" boxShadow="sm" borderRadius="md">
                                    <Text fontWeight="bold">
                                    Ingressantes em {data.periodo}
                                    </Text>

                                    <Text fontWeight="normal" mt={2}>
                                    <ColorSwatch value={`#60a5fa`} boxSize="0.82em" mr={1} />
                                    Graduados:{" "}
                                    <Span fontWeight="semibold" color="black">
                                        {data.Graduados} ({formatPercent(data.Graduados)})
                                    </Span>
                                    </Text>

                                    <Text fontWeight="normal" mt={2}>
                                    <ColorSwatch value={`#fb923c`} boxSize="0.82em" mr={1} />
                                    Evadidos:{" "}
                                    <Span fontWeight="semibold" color="black">
                                        {data.Evadidos} ({formatPercent(data.Evadidos)})
                                    </Span>
                                    </Text>

                                    <Text fontWeight="normal" mt={2}>
                                    <ColorSwatch value={`#4ade80`} boxSize="0.82em" mr={1} />
                                    Ativos:{" "}
                                    <Span fontWeight="semibold" color="black">
                                        {data.Ativos} ({formatPercent(data.Ativos)})
                                    </Span>
                                    </Text>
                                </Box>
                                );
                            }}
                            />
                            <Legend content={<Chart.Legend interaction="hover" />} />
                            {chart.series.map((item) => (
                            <Bar
                                isAnimationActive={true}
                                key={item.name}
                                dataKey={chart.key(item.name)}
                                fill={chart.color(item.color)}
                                stroke={chart.color(item.color)}
                                stackId={item.stackId}
                            />
                            ))}
                        </BarChart>
                        </Chart.Root>
                    </Flex>
                    </Stat.Root>
                </Card.Body>
            </Card.Root>
        </>
    )
}