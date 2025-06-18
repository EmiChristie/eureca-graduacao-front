import { Curso, Disciplina, DisciplinaCurriculo, DisciplinaRelacionada, PlanoDeCurso, RelacionamentosDisciplina } from "@/interfaces/types"
import { TituloPerfilDisciplina } from "./TituloPerfilDisciplina"
import { Sobre } from "./Sobre"
import { Box, Flex} from "@chakra-ui/react"
import { PreRequisitos } from "./PreRequisitos";
import { DisciplinasEquivalentes } from "./DisciplinasEquivalentes";
import { CoRequisitos } from "./CoRequisitos";
import { Informacoes } from "./Informacoes";
import { TituloPlanoDeCursoDisciplina } from "./TituloPlanoDeCursoDisciplina";

export interface PerfilDisciplinaProps {
    curso?:Curso,
    disciplina?:Disciplina,
    disciplinaCurriculo?:DisciplinaCurriculo,
    requisitosDisciplina?:RelacionamentosDisciplina,
    informacoes?:PlanoDeCurso,
    disciplinas_validas?:string[],
    relacionamentos?:DisciplinaRelacionada[],
}

export const PerfilDisciplina = (
    {
        curso,
        disciplinaCurriculo,
        requisitosDisciplina,
        informacoes,
        disciplinas_validas
    }:PerfilDisciplinaProps
  ) => {
    
    console.log("disciplinas validas:")
    console.log(disciplinas_validas)

    return(
        <>
            <TituloPerfilDisciplina/>
            <Flex flexDir={"column"} gap={4} mt={4}>
                <Sobre curso={curso} disciplinaCurriculo={disciplinaCurriculo}/>
                {
                    requisitosDisciplina ?
                        <Flex gap={4} w={"full"} placeContent={"space-between"} placeItems={"stretch"}>
                            <PreRequisitos curso={curso} relacionamentos={requisitosDisciplina.pre_requisitos.filter((r)=>disciplinas_validas.includes(r.codigo))} />
                            <CoRequisitos curso={curso}  relacionamentos={requisitosDisciplina.co_requisitos.filter((r)=>disciplinas_validas.includes(r.codigo))} />
                            <DisciplinasEquivalentes curso={curso} requisitosDisciplina={requisitosDisciplina} />
                        </Flex>
                        :
                        <></>
                }
                {
                    informacoes ?
                        <>
                            <TituloPlanoDeCursoDisciplina/>
                            <Informacoes informacoes={informacoes} />
                        </>
                    :
                        <></>
                }
            </Flex>
        </>
    )
}