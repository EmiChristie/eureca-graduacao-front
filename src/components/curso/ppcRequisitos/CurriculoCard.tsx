import { Box, Card, Center, Flex, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuCalendarClock, LuCalendarFold, LuClock } from "react-icons/lu"
import { Curriculo, Curso } from "@/interfaces/types";

export interface CardProps {
  curso: Curso;
  requisitos: Curriculo;
  w: string;
}

  export const CurriculoCard = (
    {
        curso,
        requisitos,
        w
    }:CardProps
  ) => {
    return(
        <>
            <Card.Root h={"full"} maxW={"30vw"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                      <Stat.Label color={"gray.muted"}>Currículo atual</Stat.Label>
                      <Icon color={"gray.muted"}>
                        <LuCalendarFold />
                      </Icon>
                    </HStack>

                    <Flex alignItems={"center"} h={"full"}>
                      <Stat.ValueText color={EURECA_COLORS.BRANCO}>{requisitos.codigo_do_curriculo}</Stat.ValueText>
                    </Flex>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }