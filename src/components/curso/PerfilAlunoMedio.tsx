import { Box } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { TituloAluno } from "./perfilAlunoIdeal/TituloAluno"
import { Curriculo, PerfilAlunoMedioType } from "@/interfaces/types"
import { PerfilAlunoIdealComponent } from "./perfilAlunoIdeal/PerfilAlunoIdealComponent";
import { PerfilAlunoMedioComponent } from "./perfilAlunoMedio/PerfilAlunoMedioComponent";
import { TituloPerfisAluno } from "./perfilAlunoMedio/TituloPerfisAluno";

export interface PerfilAlunoMedioProps {
    perfil?:PerfilAlunoMedioType;
    requisitos?:Curriculo;
}

export const PerfilAlunoMedio = (
  {
    perfil,
    requisitos
  }:PerfilAlunoMedioProps
) => {
  return(
      <>
        <TituloPerfisAluno/>

        <Box py={4}>
            <PerfilAlunoMedioComponent requisitos={requisitos} perfil={perfil}/>
        </Box>
      </>
  )
  }