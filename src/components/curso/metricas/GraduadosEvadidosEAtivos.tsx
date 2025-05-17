import { GraduadosEvadidosEAtivosPorPeriodo } from "@/interfaces/types"
import { EURECA_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex } from "@chakra-ui/react";
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
        { name: "Graduados", color: "blue.300", stackId: "a" },
        { name: "Evadidos", color: "orange.400", stackId: "a" },
        { name: "Ativos", color: "green.400", stackId: "a" },
        ],
    })

    return(
        <>
            <Card.Root h={"full"} w={"7/12"} boxShadow={"sm"} bgColor={`#fff/70`}>
                <Card.Body>
                    <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/70`}>Distribuição de estudantes graduados, evadidos e ativos nos últimos {qtdPeriodosAnalisada} períodos</Stat.Label>
                        <Icon color={`${EURECA_COLORS.CINZA}/70`}>
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
                            content={<Chart.Tooltip />}
                            />
                            <Legend content={<Chart.Legend />} />
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