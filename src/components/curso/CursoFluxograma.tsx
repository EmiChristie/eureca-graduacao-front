import { Box, Center, Spinner, VStack,Text, Icon } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { useQuery } from "@tanstack/react-query";
import { getCurriculoAtivoMaisRecente, getDisciplinasPorCurriculo, getPreRequisitos } from "@/service/eurecaService";
import { DisciplinaCurriculo, DisciplinaPreRequisito } from "@/interfaces/types";
import { EURECA_COLORS } from "@/util/constants";
import { LuFrown } from "react-icons/lu";
import { PerfilAlunoIdeal } from "./PerfilAlunoIdeal";
import { PerfilPPC } from "./PerfilPPC";
import { Fluxograma } from "./fluxograma/Fluxograma";
import { TituloFluxograma } from "./fluxograma/TituloFluxograma";
import { TituloListaOptativas } from "./fluxograma/TituloListaOptativas";
import { Optativas } from "./fluxograma/Optativas";

  export const CursoFluxograma = (
    {
        curso,
        curriculo,
        requisitos
    }:CursoProps
  ) => {

    const { data: disciplinas, isLoading, isError } = useQuery<DisciplinaCurriculo[], Error>({
      queryKey: ["disciplinasPorCurriculo", curso.codigo_do_curso,curriculo],
      queryFn: () => getDisciplinasPorCurriculo(curso.codigo_do_curso,curriculo),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso,
    });

    const { data: preRequisitos, isLoading:isLoading2, isError:isError2 } = useQuery<DisciplinaPreRequisito[], Error>({
      queryKey: ["pre-requisito-disciplinas", curso.codigo_do_curso,curriculo],
      queryFn: () => getPreRequisitos(curso.codigo_do_curso,curriculo),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso,
    });

    return(
        <>
            {
              isLoading ?
                <Center h={"80vh"}>
                <VStack>
                    <Spinner color={`${EURECA_COLORS.AZUL_MEDIO}/70`} size={"lg"} borderWidth={3}/>
                    <Text color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>Carregando Fluxograma...</Text>
                </VStack>
                </Center>
              :
              isError ?
                <Center h={"80vh"}>
                <VStack>
                    <Icon color={`${EURECA_COLORS.AZUL_MEDIO}/70`} >
                      <LuFrown size={36} strokeWidth={1.8} />
                    </Icon>
                    <Text  color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>O fluxograma do curso não pôde ser carregado.</Text>
                </VStack>
                </Center>
              :
                <Box color={EURECA_COLORS.CINZA}>
                  
                  <Box>
                    {<TituloFluxograma curso={curso.descricao} curriculo={curriculo}/>}
                    <Fluxograma disciplinas={disciplinas} requisitos={requisitos} preRequisitos={preRequisitos}/>
                  </Box>
                  <Box py={4}>
                    {<TituloListaOptativas/>}
                    <Optativas disciplinas={disciplinas.filter(d=>d.tipo === "OPCIONAL" && d.status === "ATIVO")}/>
                  </Box>
                </Box>
            }
        </>
    )
  }