import { Box, Card, Center, Flex, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBriefcaseBusiness, LuClock, LuPencilLine, LuSchool } from "react-icons/lu"
import { Curriculo, Curso } from "@/interfaces/types";
import { mapArea } from "@/util/mapeamentos";
import { formatarNome } from "@/util/utilities";

export interface DisciplinaCardProps {
    valor:string;
}

  export const Tipo = (
    {
        valor
    }:DisciplinaCardProps
  ) => {

    console.log(valor)
        const mapearTipo = (tipo:string) => {
        switch(tipo){
            case "OBRIGATORIO": return "Obrigatório";
            case "OPCIONAL": return "Opcional";
            case "OPTATIVO": return "Opcional";
            case "COMPLEMENTAR": return "Complementar";
            default: return "Desconhecido";
        }
    }

    return(
        <>
            <Card.Root maxW={"full"} minW={"18vw"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label color={"gray.muted"}>Tipo do componente</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuPencilLine/>
                        </Icon>
                    </HStack>
                    <Flex h={"full"} alignItems={"center"}>
                      <Stat.ValueText color={EURECA_COLORS.BRANCO}>{mapearTipo(valor)}</Stat.ValueText>
                    </Flex>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }