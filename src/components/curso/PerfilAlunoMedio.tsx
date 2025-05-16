import { Box } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { TituloAluno } from "./perfilAlunoIdeal/TituloAluno"
import { Curriculo, PerfilAlunoMedioType } from "@/interfaces/types"
import { PerfilAlunoIdealComponent } from "./perfilAlunoIdeal/PerfilAlunoIdealComponent";
import { PerfilAlunoMedioComponent } from "./perfilAlunoMedio/PerfilAlunoMedioComponent";

export interface PerfilAlunoMedioProps {
    perfil:PerfilAlunoMedioType;
}

export const PerfilAlunoMedio = (
  {
    perfil,
  }:PerfilAlunoMedioProps
) => {
  return(
      <>
        <TituloAluno tipo={"médio"} />

        <Box py={16}>
            <PerfilAlunoMedioComponent perfil={perfil}/>
        </Box>
        
      </>
  )
  }