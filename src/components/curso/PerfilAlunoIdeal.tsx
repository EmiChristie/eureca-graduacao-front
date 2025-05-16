import { Box } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { TituloAluno } from "./perfilAlunoIdeal/TituloAluno"
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
        <TituloAluno tipo={"ideal"}/>

        <Box py={16}>
            <PerfilAlunoIdealComponent requisitos={requisitos}/>
        </Box>
        
      </>
  )
  }