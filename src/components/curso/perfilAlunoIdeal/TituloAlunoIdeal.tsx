import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBookText, LuSunMoon, LuUserPen } from "react-icons/lu"
import { PerfilAlunoIdeal } from "../PerfilAlunoIdeal"

  export const TituloAlunoIdeal = (
  ) => {
    return(
        <>
            <Box bgColor={`#c1cae1/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                    <LuUserPen size={"4vh"} color={"white"}/>
                    <Text fontSize={"xl"} color={"white"}>Perfil do aluno ideal</Text>
                </Flex>
            </Box>
        </>
    )
  }