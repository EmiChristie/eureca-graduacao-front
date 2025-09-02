import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants"
import { Box, Center,Flex,Separator,Text } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <>
            <Box h={"8vh"} bg={`${EURECA_COLORS.AZUL_MEDIO}/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex h={"8vh"} px={4} gapX={2} alignItems={"center"}>
                    <Text fontSize={"xl"} lineHeight={"shorter"} color={EURECA_COLORS.BRANCO}>Rodapé</Text>
                </Flex>
            </Box>
        </>
    )
}