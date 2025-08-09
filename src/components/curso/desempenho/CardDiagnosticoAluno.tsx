import { Curriculo, Curso, DesempenhoAlunoResponse, ResultadoFda, User } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { formatarNome } from "@/util/utilities";
import { Chart, useChart } from "@chakra-ui/charts";
import { Card, Stat, HStack, Icon, Flex, Box, Text, Strong, Span } from "@chakra-ui/react";
import { LuArrowUp10, LuClipboardList, LuPencilLine } from "react-icons/lu";
import { AreaChart, XAxis, YAxis, Area, Tooltip, ReferenceLine, Scatter } from "recharts";

interface DesempenhoAlunoProps {
    metricas: DesempenhoAlunoResponse;
    aluno: User;
    requisitos: Curriculo;
    curso: Curso;
}

export const CardDiagnosticoAluno = (
    { 
        aluno,
        metricas,
        requisitos,
        curso
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
            <HStack justify="space-between">
              <Stat.Label fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>Meu diagnóstico</Stat.Label>
              <Icon fontWeight={"medium"} color={`${EURECA_COLORS.CINZA}/55`}>
                  <LuClipboardList strokeWidth={2.6} />
              </Icon>
            </HStack>
            
          <Flex h={"full"} mt={4} alignItems={"center"}>
            <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>{formatarNome(aluno.nome.split(" ")[0])}, você está cursando {formatarNome(curso.descricao)} há {aluno.periodos_completados} períodos.</Text>
          </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
