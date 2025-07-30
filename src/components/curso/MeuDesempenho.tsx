import { Box } from "@chakra-ui/react"
import { CursoProps } from "./CursoPerfil"
import { useUserStore } from "@/stores/user/user.store";
import { useQuery } from "@tanstack/react-query";
import { getDesempenhoAluno } from "@/service/metricasService";
import { calcularCra } from "@/util/utilities";
import { User } from "@/interfaces/types";

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
            <Box px={4}>
                carregando
            </Box>
            :
            isError ?
            <Box px={4}>
                erro
            </Box>
            :
            <Box px={4}>
                {data.cra.percentil}
                {data.cra.valor_do_aluno}
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