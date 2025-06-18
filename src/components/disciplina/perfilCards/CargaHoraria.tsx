import { Box, Card, Center, Flex, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBriefcaseBusiness, LuClock, LuSchool } from "react-icons/lu"
import { Curriculo, Curso } from "@/interfaces/types";
import { mapArea } from "@/util/mapeamentos";
import { formatarNome } from "@/util/utilities";

export interface DisciplinaCardProps2 {
    horas:number;
    creditos:number;
}
  export const CargaHoraria = (
    {
        horas,
        creditos
    }:DisciplinaCardProps2
  ) => {

    return(
        <>
            <Card.Root maxW={"full"} minW={"18vw"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label color={"gray.muted"}>Carga horária</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuClock/>
                        </Icon>
                    </HStack>
                    <Flex h={"full"} alignItems={"center"}>
                        <Flex direction={"column"}>
                            <Stat.ValueText color={EURECA_COLORS.BRANCO}>{horas} horas</Stat.ValueText>
                            <Stat.Label color={EURECA_COLORS.BRANCO}>{creditos == 0 ? `Que não contam créditos` : `Que valem ${creditos} créditos`}</Stat.Label>
                        </Flex>
                    </Flex>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }