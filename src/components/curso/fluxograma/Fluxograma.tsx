import { Curriculo, DisciplinaCurriculo } from "@/interfaces/types"
import { Box, Card, For } from "@chakra-ui/react"

export interface FluxogramaProps {
    disciplinas: DisciplinaCurriculo[];
    requisitos: Curriculo;
}

  export const Fluxograma = (
    {
        disciplinas,
        requisitos
    }:FluxogramaProps
  ) => {
    //para cada período, crie uma coluna em um flex
    //para cada disciplina obrigatória daquele período, adicione um card em um VStack naquela coluna
    //para cada disciplina optativa, adicione-a à lista que vai ficar abaixo do fluxograma de obrigatórias
    return(
        <>
            <Box w={"full"}>
                <For each={disciplinas}>
                    {
                        (item)=>(
                            <Box>
                                {item.codigo_da_disciplina}
                            </Box>
                        )
                    }
                </For>
            </Box>
        </>
    )
  }