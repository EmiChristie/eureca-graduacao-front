import { Box, Center, Spinner, VStack,Text, Icon } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { useQuery } from "@tanstack/react-query";
import { getDisciplinasPorCurriculo, getPreRequisitos, getPreRequisitosScao } from "@/service/eurecaService";
import { DisciplinaCurriculo, DisciplinaPreRequisito } from "@/interfaces/types";
import { EURECA_COLORS } from "@/util/constants";
import { LuFrown } from "react-icons/lu";
import { PerfilAlunoIdeal } from "./PerfilAlunoIdeal";
import { PerfilPPC } from "./PerfilPPC";
import { Fluxograma } from "./fluxograma/Fluxograma";
import { TituloFluxograma } from "./fluxograma/TituloFluxograma";
import { TituloListaOptativas } from "./fluxograma/TituloListaOptativas";
import { Optativas } from "./fluxograma/Optativas";
import { mapearCurso } from "@/util/mapeamentos";

  export const CursoFluxograma = (
    {
        curso,
        curriculo,
        requisitos
    }:CursoProps
  ) => {

    const { data: disciplinas, isLoading, isError } = useQuery<DisciplinaCurriculo[], Error>({
      queryKey: ["disciplinasPorCurriculo", curso.codigo_do_curso,curriculo],
      queryFn: () => getDisciplinasPorCurriculo(curso.codigo_do_curso,String(curriculo)),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso && !!curriculo,
    });

    const { data: preRequisitosSig, isLoading:isLoading2, isError:isError2 } = useQuery<DisciplinaPreRequisito[], Error>({
      queryKey: ["pre-requisito-disciplinas", curso.codigo_do_curso,curriculo],
      queryFn: () => getPreRequisitos(curso.codigo_do_curso,String(curriculo)),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso && !!curriculo,
    });

    const { data: preRequisitosScao, isLoading:isLoading3, isError:isError3 } = useQuery<DisciplinaPreRequisito[], Error>({
      queryKey: ["pre-requisito-disciplinas-scao", curso.codigo_do_curso,curriculo],
      queryFn: () => getPreRequisitosScao(mapearCurso[curso.codigo_do_curso],String(curriculo)),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso && !!curriculo,
    });

    const disciplinasUnicas = disciplinas
      ? Array.from(
          new Map(
            disciplinas.map(d => [d.codigo_da_disciplina, d])
          ).values()
        )
      : [];

    const preRequisitos: DisciplinaPreRequisito[] = (() => {
      if (!preRequisitosSig && !preRequisitosScao) return [];

      const map = new Map<string, DisciplinaPreRequisito>();
      preRequisitosScao?.forEach(pre => {
        const chave = `${pre.codigo_da_disciplina}-${pre.tipo}-${pre.condicao}`;
        map.set(chave, pre);
      });
      preRequisitosSig?.forEach(pre => {
        const chave = `${pre.codigo_da_disciplina}-${pre.tipo}-${pre.condicao}`;
        map.set(chave, pre);
      });
      return Array.from(map.values());
    })();


    return(
        <>
            {
              isLoading || isLoading2|| isLoading3?
                <Center h={"80vh"}>
                <VStack>
                    <Spinner color={`${EURECA_COLORS.AZUL_MEDIO}/70`} size={"lg"} borderWidth={3}/>
                    <Text color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>Carregando Fluxograma...</Text>
                </VStack>
                </Center>
              :
              isError?
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
                    <Fluxograma curso={curso} curriculo={curriculo} disciplinas={disciplinasUnicas} requisitos={requisitos} preRequisitos={preRequisitos ? preRequisitos : []}/>
                </Box>
            }
        </>
    )
  }