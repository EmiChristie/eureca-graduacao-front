import { EURECA_COLORS } from "@/util/constants"
import { Box,Center,Text } from "@chakra-ui/react"

export const Header = () => {
    return (
        <>
            <Box h={"16vh"} w={"full"} bgColor={EURECA_COLORS.AZUL_CLARO}>
                <Center h={"full"}>
                    <Text color={EURECA_COLORS.BRANCO} fontSize={"5xl"} fontWeight={"lighter"}>Eureca Graduação</Text>
                </Center>
            </Box>
        </>
    )
}