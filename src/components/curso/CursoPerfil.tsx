import { Curriculo, Curso } from "@/interfaces/types"
import { EURECA_COLORS } from "@/util/constants"
import { Alert, Box, } from "@chakra-ui/react"
import { PerfilPPC } from "./PerfilPPC"
import { PerfilAlunoIdeal } from "./PerfilAlunoIdeal"

export interface CursoProps{
    curso?:Curso,
    curriculo?:number,
    requisitos?:Curriculo,
    requisitosScao?:Curriculo,
    area?:string;
    diagnosticoPossivel?:boolean;
  }
    
  export const CursoPerfil = (
    {
        curso,
        requisitos,
        requisitosScao,
        area,
        diagnosticoPossivel
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
                      {
                        diagnosticoPossivel ?
                        <></>
                        :
                        <Box>
                          <Alert.Root status="warning" mt={4} bg={"orange.muted/70"} variant={"surface"} boxShadow={"sm"} title="Diagnóstico indisponível">
                              <Alert.Indicator />
                              <Alert.Content>
                                  <Alert.Title>Diagnóstico indisponível</Alert.Title>
                                  <Alert.Description>Não há registros de ingressantes neste curso nos últimos 10 anos.</Alert.Description>
                              </Alert.Content>
                          </Alert.Root>
                        </Box>
                      }

                </Box>
            }
        </>
    )
  }