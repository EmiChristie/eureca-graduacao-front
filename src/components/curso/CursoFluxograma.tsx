import { Box, Center, Spinner, VStack,Text, Icon } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { useQuery } from "@tanstack/react-query";
import { getCurriculoAtivoMaisRecente, getDisciplinasPorCurriculo } from "@/service/eurecaService";
import { DisciplinaCurriculo } from "@/interfaces/types";
import { EURECA_COLORS } from "@/util/constants";
import { LuCircleX } from "react-icons/lu";
import { PerfilAlunoIdeal } from "./PerfilAlunoIdeal";
import { PerfilPPC } from "./PerfilPPC";
import { Fluxograma } from "./fluxograma/Fluxograma";

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

    return(
        <>
            {
              isLoading ?
                <Center h={"76vh"}>
                <VStack>
                    <Spinner color={`${EURECA_COLORS.AZUL_MEDIO}/70`} size={"lg"} borderWidth={3}/>
                    <Text color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>Carregando Fluxograma...</Text>
                </VStack>
                </Center>
              :
              isError ?
                <Center h={"76vh"}>
                <VStack>
                    <Icon color={`${EURECA_COLORS.AZUL_MEDIO}/70`} >
                      <LuCircleX size={36} strokeWidth={1.8} />
                    </Icon>
                    <Text  color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>O fluxograma do curso não pôde ser carregado.</Text>
                </VStack>
                </Center>
              :
                <Box color={EURECA_COLORS.CINZA}>
                  
                  {/*<TituloFluxograma curriculo={curriculo}/> */}
                  <Fluxograma disciplinas={disciplinas} requisitos={requisitos}/>

                </Box>
            }
        </>
    )
  }