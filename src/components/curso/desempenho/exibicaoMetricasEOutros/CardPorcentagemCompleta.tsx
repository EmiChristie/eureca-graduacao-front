import { Curriculo, ResultadoFda, User } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { BarSegment, Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Text, Strong, Span, Center } from "@chakra-ui/react";
import { LuArrowUp10, LuChartArea, LuChartPie, LuPencilLine } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area, Tooltip, ReferenceLine, Scatter } from "recharts";

interface DesempenhoAlunoProps {
    aluno: User;
    requisitos:Curriculo;
}

export const CardPorcentagemCompleta = (
    { 
        aluno,
        requisitos
    }: DesempenhoAlunoProps
) => {

    const creditosIntegralizados = aluno.creditos_completados;
    const creditosPendentes = (requisitos.minimo_creditos_disciplinas_obrigatorias+requisitos.minimo_creditos_disciplinas_optativas)-creditosIntegralizados;
    const totalCreditos = creditosIntegralizados + creditosPendentes;
    const percentualConcluido = Math.round((creditosIntegralizados / totalCreditos) * 100);

    const chart = useChart({
        sort: { by: "value", direction: "desc" },
        data: [
          { name: "Créditos completados", value: creditosIntegralizados, color: "teal.400" },
          { name: "Créditos pendentes", value: creditosPendentes, color: "teal.800" },
        ],
      })

  return (
    <Card.Root
      minW={"15vw"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body placeItems={"center"}>
        <Stat.Root>
          <HStack justify="space-between">
              <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Porcentagem concluída do curso</Stat.Label>
              <Icon color={`${EURECA_COLORS.CINZA}/55`}>
              <LuChartPie strokeWidth={2.6}/>
              </Icon>
          </HStack>
          <Center h={"full"} mt={2}>
          <BarSegment.Root chart={chart} minW={"20vw"}>
          <BarSegment.Content>
              <BarSegment.Bar tooltip />
          </BarSegment.Content>
          </BarSegment.Root>
          </Center>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
