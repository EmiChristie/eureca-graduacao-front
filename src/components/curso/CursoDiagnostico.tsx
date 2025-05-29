import { Box, Spinner, VStack,Text, Center, Icon } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { useQuery } from "@tanstack/react-query";
import { getDisciplinasObrigatoriasQueMaisReprovam, getMetricasCurso } from "@/service/metricasService";
import { EURECA_COLORS } from "@/util/constants";
import { DisciplinasReprovacao, MetricasCurso } from "@/interfaces/types";
import { LuFrown } from "react-icons/lu";
import { PerfilAlunoMedio } from "./PerfilAlunoMedio";
import { PerfilCalculado } from "./metricas/PerfilCalculado";

  export const CursoDiagnostico = (
    {
        curso,
        requisitos,
        curriculo
    }:CursoProps
  ) => {

    
    const {
      data: disciplinasQueMaisReprovam,
      isLoading,
      isError,
    } = useQuery<DisciplinasReprovacao[], Error>({
      queryKey: ["disciplinas-obrigatorias-reprovacao", curso.codigo_do_curso, curriculo],
      queryFn: () => getDisciplinasObrigatoriasQueMaisReprovam(curso.codigo_do_curso, curriculo),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso && !!curriculo,
    });
    
    const {
      data: metricasCurso,
      isLoading:isLoading2,
      isError:isError2,
    } = useQuery<MetricasCurso, Error>({
      queryKey: ["metricas-curso", curso.codigo_do_curso, curriculo],
      queryFn: () => getMetricasCurso(curso.codigo_do_curso, curriculo),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso && !!curriculo,
    });
 
    return(
        <>
            <Box>
              {
                  isLoading || isLoading2 ?
                  <>
                    <Center h={"80vh"}>
                    <VStack>
                        <Spinner color={`${EURECA_COLORS.AZUL_MEDIO}/70`} size={"lg"} borderWidth={3}/>
                        <Text color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>Calculando métricas...</Text>
                    </VStack>
                    </Center>
                  </>
                  :
                  isError || isError2 ?
                  <>
                    <Center h={"80vh"}>
                    <VStack>
                        <Icon color={`${EURECA_COLORS.AZUL_MEDIO}/70`} >
                          <LuFrown size={36} strokeWidth={1.8} />
                        </Icon>
                        <Text  color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>O diagnóstico do curso não pôde ser carregado.</Text>
                    </VStack>
                    </Center>
                  </>
                  :
                  <>
                    <Box color={EURECA_COLORS.CINZA}>

                          
                          <Box>
                            <PerfilCalculado requisitos={requisitos} curso={curso.descricao} metricas={metricasCurso} disciplinasReprovacao={disciplinasQueMaisReprovam}/>
                          </Box>
                          <Box mt={4}>
                            <PerfilAlunoMedio perfil={metricasCurso.perfil_aluno_medio}/>
                          </Box>

                    </Box>
                  </>
              }
            </Box>
        </>
    )
  }