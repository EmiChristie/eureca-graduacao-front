import { ResultadoFda, User } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Text, Strong, Span } from "@chakra-ui/react";
import { LuArrowUp10, LuCalendar, LuPencilLine } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area, Tooltip, ReferenceLine, Scatter } from "recharts";

interface DesempenhoAlunoProps {
    aluno: User;
}

export const CardPeriodoAtual = (
    { 
        aluno
    }: DesempenhoAlunoProps
) => {

  return (
    <Card.Root
      minW={"18vw"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
            <HStack justify="space-between">
                <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Meu período atual</Stat.Label>
                <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                <LuCalendar strokeWidth={2.6}/>
                </Icon>
            </HStack>
            <Stat.ValueText color={`${EURECA_COLORS.CINZA}/80`}>{aluno.periodos_completados+1}º período</Stat.ValueText>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
