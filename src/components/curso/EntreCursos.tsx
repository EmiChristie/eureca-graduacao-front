import { Box } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"

  export const EntreCursos = (
    {
        curso
    }:CursoProps
  ) => {
    return(
        <>
            <Box px={4}>
                Mostrar métricas entre cursos
            </Box>
        </>
    )
  }