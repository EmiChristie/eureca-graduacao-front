import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuLibraryBig, LuNotebookText, LuPresentation } from "react-icons/lu"

  export const TituloPlanoDeCursoDisciplina = () => {
    return(
        <>
            <Box bgColor={`#ec4899/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                    <LuLibraryBig size={"4vh"} color={"white"}/>
                    <Text fontSize={"xl"} color={"white"}>Plano de curso da disciplina</Text>
                </Flex>
            </Box>
        </>
    )
  }