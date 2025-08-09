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
      w={"full"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
            <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>Olá, {formatarNome(aluno.nome)}! Este é o seu dashboard pessoal de desempenho acadêmico. Aqui, você encontra informações sobre seu desempenho em três dimensões diferentes, e um diagnóstico personalizado para te auxiliar no planejamento do seu trajeto na graduação. Explore os gráficos abaixo para conhecer a fundo como você está se saindo em relação aos outros alunos e às expectativas do curso!</Text>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
