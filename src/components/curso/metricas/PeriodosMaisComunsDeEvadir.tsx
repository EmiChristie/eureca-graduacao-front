import { PeriodoMaisComumDeEvadir } from "@/interfaces/types";
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
import { LuCalendarOff } from "react-icons/lu";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface PeriodosMaisComunsDeEvadirProps {
  metricas: PeriodoMaisComumDeEvadir[];
  curso?: string;
}

export const PeriodosMaisComunsDeEvadir = ({
  metricas,
  curso,
}: PeriodosMaisComunsDeEvadirProps) => {
  const periodos = metricas.map((p) => ({
    periodo: p.periodo,
    quantidade: p.quantidade_de_evadidos,
    porcentagem: p.porcentagem_de_evadidos,
  }));

  const periodoMaisPropenso = metricas
  .filter((m) => !m.periodo.toLowerCase().includes("acima"))
  .reduce((prev, current) =>
    current.porcentagem_de_evadidos > prev.porcentagem_de_evadidos ? current : prev,
  );

  const chart = useChart({
    data: periodos,
    series: [
      {
        name: "porcentagem",
        label: "Porcentagem de Evadidos",
        color: "orange.500",
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
              Períodos mais comuns de evadir
            </Stat.Label>
            <Icon color={`${EURECA_COLORS.CINZA}/55`}>
              <LuCalendarOff strokeWidth={2.6} />
            </Icon>
          </HStack>

          <Box my={3}>
            <Stat.ValueText
              fontSize={"lg"}
              lineHeight={"short"}
              color={`${EURECA_COLORS.CINZA}/80`}
            >
              O {periodoMaisPropenso.periodo} é o mais propenso a fazer um estudante
              {curso ? ` de ${curso}` : ""} evadir.
            </Stat.ValueText>
          </Box>

          <Flex h={"full"} w={"full"} mt={4} alignItems={"center"}>
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
                    dataKey={chart.key("periodo")}
                    axisLine={false}
                    tickLine={false}
                    width={100}
                  />
                  <Tooltip
                    cursor={{ fill: chart.color("transparent") }}
                    animationDuration={100}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <Box p={2} bg="white" boxShadow="sm" borderRadius="md">
                          <Text fontWeight="bold">{data.periodo}</Text>
                          <Text fontWeight="normal" mt={2}>
                            Evadidos:{" "}
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
