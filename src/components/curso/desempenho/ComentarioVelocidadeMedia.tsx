import { ResultadoFda } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Card, Stat, Flex, Text } from "@chakra-ui/react";

interface DesempenhoAlunoProps {
  fda: ResultadoFda;
}

export const ComentarioVelocidadeMedia = ({ fda }: DesempenhoAlunoProps) => {

  return (
    <Card.Root
      w={"36vw"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
          <Flex h={"full"} flexDir={"column"}>
            <Text textAlign={"justify"} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>Atualmente, você tem uma velocidade média de {fda.valor_do_aluno.toFixed(2)} créditos bem sucedidos por período.</Text>
            <Text mt={2} textAlign={"justify"} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>A probabilidade acumulada para a sua velocidade média é de {fda.percentil.toFixed(3)}. Isso significa que sua velocidade média é mais alta que {fda.percentil < 0.5 ? "apenas" : ""} {parseFloat(fda.percentil.toFixed(3))*100}% das velocidades médias dos alunos ativos de seu curso. Consequentemente, você está entre os {parseFloat((1-fda.percentil).toFixed(3))*100}% alunos ativos do seu curso com {fda.percentil < 0.5 ? "menores":"maiores"} velocidades médias.</Text>
          </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
