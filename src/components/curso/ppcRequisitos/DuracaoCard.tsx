import { Box, Card, Center, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuCalendarClock, LuClock } from "react-icons/lu"
import { Curriculo, Curso } from "@/interfaces/types";

export interface CardProps {
  curso?: Curso;
  requisitos?: Curriculo;
  requisitosScao?: Curriculo;
  w?: string;
  area?:string;
}

  export const DuracaoCard = (
    {
        curso,
        requisitos,
        w
    }:CardProps
  ) => {
    return(
        <>
            <Card.Root h={"full"} maxW={"full"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                      <Stat.Label color={"gray.muted"}>Tempo mínimo de duração</Stat.Label>
                      <Icon color={"gray.muted"}>
                        <LuCalendarClock />
                      </Icon>
                    </HStack>
                    
                    <Center h={"full"}>
                      <div>
                      <Stat.ValueText color={EURECA_COLORS.BRANCO}>{requisitos.duracao_minima/2} anos</Stat.ValueText>
                      <Stat.Label color={EURECA_COLORS.BRANCO}>{requisitos.duracao_minima} períodos, que podem ser estendidos para até {requisitos.duracao_maxima} períodos.</Stat.Label>
                      </div>
                    </Center>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }