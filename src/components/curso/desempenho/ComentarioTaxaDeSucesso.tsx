import { ResultadoFda } from "@/interfaces/types";
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants";
import { Card, Stat, Flex, Text } from "@chakra-ui/react";

interface DesempenhoAlunoProps {
  fda: ResultadoFda;
}

export const ComentarioTaxaDeSucesso = ({ fda }: DesempenhoAlunoProps) => {

  return (
    <Card.Root
      w={"36vw"}
      boxShadow={"sm"}
      bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}
    >
      <Card.Body>
        <Stat.Root>
          <Flex h={"full"} flexDir={"column"}>
            <Text textAlign={"justify"} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>Atualmente, sua taxa de sucesso acadêmico é igual a {fda.valor_do_aluno == 1? "1" : fda.valor_do_aluno.toFixed(2)}.</Text>
            {
                fda.valor_do_aluno == 1?
                    <Text mt={2} textAlign={"justify"} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>A probabilidade acumulada para a sua taxa de sucesso é de 1. Isso significa que você está no grupo com a maior taxa de sucesso possível, e sua taxa de sucesso é superior à dos demais alunos ativos.</Text>
                :
                    <Text mt={2} textAlign={"justify"} fontWeight={"normal"} color={`${EURECA_COLORS.CINZA}/80`}>A probabilidade acumulada para a sua taxa de sucesso é de {fda.percentil.toFixed(3)}. Isso significa que sua taxa de sucesso é mais alta que {fda.percentil < 0.5 ? "apenas" : ""} {parseFloat(fda.percentil.toFixed(3))*100}% das taxas de sucesso dos alunos ativos de seu curso. Consequentemente, você está entre os {parseFloat((1-fda.percentil).toFixed(3))*100}% alunos ativos do seu curso com {fda.percentil < 0.5 ? "menores":"maiores"} taxas de sucesso.</Text>
          
            }
            </Flex>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
