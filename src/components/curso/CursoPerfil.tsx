import { Curriculo, Curso } from "@/interfaces/types"
import { getCurriculo, getCurriculoAtivoMaisRecente } from "@/service/eurecaService"
import { EURECA_COLORS } from "@/util/constants"
import { mapArea } from "@/util/mapeamentos"
import { Box, Center, Flex, Icon, Span, Spinner, Text, VStack, Highlight, Card, Stat, Button, HStack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { LuBriefcaseBusiness, LuClock, LuCloudMoon, LuCloudy, LuDollarSign, LuFile, LuGraduationCap, LuInfo, LuMoon, LuNotebookText, LuSun, LuSunDim, LuSunMoon } from "react-icons/lu"
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
    curso:Curso,
  }
    
  export const CursoPerfil = (
    {
        curso
    }:CursoProps
  ) => {

    const { data: curriculo, isLoading, isError } = useQuery<number, Error>({
      queryKey: ["curriculoAtivoMaisRecente", curso.codigo_do_curso],
      queryFn: () => getCurriculoAtivoMaisRecente(curso.codigo_do_curso),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso,
    });

    const { data: requisitos, isLoading:isLoading2, isError:isError2 } = useQuery<Curriculo, Error>({
      queryKey: ["curriculo", curso.codigo_do_curso],
      queryFn: () => getCurriculo(curso.codigo_do_curso, curriculo),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso,
    });
    
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
              isLoading || isLoading2 ?
                <Center h={"76vh"}>
                <VStack>
                    <Spinner size={"lg"} borderWidth={3}/>
                    <Text mt={2}>Carregando Perfil do Curso...</Text>
                </VStack>
                </Center>
              :
              isError || isError2 ?
                <Center h={"76vh"}>
                <VStack>
                    <Text mt={2}>O curso não pôde ser carregado.</Text>
                </VStack>
                </Center>
              :
                <Box color={EURECA_COLORS.CINZA} h={"full"} overflow={"auto"}>

                    <PerfilPPC curso={curso} requisitos={requisitos} w={"max"}/>
                    <PerfilAlunoIdeal/>

                </Box>
            }
        </>
    )
  }