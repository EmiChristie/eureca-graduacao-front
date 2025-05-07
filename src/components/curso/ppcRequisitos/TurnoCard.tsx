import { Card, Center, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuSunMoon } from "react-icons/lu"
import { CardProps } from "./DuracaoCard";

  export const TurnoCard = (
    {
        curso,
        requisitos,
        w
    }:CardProps
  ) => {
    return(
        <>
            <Card.Root minW={"12vw"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label color={"gray.muted"}>Turno</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuSunMoon/>
                        </Icon>
                    </HStack>
                    
                    <Center h={"full"}>
                    <Stat.ValueText color={EURECA_COLORS.BRANCO}>{curso.turno}</Stat.ValueText>
                    </Center>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }