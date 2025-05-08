import { Curriculo, Curso } from "@/interfaces/types"
import { getCurriculo, getCurriculoAtivoMaisRecente } from "@/service/eurecaService"
import { EURECA_COLORS } from "@/util/constants"
import { mapArea } from "@/util/mapeamentos"
import { Box, Center, Flex, Icon, Span, Spinner, Text, VStack, Highlight, Card, Stat, Button, HStack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { LuBriefcaseBusiness, LuCircleX, LuClock, LuCloudMoon, LuCloudy, LuDollarSign, LuFile, LuGraduationCap, LuInfo, LuMoon, LuNotebookText, LuSun, LuSunDim, LuSunMoon } from "react-icons/lu"
import { ToggleTip } from "../ui/toggle-tip"
import { initCap } from "@/util/utilities"
import { DuracaoCard } from "./ppcRequisitos/DuracaoCard"
import { AtuacaoCard } from "./ppcRequisitos/AtuacaoCard"
import { FormacaoCard } from "./ppcRequisitos/FormacaoCard"
import { CampusCard } from "./ppcRequisitos/CampusCard"
import { TurnoCard } from "./ppcRequisitos/TurnoCard"
import { DisciplinasCard } from "./ppcRequisitos/DisciplinasCard"
import { CargaHorariaCard } from "./ppcRequisitos/CargaHorariaCard"
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
              /*
              isLoading || isLoading2 ?
                <Center h={"76vh"}>
                <VStack>
                    <Spinner color={`${EURECA_COLORS.AZUL_MEDIO}/70`} size={"lg"} borderWidth={3}/>
                    <Text color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>Carregando Perfil do Curso...</Text>
                </VStack>
                </Center>
              :
              isError || isError2 ?
                <Center h={"76vh"}>
                <VStack>
                    <Icon color={`${EURECA_COLORS.AZUL_MEDIO}/70`} >
                      <LuCircleX size={36} strokeWidth={1.8} />
                    </Icon>
                    <Text  color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>O curso não pôde ser carregado.</Text>
                </VStack>
                </Center>
              :*/
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