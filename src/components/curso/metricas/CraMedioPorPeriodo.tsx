import { MetricasCurso, TaxaMediaGraduados, TaxasMediasGlobais } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Span, Text } from "@chakra-ui/react";
import { LuArrowUp10 } from "react-icons/lu";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, ReferenceArea } from "recharts";

interface MetricasProps {
  metricas: TaxaMediaGraduados[];
  metricaGlobal: number;
  curso: string;
}

export const CraMedioPorPeriodo = ({
  metricas,
  metricaGlobal,
  curso,
}: MetricasProps) => {
  const periodos = metricas.map((x) => ({
    quantidade_de_graduados: x.quantidade_de_graduados,
    cra: x.cra_medio,
    desvio_padrao: x.desvio_padrao_cra_medio,
    quantidade_de_periodos: x.quantidade_de_periodos,
  }));

  const chart = useChart({
    data: periodos,
    series: [
      {
        name: "cra",
        label: "CRA Médio",
        color: "blue.400",
      },
    ],
  });

  const formatPeriodo = (value: string) => {
    if (value.includes("mais")) return value.slice(0, 2) + "+";
    if (value.includes("menos")) return "-" + value.slice(0, 2);
    return value.slice(0, 2);
  };

  return (
    <Card.Root w={"5/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
      <Card.Body>
        <Stat.Root>
          <HStack justify="space-between">
            <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
              CRA médio dos graduados
            </Stat.Label>
            <Icon color={`${EURECA_COLORS.CINZA}/55`}>
              <LuArrowUp10 strokeWidth={2.6} />
            </Icon>
          </HStack>

          <Flex mt={2} h={"full"} alignItems={"center"} justify={"center"} gap={0}>
            <Box w={"full"}>
              <Stat.ValueText
                fontSize={"xl"}
                lineHeight={"short"}
                color={`${EURECA_COLORS.CINZA}/80`}
              >
                Os estudantes de {curso} se graduam, em média, com um CRA próximo a {metricaGlobal}.
              </Stat.ValueText>

              <Chart.Root pr={8} justifyContent={"left"} mt={6} maxH="2xs" chart={chart}>
                <AreaChart data={chart.data}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey={chart.key("quantidade_de_periodos")}
                    tickFormatter={formatPeriodo}
                  />
                  <YAxis axisLine={false} tickLine={false} dataKey={chart.key("cra")} />
                  <Tooltip
                    cursor={{ fill: chart.color("blue.100") }}
                    animationDuration={100}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <Box p={2} bg="white" boxShadow="sm" borderRadius="md">
                          <Text fontWeight="bold">
                            Graduados em {data.quantidade_de_periodos} períodos
                          </Text>
                          <Text fontWeight="normal" mt={2}>
                            CRA Médio:{" "}
                            <Span fontWeight="semibold" color="black">
                              {data.cra}
                            </Span>
                          </Text>
                          <Text fontWeight="normal" mt={2}>
                            Graduados analisados:{" "}
                            <Span fontWeight="semibold" color="black">
                              {data.quantidade_de_graduados}
                            </Span>
                          </Text>
                          <Text fontWeight="normal" mt={2}>
                            Desvio padrão da análise:{" "}
                            <Span fontWeight="semibold" color="black">
                              {data.desvio_padrao}
                            </Span>
                          </Text>
                        </Box>
                      );
                    }}
                  />
                  {chart.series.map((item) => (
                    <Area
                      key={item.name}
                      dataKey={chart.key(item.name)}
                      stroke={chart.color(item.color)}
                      fill={chart.color(item.color)}
                      fillOpacity={0.3}
                      strokeWidth={2}
                      activeDot={{ r: 4 }}
                    />
                  ))}
                    <ReferenceLine
                        strokeDasharray="5 5"
                        y={metricaGlobal}
                        label={{
                        value: "CRA Médio",
                        position: "insideTopRight",
                        style: { fontWeight: "600",fill: chart.color("blue.fg") },
                        }}
                        stroke={chart.color("blue.fg")}
                    />
                    <ReferenceLine
                        strokeDasharray="5 5"
                        y={7}
                        stroke={chart.color("orange.700")}
                    />
                    <ReferenceArea
                    y1={7}
                    y2={0}
                    fill={chart.color("red.solid")}
                    label={{
                        value: "CRA mínimo esperado",
                        position: "top",
                        style: { fontWeight: "600",fill: chart.color("orange.700") },
                        }}
                    fillOpacity={0.2}
                    />
                </AreaChart>
              </Chart.Root>
            </Box>
          </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
