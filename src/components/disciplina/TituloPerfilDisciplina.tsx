import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuNotebookText } from "react-icons/lu"

  export const TituloPerfilDisciplina = () => {
    return(
        <>
            <Box bgColor={`#f97316/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                    <LuNotebookText size={"4vh"} color={"white"}/>
                    <Text fontSize={"xl"} color={"white"}>Perfil da disciplina</Text>
                </Flex>
            </Box>
        </>
    )
  }