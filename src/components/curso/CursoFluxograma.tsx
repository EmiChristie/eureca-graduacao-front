import { Box, Center, Spinner, VStack,Text } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"

  export const CursoFluxograma = (
    {
        curso
    }:CursoProps
  ) => {
    return(
        <>
            <Box px={4}>
              <Center h={"50vh"}>
                <VStack>
                  <Spinner size={"lg"} borderWidth={3}/>
                  <Text mt={2}>Carregando Fluxograma...</Text>
                </VStack>
              </Center>
            </Box>
        </>
    )
  }