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

  const vMedia = aluno.velocidade_media;
  const periodoAtualDoAluno = aluno.periodos_completados+1;
  const creditosPendentes = requisitos.minimo_creditos_disciplinas_obrigatorias+requisitos.minimo_creditos_disciplinas_optativas-aluno.creditos_completados;
  const previsao = vMedia == 0 ? 0 : Math.ceil(creditosPendentes/vMedia);
  const periodoPrevisao = periodoAtualDoAluno+previsao-1;
  const dentroOuForaDoLimite = periodoPrevisao < requisitos.duracao_minima ? -1 : periodoPrevisao <= requisitos.duracao_maxima ? 0 : 1
  //-1 = previsão de se formar antes da faixa normal: x < duracao_minima
  //0 = dentro da faixa normal: duracao_minima <= x <= duracao_maxima
  //1 = acima da faixa normal: x > duracao_maxima

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
            {/*<Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>{formatarNome(aluno.nome.split(" ")[0])}, você está cursando {formatarNome(curso.descricao)} há {aluno.periodos_completados} períodos.</Text>
            <Text fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>
            Você está no {periodoAtualDoAluno}º período.
            Sua velocidade média é de {vMedia}.
            Você ainda precisa de {creditosPendentes} créditos para se formar.
            Considerando sua velocidade média, sua taxa de sucesso e os créditos pendentes, você consegue se formar em {previsao} períodos. 
            (1 = período atual. 
            0 = sua velocidade média é 0, você ainda não foi aprovado em nenhuma disciplina. Fazer um texto especial)
            Isso significa que você provavelmente vai se formar no seu {periodoPrevisao}º período.
            </Text>*/}
          </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
