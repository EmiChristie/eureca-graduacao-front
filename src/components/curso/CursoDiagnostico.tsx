import { Box, Spinner, VStack,Text, Center } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { useQuery } from "@tanstack/react-query";
import { getDisciplinasObrigatoriasQueMaisReprovam } from "@/service/metricasService";
import { EURECA_COLORS } from "@/util/constants";

  export const CursoDiagnostico = (
    {
        curso
    }:CursoProps
  ) => {

    /*
    const {
      data: disciplinasReprovadas,
      isLoading,
      isError,
    } = useQuery<any, Error>({
      queryKey: ["disciplinas-obrigatorias-reprovadas", curso.codigo_do_curso, 2023],
      queryFn: () => getDisciplinasObrigatoriasQueMaisReprovam(curso.codigo_do_curso, 2023),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: !!curso.codigo_do_curso && !!2023,
    });
    */

    return(
        <>
            <Box px={4}>
              {
                /**
                {
                  isLoading ?
                  <>
                    <Center h={"50vh"}>
                      <VStack>
                        <Spinner size={"lg"} borderWidth={3} color={EURECA_COLORS.AZUL_CLARO} />
                        <Text mt={2} color={EURECA_COLORS.AZUL_CLARO}>Calculando Métricas...</Text>
                      </VStack>
                    </Center>
                  </>
                  :
                  isError ?
                  <>
                    <Text>Houve um erro calculando as métricas</Text>
                  </>
                  :
                  <>
                    <Text>Mostrar métricas</Text>
                  </>
                }
                 
                 */
              }
              <Center h={"50vh"}>
                <VStack>
                  <Spinner size={"lg"} borderWidth={3}/>
                  <Text mt={2}>Calculando Métricas...</Text>
                </VStack>
              </Center>
            </Box>
        </>
    )
  }