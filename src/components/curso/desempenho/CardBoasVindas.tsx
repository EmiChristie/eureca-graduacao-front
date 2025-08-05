import { ResultadoFda, User } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Text, Strong, Span } from "@chakra-ui/react";
import { LuArrowUp10, LuPencilLine } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area, Tooltip, ReferenceLine, Scatter } from "recharts";

interface DesempenhoAlunoProps {
    aluno: User;
}

export const CardBoasVindas = (
    { 
        aluno
    }: DesempenhoAlunoProps
) => {

  return (
    <Card.Root
      w={"full"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
            <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>Olá, Fulano etc etc</Text>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
