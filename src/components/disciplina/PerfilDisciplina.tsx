import { Curso, Disciplina, DisciplinaCurriculo, RelacionamentosDisciplina } from "@/interfaces/types"
import { TituloPerfilDisciplina } from "./TituloPerfilDisciplina"
import { Sobre } from "./Sobre"
import { Box, Flex} from "@chakra-ui/react"
import { PreRequisitos } from "./PreRequisitos";
import { DisciplinasEquivalentes } from "./DisciplinasEquivalentes";
import { CoRequisitos } from "./CoRequisitos";

export interface PerfilDisciplinaProps {
    curso?:Curso,
    disciplina?:Disciplina,
    disciplinaCurriculo?:DisciplinaCurriculo,
    requisitosDisciplina?:RelacionamentosDisciplina;
}

export const PerfilDisciplina = (
    {
        curso,
        disciplina,
        disciplinaCurriculo,
        requisitosDisciplina
    }:PerfilDisciplinaProps
  ) => {
    
    return(
        <>
            <TituloPerfilDisciplina/>
            <Flex flexDir={"column"} gap={4} mt={4}>
                <Sobre curso={curso} disciplinaCurriculo={disciplinaCurriculo}/>
                <Flex gap={4} w={"full"} placeContent={"space-between"} placeItems={"stretch"}>
                    <PreRequisitos curso={curso} requisitosDisciplina={requisitosDisciplina} />
                    <CoRequisitos curso={curso} requisitosDisciplina={requisitosDisciplina} />
                    <DisciplinasEquivalentes curso={curso} requisitosDisciplina={requisitosDisciplina} />
                </Flex>
            </Flex>
        </>
    )
}