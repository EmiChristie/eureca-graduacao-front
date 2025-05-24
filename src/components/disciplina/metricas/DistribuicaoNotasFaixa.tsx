import { DistribuicaoFaixa } from "@/interfaces/types"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Card,
  Stat,
  HStack,
  Icon,
  Flex,
  Box,
  Text,
  Span
} from "@chakra-ui/react";
import { LuChartColumn } from "react-icons/lu";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell
} from "recharts";

interface DistribuicaoProps {
  metricas: DistribuicaoFaixa[];
}

export const DistribuicaoNotasFaixa = ({ metricas }: DistribuicaoProps) => {
  const periodos = metricas.map((x, index) => ({
    index: index,
    faixa: x.faixa,
    quantidade: x.quantidade_de_alunos,
    porcentagem: x.porcentagem_de_alunos,
  }));

  const chart = useChart({
    data: periodos,
    series: [{ name: "porcentagem", label: "Porcentagem", color: "orange.400" }],
  });

  return (
    <Card.Root w={"8/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
      <Card.Body>
        <Stat.Root>
          <HStack justify="space-between">
            <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
              Distribuição de notas por faixa de pontos
            </Stat.Label>
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
                    animationDuration={100}
                    cursor={{ fill: chart.color("transparent") }}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <Box p={2} bg="white" boxShadow="sm" borderRadius="md">
                          <Text fontWeight="bold">{data.faixa === "10" ? "10": `${data.faixa} a ${data.faixa}.9`}</Text>
                          <Text fontWeight="normal" mt={2}>
                            Alunos:{" "}
                            <Span fontWeight="semibold" color="black">
                              {data.quantidade}
                            </Span>
                          </Text>
                          <Text fontWeight="normal">
                            Porcentagem:{" "}
                            <Span fontWeight="semibold" color="black">
                              {data.porcentagem.toFixed(2)}%
                            </Span>
                          </Text>
                        </Box>
                      );
                    }}
                  />
                  {chart.series.map((item) => (
                    <Bar
                      barSize={50}
                      key={"porcentagem"}
                      isAnimationActive={true}
                      dataKey={chart.key("porcentagem")}
                      fill={chart.color(item.color)}
                      radius={4}
                    >
                      {chart.data.map((item) => (
                        <Cell
                          key={item.faixa}
                          fill={chart.color(
                            item.faixa === "10"
                              ? "teal.500"
                              : item.faixa[0] < "5"
                              ? "red.500"
                              : item.faixa[0] < "7"
                              ? "yellow.500"
                              : "teal.500"
                          )}
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
  );
};
