import { Box, Card, Center, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuClock, LuGraduationCap } from "react-icons/lu"
import { Curriculo, Curso } from "@/interfaces/types";
import { initCap } from "@/util/utilities";
import { CardProps } from "./DuracaoCard";

  export const FormacaoCard = (
    {
        curso,
        requisitos,
        w
    }:CardProps
  ) => {
    return(
        <>
            <Card.Root boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label color={"gray.muted"}>Tipo de formação</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuGraduationCap />
                        </Icon>
                    </HStack>
                    <Center h={"full"}>
                    <Stat.ValueText color={EURECA_COLORS.BRANCO}>{initCap(curso.modalidade_academica)}</Stat.ValueText>
                    </Center>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }