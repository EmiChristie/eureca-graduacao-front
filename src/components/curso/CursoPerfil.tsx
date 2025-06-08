import { Curriculo, Curso } from "@/interfaces/types"
import { EURECA_COLORS } from "@/util/constants"
import { Box, } from "@chakra-ui/react"
import { PerfilPPC } from "./PerfilPPC"
import { PerfilAlunoIdeal } from "./PerfilAlunoIdeal"

export interface CursoProps{
    curso?:Curso,
    curriculo?:number,
    requisitos?:Curriculo,
    requisitosScao?:Curriculo,
    area?:string;
  }
    
  export const CursoPerfil = (
    {
        curso,
        requisitos,
        requisitosScao,
        area
    }:CursoProps
  ) => {
    
    return(
        <>
            {
                <Box color={EURECA_COLORS.CINZA}>

                      <Box>
                        <PerfilPPC requisitosScao={requisitosScao} area={area} curso={curso} requisitos={requisitos} w={"max"}/>
                      </Box>
                      <Box mt={4}>
                        <PerfilAlunoIdeal requisitos={requisitos}/>
                      </Box>

                </Box>
            }
        </>
    )
  }