import { ResultadoFda, User } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
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
      minW={"25vw"}
      w={"full"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body placeItems={"center"}>
        <Stat.Root>
          <Flex h={"full"} alignItems={"center"}>
            <Stat.ValueText color={`${EURECA_COLORS.CINZA}/80`}>Olá, {formatarNome(aluno.nome)}!</Stat.ValueText>
          </Flex>
            </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
