import { Curriculo, Curso } from "@/interfaces/types"
import { EURECA_COLORS } from "@/util/constants"
import { Box, } from "@chakra-ui/react"
import { PerfilPPC } from "./PerfilPPC"
import { PerfilAlunoIdeal } from "./PerfilAlunoIdeal"

export interface CursoProps{
    curso?:Curso,
    curriculo?:number,
    requisitos?:Curriculo,
  }
    
  export const CursoPerfil = (
    {
        curso,
        requisitos
    }:CursoProps
  ) => {
    
    const corPeriodo = (turno:string) => {
      switch(turno){
        case "Integral" : return "#f06553";
        case "Matutino" : return "#fcd664";
        case "Vespertino" : return "#ff9c2b";
        case "Noturno" : return "#828bdc";
        default: return "#b4b7d0";
      }
    }

    return(
        <>
            {
                <Box color={EURECA_COLORS.CINZA}>

                      <Box>
                        <PerfilPPC curso={curso} requisitos={requisitos} w={"max"}/>
                      </Box>
                      <Box mt={4}>
                        <PerfilAlunoIdeal requisitos={requisitos}/>
                      </Box>

                </Box>
            }
        </>
    )
  }