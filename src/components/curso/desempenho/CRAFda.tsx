import { ResultadoFda } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex } from "@chakra-ui/react";
import { LuPencilLine } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area, Tooltip, ReferenceLine, Scatter } from "recharts";

interface DesempenhoAlunoProps {
  fda: ResultadoFda;
}

export const CRAFda = ({ fda }: DesempenhoAlunoProps) => {

  const chart = useChart({
    data: fda.fda,
    series: [{ name: "probabilidade_acumulada", color: "blue.solid" }],
  });

  const formatDinamico = (num: number) => {
    const str = num.toString();
    const [, decimal] = str.split(".");
    if (!decimal) return num.toString();
    if (decimal.length <= 2) return num.toString();
    return num.toFixed(2);
  };

  return (
    <Card.Root
      maxW={"full"}
      minW={"18vw"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
          <HStack justify="space-between">
            <Stat.Label color={`${EURECA_COLORS.CINZA}/55`}>Meu CRA</Stat.Label>
            <Icon color={`${EURECA_COLORS.CINZA}/55`}>
              <LuPencilLine />
            </Icon>
          </HStack>
          <Flex h={"full"} mt={8} alignItems={"center"}>
            <Chart.Root maxH="sm" chart={chart}>
              <AreaChart
                accessibilityLayer
                data={chart.data}
              >
                <XAxis
                  type="number"
                  dataKey={chart.key("valor")}
                  domain={[0, 10]}
                  ticks={[0,1,2,3,4,5,6,7,8,9,10]}
                  stroke={chart.color("border")}
                  tickFormatter={(v) => formatDinamico(v)}
                  scale="linear"
                />
                <YAxis
                type="number"
                domain={[0, 1]}
                ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
                stroke={chart.color("border")}
                tickFormatter={(v) => `${Math.round((1-v)*100)}%`}
                scale="linear"
                />
                <ReferenceLine
                  x={7}
                  stroke={chart.color("gray.500")}
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  label={{
                    value: "7",
                    position: fda.valor_do_aluno > 7 ? "insideTopRight" : "insideTopLeft",
                    fill: chart.color("gray.500"),
                    fontSize: 12,
                    style: { fontWeight: "600" },
                  }}
                />
                <ReferenceLine
                  x={fda.valor_do_aluno}
                  stroke={fda.valor_do_aluno >= 7 ? chart.color("teal.600") : chart.color("red.solid")}
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  label={{
                    value: formatDinamico(fda.valor_do_aluno),
                    position: fda.valor_do_aluno > 7 ? "insideTopLeft" : "insideTopRight",
                    fill: fda.valor_do_aluno >= 7 ? chart.color("teal.600") : chart.color("red.solid"),
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
                      <div
                        style={{
                          background: "white",
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          fontSize: "14px",
                          color: "#333",
                        }}
                      >
                        Alunos com CRA igual a{" "}
                        <strong>{craFormatado}</strong> estão no top{" "}
                        <strong>{top}%</strong> melhores CRAs ativos.
                      </div>
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
