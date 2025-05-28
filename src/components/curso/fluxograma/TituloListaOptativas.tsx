import { Box, Flex, Text } from "@chakra-ui/react"
import { LuBookText } from "react-icons/lu"

interface TituloProps {
    cor:string;
}

  export const TituloListaOptativas = (
    {
        cor
    }:TituloProps
  ) => {
    return(
        <>
            <Box bgColor={`${cor}/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                    <LuBookText size={"4vh"} color={"white"}/>
                    <Text fontSize={"xl"} color={"white"}>Disciplinas optativas</Text>
                </Flex>
            </Box>
        </>
    )
  }