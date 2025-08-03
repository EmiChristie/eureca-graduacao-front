import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBookText, LuSunMoon, LuUserPen, LuUserRound } from "react-icons/lu"
import { PerfilAlunoIdeal } from "../PerfilAlunoIdeal"

  export const TituloMeuDesempenho = () => {
    return(
        <>
            <Box bgColor={`#f97316/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                    <LuUserRound size={"4vh"} color={"white"}/>
                    <Text fontSize={"xl"} color={"white"}>Meu desempenho</Text>
                </Flex>
            </Box>
        </>
    )
  }