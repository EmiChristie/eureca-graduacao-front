import { Box, Card, Center, Flex, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBriefcaseBusiness, LuCalendarClock, LuCalendarOff, LuClock, LuSchool } from "react-icons/lu"
import { Curriculo, Curso } from "@/interfaces/types";
import { mapArea } from "@/util/mapeamentos";
import { formatarNome } from "@/util/utilities";
import { DisciplinaCardProps } from "./Tipo";

  export const PeriodoIdeal = (
    {
        valor
    }:DisciplinaCardProps
  ) => {

    return(
        <>
            <Card.Root w={"full"} minW={"18vw"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label color={"gray.muted"}>Período ideal</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuCalendarClock/>
                        </Icon>
                    </HStack>
                    <Flex h={"full"} alignItems={"center"}>
                      <Stat.ValueText color={EURECA_COLORS.BRANCO}>{valor && parseInt(valor) > 0 ? `${valor}º período` : "Não há período ideal associado"}</Stat.ValueText>
                    </Flex>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }