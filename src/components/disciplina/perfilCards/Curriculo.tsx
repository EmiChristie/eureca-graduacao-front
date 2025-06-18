import { Card, Flex, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuCalendarFold, LuSchool } from "react-icons/lu"
import { DisciplinaCardProps } from "./Tipo";

  export const Curriculo = (
    {
        valor
    }:DisciplinaCardProps
  ) => {

    return(
        <>
            <Card.Root maxW={"full"} minW={"18vw"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label color={"gray.muted"}>Currículo exibido</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuCalendarFold/>
                        </Icon>
                    </HStack>
                    <Flex h={"full"} alignItems={"center"}>
                      <Stat.ValueText color={EURECA_COLORS.BRANCO}>{valor}</Stat.ValueText>
                    </Flex>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }