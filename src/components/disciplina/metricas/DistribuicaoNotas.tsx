import {
  DistribuicaoNota,
} from "@/interfaces/types"
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
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Line,
} from "recharts";
import { LuChartLine } from "react-icons/lu";

interface DistribuicaoProps {
  metricas: DistribuicaoNota[];
}

export const DistribuicaoNotas = ({ metricas }: DistribuicaoProps) => {
  const periodos = metricas.map((item) => ({
    nota: parseFloat(item.nota.toFixed(2)),
    quantidade: item.quantidade_de_alunos,
    porcentagem: item.porcentagem_de_alunos,
  }));

  const dadosVermelhos = periodos.map((p) =>
    p.nota < 5 ? { ...p, verde: null } : { ...p, quantidade: null }
  );
  const dadosVerdes = periodos.map((p) =>
    p.nota >= 5 ? { ...p, vermelho: null } : { ...p, quantidade: null }
  );

  const chart = useChart({
    data: periodos,
    series: [
      { name: "quantidade", label: "Quantidade de Alunos", color: "blue.400" },
    ],
  });

  return (
    <Card.Root w={"8/12"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
      <Card.Body>
        <Stat.Root>
          <HStack justify="space-between">
            <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
              Distribuição de notas
            </Stat.Label>
            <Icon color={`${EURECA_COLORS.CINZA}/55`}>
              <LuChartLine strokeWidth={2.6} />
            </Icon>
          </HStack>

          <Flex h={"full"} w={"full"} mt={4} alignItems={"center"} gap={0}>
            <Box w={"full"}>
              <Chart.Root maxH="2xs" chart={chart}>
                <LineChart data={periodos}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="nota"
                    type="number"
                    domain={[0, 10]}
                    ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                    stroke={chart.color("border")}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Nota",
                      position: "bottom",
                      style: { fill: "#52525b", fontWeight: 500 },
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    stroke={chart.color("border")}
                    label={{
                      value: "Quantidade de Alunos",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "#52525b", fontWeight: 500 },
                      dy: 80,
                    }}
                  />
                  <Tooltip
                    animationDuration={100}
                    cursor={false}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <Box p={2} bg="white" boxShadow="sm" borderRadius="md">
                          <Text fontWeight="bold">{data.nota}</Text>
                          <Text fontWeight="normal" mt={2}>
                            Alunos: <Span fontWeight="semibold" color={"black"}>{data.quantidade}</Span>
                          </Text>
                          <Text fontWeight="normal">
                            Porcentagem: <Span fontWeight="semibold" color={"black"}>{data.porcentagem.toFixed(2)}%</Span>
                          </Text>
                        </Box>
                      );
                    }}
                  />
                  <ReferenceLine
                    strokeDasharray="5 5"
                    x={5}
                    label={{
                      value: "Reprovados",
                      position: "insideTopRight",
                      style: { fontWeight: "600" },
                    }}
                    stroke={chart.color("gray.emphasized")}
                  />
                  <ReferenceLine
                    strokeDasharray="5 5"
                    x={5}
                    label={{
                      value: "Aprovados",
                      position: "insideTopLeft",
                      style: { fontWeight: "600" },
                    }}
                    stroke={chart.color("gray.500")}
                  />
                  <Line
                    type="linear"
                    dataKey={(d: any) => (d.nota < 5 ? d.quantidade : null)}
                    stroke="#E53E3E"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                    connectNulls={false}
                  />
                  <Line
                    type="linear"
                    dataKey={(d: any) => (d.nota >= 5 ? d.quantidade : null)}
                    stroke="#14b8a6"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                    connectNulls={false}
                  />
                </LineChart>
              </Chart.Root>
            </Box>
          </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
