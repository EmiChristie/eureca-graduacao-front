import { Box, Center, Icon, Spinner, VStack,Text } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { useUserStore } from "@/stores/user/user.store";
import { useQuery } from "@tanstack/react-query";
import { getDesempenhoAluno } from "@/service/metricasService";
import { calcularCra } from "@/util/utilities";
import { Curriculo, User } from "@/interfaces/types";
import { EURECA_COLORS } from "@/util/constants";
import { LuFrown } from "react-icons/lu";
import { DesempenhoAluno } from "./desempenho/DesempenhoAluno";

  export const MeuDesempenho = (
    {
        curso,
        requisitos
    }:CursoProps
  ) => {

    const aluno = useUserStore((state) => state.user);
    const { data, isLoading, isError } = useDesempenhoAluno(aluno, requisitos);

    return(
        <>
          {
            isLoading ?
              <Center h={"80vh"}>
              <VStack>
                  <Spinner color={`${EURECA_COLORS.AZUL_MEDIO}/70`} size={"lg"} borderWidth={3}/>
                  <Text color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>Carregando Meu Desempenho...</Text>
              </VStack>
              </Center>
            :
            isError?
              <Center h={"80vh"}>
              <VStack>
                  <Icon color={`${EURECA_COLORS.AZUL_MEDIO}/70`} >
                    <LuFrown size={36} strokeWidth={1.8} />
                  </Icon>
                  <Text  color={`${EURECA_COLORS.AZUL_MEDIO}/70`} mt={2}>As estatísticas de desempenho não puderam ser carregadas.</Text>
              </VStack>
              </Center>
            :
              <Box color={EURECA_COLORS.CINZA}>
                <DesempenhoAluno curso={curso} requisitos={requisitos} aluno={aluno} metricas={data}/>
              </Box>
          }
        </>
    )
  }

export const useDesempenhoAluno = (aluno: User | null, requisitos: Curriculo) => {
  const vMax = requisitos.carga_horaria_creditos_maxima && requisitos.carga_horaria_creditos_maxima > 0 ? requisitos.carga_horaria_creditos_maxima : requisitos.duracao_minima && requisitos.duracao_minima > 0 ? Math.ceil(requisitos.minimo_creditos_total/requisitos.duracao_minima) : 30;
  return useQuery({
    queryKey: ["desempenho-aluno", aluno?.matricula_do_estudante],
    queryFn: () => {
      if (!aluno) throw new Error("Aluno inválido");

      const cra = calcularCra(aluno.notas_acumuladas, aluno.creditos_do_cra);

      return getDesempenhoAluno({
        codigoCurso: aluno.codigo_do_curso,
        codigoCurriculo: aluno.codigo_do_curriculo,
        cra,
        velocidadeMedia: aluno.velocidade_media,
        taxaDeSucesso: aluno.taxa_de_sucesso,
        velocidadeMaxima: vMax,
      });
    },
    enabled: !!aluno,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};