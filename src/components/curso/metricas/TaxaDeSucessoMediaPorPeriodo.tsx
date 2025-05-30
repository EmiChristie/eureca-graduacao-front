import { MetricasCurso, TaxaMediaGraduados, TaxasMediasGlobais } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Span, Text } from "@chakra-ui/react";
import { LuCopyCheck } from "react-icons/lu";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

interface MetricasProps {
  metricas: TaxaMediaGraduados[];
  metricaGlobal: number;
  curso: string;
}

export const TaxaDeSucessoMediaPorPeriodo = ({
  metricas,
  metricaGlobal,
  curso,
}: MetricasProps) => {
  const periodos = metricas.map((x) => ({
    quantidade_de_graduados: x.quantidade_de_graduados,
    cra: x.taxa_de_sucesso_media,
    desvio_padrao: x.desvio_padrao_taxa_de_sucesso_media,
    quantidade_de_periodos: x.quantidade_de_periodos,
  }));

  const chart = useChart({
    data: periodos,
    series: [
      {
        name: "cra",
        label: "Taxa de Sucesso Média",
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
          <HStack justify="space-between" alignItems={"start"}>
            <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
              Taxa de sucesso média dos graduados
            </Stat.Label>
            <Icon color={`${EURECA_COLORS.CINZA}/55`}>
              <LuCopyCheck strokeWidth={2.6} />
            </Icon>
          </HStack>

          <Flex mt={2} h={"full"} alignItems={"center"} justify={"center"} gap={0}>
            <Box w={"full"}>
              <Stat.ValueText
                fontSize={"lg"}
                lineHeight={"short"}
                color={`${EURECA_COLORS.CINZA}/80`}
              >
                A taxa de sucesso dos graduados costuma ser próxima de {metricaGlobal} (
                {metricaGlobal * 100}%)
              </Stat.ValueText>

              <Chart.Root
                pr={8}
                alignSelf={"end"}
                justifyContent={"left"}
                mt={6}
                maxH="2xs"
                chart={chart}
              >
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
                            Taxa de sucesso média:{" "}
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
                      fillOpacity={0.25}
                      strokeWidth={2}
                      activeDot={{ r: 4 }}
                    />
                  ))}
                    <ReferenceLine
                        strokeDasharray="5 5"
                        y={metricaGlobal}
                        label={{
                        value: "Taxa de sucesso Média",
                        position: "insideTopRight",
                        style: { fontWeight: "600",fill: chart.color("blue.fg") },
                        }}
                        stroke={chart.color("blue.fg")}
                    />
                    <ReferenceLine
                        strokeDasharray="5 5"
                        y={1}
                        label={{
                        value: "Taxa de sucesso Esperada",
                        position: "top",
                        style: { fontWeight: "600",fill: chart.color("orange.700") },
                        }}
                        stroke={chart.color("orange.700")}
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
