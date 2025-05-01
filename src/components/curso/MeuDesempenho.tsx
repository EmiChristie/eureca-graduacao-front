import { Box } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"

  export const MeuDesempenho = (
    {
        curso
    }:CursoProps
  ) => {
    return(
        <>
            <Box px={4}>
                Mostrar métricas do desempenho do usuário
            </Box>
        </>
    )
  }