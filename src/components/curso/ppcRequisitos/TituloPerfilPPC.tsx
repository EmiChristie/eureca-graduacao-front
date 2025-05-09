import { Box, Button, Card, Flex, HoverCard, IconButton, Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBookText, LuInfo, LuSunMoon } from "react-icons/lu"
import { CardProps } from "./DuracaoCard";
import { TituloFluxogramaProps } from "../fluxograma/TituloFluxograma";

  export const TituloPerfilPPC = (
    {
        curso
    }:TituloFluxogramaProps
  ) => {
    return(
        <>
            <Box bgColor={`#f97316/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} placeContent={"space-between"} h={"8vh"} px={4} gap={2}>
                    <Flex alignItems={"center"} gap={2}>
                        <LuBookText size={"4vh"} color={"white"}/>
                        <Text fontSize={"xl"} color={"white"}>Perfil do curso segundo o PPC</Text>
                    </Flex>
                    <HoverCard.Root positioning={{ placement: "bottom" }}>
                    <HoverCard.Trigger asChild>
                        <IconButton _hover={{ bg: `orange.500/70` }} size="xs" variant="ghost" aria-label="Info" rounded="full">
                            <LuInfo color="white" />
                        </IconButton>
                    </HoverCard.Trigger>
                    <HoverCard.Positioner>
                        <HoverCard.Content boxShadow={"md"} borderWidth={"1px"}>
                            <HoverCard.Arrow>
                                <HoverCard.ArrowTip />
                            </HoverCard.Arrow>

                            <Text fontWeight={"normal"}>O PPC (Plano Pedagógico de Curso) é o documento que define os pormenores de um curso de graduação. Abaixo, você encontrará, de forma geral, o que o PPC do currículo ativo mais recente define para o curso de {curso}!</Text>
                        </HoverCard.Content>
                    </HoverCard.Positioner>
                    </HoverCard.Root>
                </Flex>
            </Box>
        </>
    )
  }