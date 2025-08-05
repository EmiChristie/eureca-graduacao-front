import { Box, Center, Icon, Spinner, VStack,Text } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { useUserStore } from "@/stores/user/user.store";
import { useQuery } from "@tanstack/react-query";
import { getDesempenhoAluno } from "@/service/metricasService";
import { calcularCra } from "@/util/utilities";
import { User } from "@/interfaces/types";
import { EURECA_COLORS } from "@/util/constants";
import { LuFrown } from "react-icons/lu";
import { DesempenhoAluno } from "./desempenho/DesempenhoAluno";

  export const MeuDesempenho = (
    {
        curso
    }:CursoProps
  ) => {

    const aluno = useUserStore((state) => state.user);
    const { data, isLoading, isError } = useDesempenhoAluno(aluno);

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
                <DesempenhoAluno aluno={aluno} metricas={data}/>
              </Box>
          }
        </>
    )
  }

export const useDesempenhoAluno = (aluno: User | null) => {
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
      });
    },
    enabled: !!aluno,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};