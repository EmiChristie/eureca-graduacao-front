import { ResultadoFda } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex } from "@chakra-ui/react";
import { LuPencilLine } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area,Tooltip } from "recharts";

interface DesempenhoAlunoProps {
    fda: ResultadoFda;
}
export const CRAFda = (
    {
        fda,
    }:DesempenhoAlunoProps
) => {

      const chart = useChart({
        data: fda.fda,
        series: [
        { name: "valor", color: "teal.solid" },
        ],
    })

    return(
        <>
            <Card.Root maxW={"full"} minW={"18vw"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
                <Card.Body>
                    <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label color={`${EURECA_COLORS.CINZA}/55`}>Meu CRA</Stat.Label>
                        <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                        <LuPencilLine/>
                        </Icon>
                    </HStack>
                    <Flex h={"full"} alignItems={"center"}>
                        <Chart.Root maxH="sm" chart={chart}>
                            <AreaChart
                                accessibilityLayer
                                data={chart.data}
                                margin={{ bottom: 24, left: 24 }}
                            >
                                <XAxis
                                dataKey={chart.key("probabilidade_acumulada")}
                                stroke={chart.color("border")}
                                domain={[0, 1]}
                                />
                                <YAxis stroke={chart.color("border")} domain={[0,10]} />
                                <Tooltip
                                cursor={false}
                                animationDuration={100}
                                content={<Chart.Tooltip />}
                                />
                                {chart.series.map((item) => (
                                <Area
                                    type="natural"
                                    key={item.name}
                                    isAnimationActive={false}
                                    dataKey={chart.key(item.name)}
                                    fill={chart.color(item.color)}
                                    fillOpacity={0.2}
                                    stroke={chart.color(item.color)}
                                    stackId="a"
                                />
                                ))}
                            </AreaChart>
                            </Chart.Root>
                    </Flex>
                    </Stat.Root>
                </Card.Body>
            </Card.Root>
        </>
    )
}