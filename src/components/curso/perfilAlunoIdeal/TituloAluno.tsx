import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBookText, LuSunMoon, LuUserPen } from "react-icons/lu"
import { PerfilAlunoIdeal } from "../PerfilAlunoIdeal"

  export interface TituloProps{
    tipo:string;
  }

  export const TituloAluno = (
    {
      tipo
    }:TituloProps
  ) => {
    return(
        <>
            <Box bgColor={`#ec4899/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                    <LuUserPen size={"4vh"} color={"white"}/>
                    <Text fontSize={"xl"} color={"white"}>Perfil do aluno {tipo}</Text>
                </Flex>
            </Box>
        </>
    )
  }