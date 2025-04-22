import { EURECA_COLORS } from "@/util/constants"
import { Box, Center,Separator,Text } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <>
            <Separator size={"sm"} placeSelf={"center"} w={"full"}/>
            <Box h={"9vh"} w={"full"} color={EURECA_COLORS.CINZA}>
                <Center h={"full"}>
                    <Text fontSize={"xl"} fontWeight={"lighter"}>Rodapé</Text>
                </Center>
            </Box>
        </>
    )
}