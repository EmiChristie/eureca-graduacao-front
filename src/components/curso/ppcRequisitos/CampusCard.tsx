import { Box, Card, Center, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBriefcaseBusiness, LuClock, LuSchool } from "react-icons/lu"
import { Curriculo, Curso } from "@/interfaces/types";
import { mapArea } from "@/util/mapeamentos";
import { CardProps } from "./DuracaoCard";

  export const CampusCard = (
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
                        <Stat.Label color={"gray.muted"}>Campus</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuSchool />
                        </Icon>
                    </HStack>
                    <Center h={"full"}>
                      <Stat.ValueText color={EURECA_COLORS.BRANCO}>{curso.nome_do_campus}</Stat.ValueText>
                    </Center>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }