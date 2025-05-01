import { Curso } from "@/interfaces/types"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { LuFile, LuNotebookText } from "react-icons/lu"

export interface CursoProps{
    curso:Curso,
  }
    
  export const CursoPerfil = (
    {
        curso
    }:CursoProps
  ) => {
    return(
        <>
            <Box px={4}>
                Mostrar perfil do curso segundo o PPC
            </Box>
        </>
    )
  }