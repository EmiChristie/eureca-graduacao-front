import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { EURECA_COLORS } from "@/util/constants"
import { LuBookText, LuSunMoon } from "react-icons/lu"
import { CardProps } from "./DuracaoCard";

  export const TituloPerfilPPC = (
  ) => {
    return(
        <>
            <Box bgColor={`#c1cae1/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                    <LuBookText size={"4vh"} color={"white"}/>
                    <Text fontSize={"xl"} color={"white"}>Perfil do curso segundo o PPC</Text>
                </Flex>
            </Box>
        </>
    )
  }