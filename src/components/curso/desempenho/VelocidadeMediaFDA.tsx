import { ResultadoFda } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Text, Strong, Span } from "@chakra-ui/react";
import { LuArrowUp10, LuPencilLine, LuTimer } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area, Tooltip, ReferenceLine, Scatter } from "recharts";

interface DesempenhoAlunoProps {
  fda: ResultadoFda;
  vIdeal: number;
}

export const VelocidadeMediaFda = ({ fda, vIdeal }: DesempenhoAlunoProps) => {

  const chart = useChart({
    data: fda.fda,
    series: [{ name: "probabilidade_acumulada", color: "blue.solid" }],
  });

  const formatDinamico = (num: number) => {
    const str = num.toString();
    const [, decimal] = str.split(".");
    if (!decimal) return num.toString();
    if (decimal.length <= 3) return num.toString();
    return num.toFixed(3);
  };

  const maxValor = Math.max(...fda.fda.map((d) => d.valor));
  const maxArredondado = Math.floor(maxValor / 5) * 5;
  const xTicks = Array.from({ length: Math.floor(maxArredondado / 5) + 1 }, (_, i) => i * 5);

  return (
    <Card.Root
      w={"full"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
          <HStack justify="space-between">
            <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Minha velocidade média</Stat.Label>
            <Icon fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
                <LuTimer strokeWidth={2.6} />
            </Icon>
          </HStack>
          <Flex h={"full"} mt={8} alignItems={"center"}>
            <Chart.Root maxH="2xs" chart={chart}>
              <AreaChart
                accessibilityLayer
                data={chart.data}
              >
                <XAxis
                  type="number"
                  dataKey={chart.key("valor")}
                  stroke={chart.color("border")}
                  tickFormatter={(v) => formatDinamico(v)}
                  ticks={xTicks}
                  scale="linear"
                  label={{
                    value: "Velocidade Média",
                    position: "bottom",
                    style: { fill: `#696d72`, fontWeight: 500 },
                  }}
                />
                <YAxis
                type="number"
                domain={[0, 1]}
                ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
                stroke={chart.color("border")}
                scale="linear"
                label={{
                    value: "Probabilidade Acumulada",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: `#696d72`, fontWeight: 500 },
                    dy: 70,
                }}
                />
                <ReferenceLine
                  x={vIdeal}
                  stroke={chart.color("gray.500")}
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  label={{
                    value: vIdeal,
                    position: fda.valor_do_aluno > vIdeal ? "insideTopRight" : "insideTopLeft",
                    fill: chart.color("gray.500"),
                    fontSize: 12,
                    style: { fontWeight: "600" },
                  }}
                />
                <ReferenceLine
                  x={fda.valor_do_aluno}
                  stroke={fda.valor_do_aluno >= vIdeal ? chart.color("teal.600") : chart.color("red.solid")}
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  label={{
                    value: formatDinamico(fda.valor_do_aluno),
                    position: fda.valor_do_aluno > vIdeal ? "insideTopLeft" : "insideTopRight",
                    fill: fda.valor_do_aluno >= vIdeal ? chart.color("teal.600") : chart.color("red.solid"),
                    fontWeight: "bold",
                    style: { fontWeight: "600" },
                  }}
                />
                <Tooltip
                  cursor={false}
                  animationDuration={100}
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0) return null;

                    const item = payload[0].payload;
                    const craFormatado = formatDinamico(item.valor);
                    const top = ((1 - item.probabilidade_acumulada) * 100).toFixed(1);

                    return (
                      <Box border={"1px solid #ccc"} bg={"white"} p={2} rounded={"md"} >
                        <Text fontWeight={"bold"}>{item.probabilidade_acumulada.toFixed(3)}</Text>
                        <Text fontWeight={"medium"} color={"gray.800"} mt={2}>
                          Alunos com velocidade média {item.probabilidade_acumulada == 1 ? "maior ou " : ""} igual a{" "}
                          <Span fontWeight={"bold"} color={"black"}>{craFormatado}</Span> estão entre as {" "}
                          <Span fontWeight={"bold"} color={"black"}>{top}%</Span> velocidades médias mais {item.probabilidade_acumulada < 0.5 ? "baixas":"altas"} entre os alunos ativos.
                        </Text>
                      </Box>
                    );
                  }}
                />
                {chart.series.map((item) => (
                  <Area
                    type="monotone"
                    connectNulls={true}
                    key={item.name}
                    isAnimationActive={true}
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
  );
};
