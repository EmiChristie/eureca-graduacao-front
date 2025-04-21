import { EURECA_COLORS } from "@/util/constants"
import { Box, Center,Text } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <>
            <Box h={"10vh"} w={"full"} bgColor={EURECA_COLORS.AZUL_CLARO}>
                <Center h={"full"}>
                    <Text color={EURECA_COLORS.BRANCO} fontSize={"xl"} fontWeight={"lighter"}>Rodapé</Text>
                </Center>
            </Box>
        </>
    )
}