import { ResultadoFda, User } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Text, Strong, Span } from "@chakra-ui/react";
import { LuArrowDown10, LuArrowUp10, LuMedal, LuOrbit, LuPencilLine, LuTimer } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area, Tooltip, ReferenceLine, Scatter } from "recharts";

interface DesempenhoAlunoProps {
    valor: number;
}

export const CardVM = (
    { 
        valor
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
                  <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Minha velocidade média</Stat.Label>
                  <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                  <LuTimer strokeWidth={2.6}/>
                  </Icon>
              </HStack>
              <Stat.ValueText color={`${EURECA_COLORS.CINZA}/80`}>Cerca de {parseFloat(valor.toFixed(2))} créditos bem-sucedidos por período</Stat.ValueText>
          </Stat.Root>
        </Card.Body>
      </Card.Root>
  );
};
