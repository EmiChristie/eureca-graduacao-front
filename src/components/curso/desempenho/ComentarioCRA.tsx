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
      w={"25vw"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
          <Flex h={"full"} flexDir={"column"}>
            <Text textAlign={"justify"} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>Atualmente, seu CRA é igual a {fda.valor_do_aluno.toFixed(2)}.</Text>
            <Text mt={2} textAlign={"justify"} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>Na curva ao lado, você verá que a probabilidade acumulada para o seu CRA é de {fda.percentil.toFixed(3)}. Isso significa que seu CRA é mais alto que {parseFloat(fda.percentil.toFixed(3))*100}% dos CRAs ativos no seu curso, e você {fda.percentil == 0 ? "tem o menor CRA ativo do seu curso." : fda.percentil == 1 ? "tem o maior CRA ativo do seu curso, parabéns!" : `está entre os ${parseFloat((1-fda.percentil).toFixed(3))*100}% maiores CRAs ativos.`}</Text>
          </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
