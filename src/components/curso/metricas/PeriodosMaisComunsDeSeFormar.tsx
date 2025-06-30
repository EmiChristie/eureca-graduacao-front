import { MediaPeriodosParaSeFormar } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
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
import { PieChart, Pie, Cell, Tooltip, LabelList } from "recharts";

interface PeriodosMaisComunsDeSeFormarProps {
  metricas: MediaPeriodosParaSeFormar;
  curso?: string;
}

export const PeriodosMaisComunsDeSeFormar = ({
  metricas,
  curso,
}: PeriodosMaisComunsDeSeFormarProps) => {
  
  const cores = [
    "orange.500",
    "pink.500",
    "purple.500",
    "blue.400",
    "teal.500",
    "yellow.500",
    "red.400",
    "cyan.500",
    "green.500",
    "indigo.500",
  ];

  const dados = metricas.graduados_por_qtd_periodos.map((x, index) => ({
    name: x.quantidade_de_periodos,
    quantidade: x.quantidade_de_graduados,
    porcentagem: x.porcentagem_de_graduados,
    color: cores[index % cores.length],
  }));

  const chart = useChart({ data: dados });

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
              Períodos mais comuns para se formar
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

          <Flex h={"full"} alignItems={"center"} justify={"center"} gap={12}>
            <Chart.Root boxSize={"220px"} border={"none"} chart={chart}>
              <PieChart>
                <Tooltip
                  cursor={false}
                  animationDuration={100}
                  content={<Chart.Tooltip labelFormatter={() => "Quantidade de Alunos"} />}
                />
                <Pie
                  innerRadius={60}
                  outerRadius={100}
                  isAnimationActive={true}
                  data={chart.data}
                  dataKey={chart.key("quantidade")}
                  paddingAngle={6}
                  cornerRadius={4}
                  stroke="none"
                >
                  <LabelList
                    dataKey={"porcentagem"}
                    formatter={(v: number) => `${v.toFixed(1)}%`}
                    position="outside"
                  />
                  {chart.data.map((item) => (
                    <Cell
                      key={item.name}
                      fill={chart.color(item.color)}
                      stroke={chart.color(item.color)}
                    />
                  ))}
                </Pie>
              </PieChart>
            </Chart.Root>

            <BarSegment.Root mr={6} justifySelf={"left"} chart={chart}>
              <BarSegment.Legend
                display={"flex"}
                flexDir={"column"}
                align={"left"}
                color={`${EURECA_COLORS.CINZA}/80`}
              />
            </BarSegment.Root>
          </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
