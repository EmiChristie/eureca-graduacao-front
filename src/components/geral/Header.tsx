import { EURECA_COLORS } from "@/util/constants"
import { Box,Center,Separator,Text } from "@chakra-ui/react"

export const Header = () => {
    return (
        <>
            <Box h={"16vh"} w={"full"} color={EURECA_COLORS.CINZA}>
                <Center h={"full"}>
                    <Text fontSize={"5xl"} fontWeight={"lighter"}>Eureca Graduação</Text>
                </Center>
                <Separator size={"sm"} placeSelf={"center"} w={"95.5vw"}/>
            </Box>
        </>
    )
}