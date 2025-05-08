import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants"
import { Box,Center,Flex,Separator,Text } from "@chakra-ui/react"
import { LuLightbulb } from "react-icons/lu"

export const Header = () => {
    return (
        <>
            <Box h={"8vh"} bg={`${EURECA_COLORS.AZUL_ESCURO}/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex h={"8vh"} px={4} gapX={2} alignItems={"center"}>
                    <LuLightbulb size={"4vh"} color={EURECA_COLORS.BRANCO}/>
                    <Text fontSize={"xl"} lineHeight={"shorter"} color={EURECA_COLORS.BRANCO}>Eureca Graduação</Text>
                </Flex>
            </Box>
        </>
    )
}