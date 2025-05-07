import { Card, Center, HStack, Icon, Stat } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBriefcaseBusiness} from "react-icons/lu"
import { mapArea } from "@/util/mapeamentos";
import { CardProps } from "./DuracaoCard";

  export const AtuacaoCard = (
    {
        curso,
        requisitos,
        w
    }:CardProps
  ) => {
    return(
        <>
            <Card.Root maxW={"28vw"} boxShadow={"sm"} bgColor={`${EURECA_COLORS.AZUL_MEDIO}/70`}>
              <Card.Body>
                  <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label color={"gray.muted"}>Área de atuação</Stat.Label>
                        <Icon color={"gray.muted"}>
                        <LuBriefcaseBusiness />
                        </Icon>
                    </HStack>
                    
                    <Center h={"full"}>
                    <Stat.ValueText color={EURECA_COLORS.BRANCO}>{mapArea(curso.area_de_retencao)}</Stat.ValueText>
                    </Center>
                  </Stat.Root>
              </Card.Body>
            </Card.Root>
        </>
    )
  }