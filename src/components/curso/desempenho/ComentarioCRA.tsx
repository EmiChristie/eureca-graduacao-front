import { ResultadoFda } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Text } from "@chakra-ui/react";
import { LuArrowUp10, LuPencilLine } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area, Tooltip, ReferenceLine, Scatter } from "recharts";

interface DesempenhoAlunoProps {
  fda: ResultadoFda;
}

export const ComentarioCRA = ({ fda }: DesempenhoAlunoProps) => {

  return (
    <Card.Root
      maxW={"full"}
      minW={"18vw"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
          <Flex h={"full"} mt={8} alignItems={"center"}>
            <Text>Comentário aqui</Text>
          </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
