import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBookMarked, LuBookText, LuSunMoon, LuUserPen } from "react-icons/lu"
import { PerfilAlunoIdeal } from "../PerfilAlunoIdeal"

  export const TituloOutrosComponentesObrigatorios = (
  ) => {
    return(
        <>
            <Box bgColor={`#ec4899/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                    <LuBookMarked size={"4vh"} color={"white"}/>
                    <Text fontSize={"xl"} color={"white"}>Outras disciplinas e componentes obrigatórios</Text>
                </Flex>
            </Box>
        </>
    )
  }