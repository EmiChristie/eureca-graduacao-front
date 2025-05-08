import { Box } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { TituloAlunoIdeal } from "./perfilAlunoIdeal/TituloAlunoIdeal"
import { Curriculo } from "@/interfaces/types"
import { PerfilAlunoIdealComponent } from "./perfilAlunoIdeal/PerfilAlunoIdealComponent";

export interface RequisitosProps {
  requisitos: Curriculo;
}

export const PerfilAlunoIdeal = (
  {
    requisitos
  }:RequisitosProps
) => {
  return(
      <>
        <TituloAlunoIdeal/>

        <Box py={12}>
            <PerfilAlunoIdealComponent requisitos={requisitos}/>
        </Box>
        
      </>
  )
  }