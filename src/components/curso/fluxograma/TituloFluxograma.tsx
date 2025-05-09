import { Box, Button, Card, Flex, HoverCard, IconButton, Span, Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBookText, LuCombine, LuInfo, LuSunMoon } from "react-icons/lu"

export interface TituloFluxogramaProps{
    curriculo?:number;
    curso?:string;
}

  export const TituloFluxograma= (
    {
        curriculo,
        curso
    }: TituloFluxogramaProps
  ) => {
    return(
        <>
            <Box bgColor={`#f97316/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} placeContent={"space-between"} h={"8vh"} px={4} gap={2}>
                    <Flex alignItems={"center"} gap={2}>
                        <LuCombine size={"4vh"} color={"white"}/>
                        <Text fontSize={"xl"} color={"white"}>Fluxograma de disciplinas obrigatórias</Text>
                    </Flex>
                    <HoverCard.Root positioning={{ placement: "bottom" }}>
                    <HoverCard.Trigger asChild>
                        <IconButton colorPalette={"orange"} size="xs" variant="ghost" aria-label="Info" rounded="full">
                            <LuInfo color="white" />
                        </IconButton>
                    </HoverCard.Trigger>
                    <HoverCard.Positioner>
                        <HoverCard.Content boxShadow={"md"} borderWidth={"1px"}>
                            <HoverCard.Arrow>
                                <HoverCard.ArrowTip />
                            </HoverCard.Arrow>

                            <Text fontWeight={"normal"}>O fluxograma é a <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/30`} py={0.5} px={1} rounded={"xs"}>sequência ideal de disciplinas</Span> para cursar a cada período. Você pode conferir o fluxo sugerido para as disciplinas de {curso} no currículo de {curriculo} abaixo!</Text>
                            <Text mt={2} fontWeight={"normal"}>Note que essa sequência ideal cobre apenas as disciplinas obrigatórias do curso. Caso queira conferir as disciplinas optativas, que também fazem parte da carga horária, veja a lista abaixo do fluxograma!</Text>
                        </HoverCard.Content>
                    </HoverCard.Positioner>
                    </HoverCard.Root>
                </Flex>
            </Box>
        </>
    )
  }