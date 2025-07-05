import { MediaPeriodosParaSeFormar } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Card,
  Stat,
  HStack,
  Icon,
  Flex,
  Box,
  Text,
  Span,
} from "@chakra-ui/react";
import { LuGraduationCap } from "react-icons/lu";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface PeriodosMaisComunsDeSeFormarProps {
  metricas: MediaPeriodosParaSeFormar;
  curso?: string;
}

export const PeriodosMaisComunsDeSeFormar = ({
  metricas,
  curso,
}: PeriodosMaisComunsDeSeFormarProps) => {
  const periodos = metricas.graduados_por_qtd_periodos.map((x) => ({
    quantidade_de_graduados: x.quantidade_de_graduados,
    porcentagem_de_graduados: x.porcentagem_de_graduados,
    quantidade_de_periodos: x.quantidade_de_periodos,
  }));

  const chart = useChart({
    data: periodos,
    series: [
      {
        name: "porcentagem_de_graduados",
        label: "Porcentagem de Graduados",
        color: "blue.400",
      },
    ],
  });

  return (
    <Card.Root
      w={"6/12"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
          <HStack justify="space-between">
            <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
              Distribuição de quantidade de períodos para se graduar
            </Stat.Label>
            <Icon color={`${EURECA_COLORS.CINZA}/55`}>
              <LuGraduationCap strokeWidth={2.6} />
            </Icon>
          </HStack>

          <Box my={3}>
              {metricas.quantidade_media_periodos_para_se_formar.length === 1 ? (
                <Stat.ValueText
                  fontSize={"lg"}
                  lineHeight={"short"}
                  color={`${EURECA_COLORS.CINZA}/80`}
                >
                  Os estudantes de {formatarNome(curso)} se graduam, em média, em{" "}
                  {metricas.quantidade_media_periodos_para_se_formar[0]} períodos.
                </Stat.ValueText>
              ) : (
                <Stat.ValueText
                  fontSize={"lg"}
                  lineHeight={"short"}
                  color={`${EURECA_COLORS.CINZA}/80`}
                >
                  Os estudantes de {formatarNome(curso)} se graduam, em média, entre{" "}
                  {metricas.quantidade_media_periodos_para_se_formar[0]} e{" "}
                  {metricas.quantidade_media_periodos_para_se_formar[1]} períodos.
                </Stat.ValueText>
              )}
          </Box>

          <Flex h={"full"} w={"full"} mt={4} alignItems={"center"} gap={0}>
            <Box w={"full"}>

              <Chart.Root pr={6} justifyContent={"left"} chart={chart}>
                <BarChart data={chart.data} layout="vertical" height={300}>
                  <CartesianGrid horizontal={false} />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey={chart.key("quantidade_de_periodos")}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: chart.color("transparent") }}
                    animationDuration={100}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <Box p={2} bg="white" boxShadow="sm" borderRadius="md">
                          <Text fontWeight="bold">
                            {data.quantidade_de_periodos}
                          </Text>
                          <Text fontWeight="normal" mt={2}>
                            Graduados:{" "}
                            <Span fontWeight="semibold" color="black">
                              {data.quantidade_de_graduados}
                            </Span>
                          </Text>
                          <Text fontWeight="normal">
                            Porcentagem:{" "}
                            <Span fontWeight="semibold" color="black">
                              {data.porcentagem_de_graduados.toFixed(2)}%
                            </Span>
                          </Text>
                        </Box>
                      );
                    }}
                  />
                  {chart.series.map((item) => (
                    <Bar
                      key={item.name}
                      isAnimationActive={true}
                      dataKey={chart.key(item.name)}
                      fill={chart.color(item.color)}
                      radius={[0, 4, 4, 0]}
                    />
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
