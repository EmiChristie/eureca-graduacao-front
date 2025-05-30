import { Box, Flex, Text } from "@chakra-ui/react"
import { LuChartColumnBig } from "react-icons/lu";

    interface TituloProps{
    cor?:string;
  }

  export const TituloMulheres = (
    {
      cor
    }:TituloProps
  ) => {
    return(
        <>
            <Box bgColor={cor?`${cor}/70`:`#ec4899/70`} boxShadow={"sm"} rounded={"sm"}>
                <Flex alignItems={"center"} h={"8vh"} px={4} gap={2}>
                    <LuChartColumnBig size={"4vh"} color={"white"}/>
                    <Text fontSize={"xl"} color={"white"}>Diagnóstico de inclusão e permanência feminina no curso</Text>
                </Flex>
            </Box>
        </>
    )
  }