import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants"
import { Box, Center,Separator,Text } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <>
            <Box h={"9vh"} w={"full"} color={EURECA_COLORS.CINZA} bg={EURECA_GRADUACAO_COLORS.BRANCO}>
                <Separator size={"sm"} placeSelf={"center"} w={"full"}/>
                <Center h={"full"}>
                    <Text fontSize={"xl"} fontWeight={"lighter"}>Rodapé</Text>
                </Center>
            </Box>
        </>
    )
}