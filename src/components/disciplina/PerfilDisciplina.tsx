import { Curso, Disciplina, DisciplinaCurriculo, PlanoDeCurso, RelacionamentosDisciplina } from "@/interfaces/types"
import { TituloPerfilDisciplina } from "./TituloPerfilDisciplina"
import { Sobre } from "./Sobre"
import { Box, Flex} from "@chakra-ui/react"
import { PreRequisitos } from "./PreRequisitos";
import { DisciplinasEquivalentes } from "./DisciplinasEquivalentes";
import { CoRequisitos } from "./CoRequisitos";
import { Informacoes } from "./Informacoes";

export interface PerfilDisciplinaProps {
    curso?:Curso,
    disciplina?:Disciplina,
    disciplinaCurriculo?:DisciplinaCurriculo,
    requisitosDisciplina?:RelacionamentosDisciplina,
    informacoes?:PlanoDeCurso,
}

export const PerfilDisciplina = (
    {
        curso,
        disciplinaCurriculo,
        requisitosDisciplina,
        informacoes,
    }:PerfilDisciplinaProps
  ) => {
    
    return(
        <>
            <TituloPerfilDisciplina/>
            <Flex flexDir={"column"} gap={4} mt={4}>
                <Sobre curso={curso} disciplinaCurriculo={disciplinaCurriculo}/>
                {
                    informacoes ?
                        <Informacoes informacoes={informacoes} />
                    :
                        <></>
                }
                {
                    requisitosDisciplina ?
                        <Flex gap={4} w={"full"} placeContent={"space-between"} placeItems={"stretch"}>
                            <PreRequisitos curso={curso} requisitosDisciplina={requisitosDisciplina} />
                            <CoRequisitos curso={curso} requisitosDisciplina={requisitosDisciplina} />
                            <DisciplinasEquivalentes curso={curso} requisitosDisciplina={requisitosDisciplina} />
                        </Flex>
                        :
                        <></>
                }
            </Flex>
        </>
    )
}