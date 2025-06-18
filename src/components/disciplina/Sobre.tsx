import { Box, Card, Flex, HStack, Icon, Span, Stat, Text } from "@chakra-ui/react"
import { LuCopyX, LuNotebookText } from "react-icons/lu"
import { PerfilDisciplinaProps } from "./PerfilDisciplina"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants"
import { formatarNome } from "@/util/utilities"
import { Tipo } from "./perfilCards/Tipo"
import { PeriodoIdeal } from "./perfilCards/PeriodoIdeal"
import { CargaHoraria } from "./perfilCards/CargaHoraria"
import { Curriculo } from "./perfilCards/Curriculo"

  export const Sobre = (
    {
        curso,
        disciplinaCurriculo
    }:PerfilDisciplinaProps
  ) => {

    const {nome,codigo_do_curriculo,tipo,semestre_ideal,horas_totais,status,quantidade_de_creditos} = disciplinaCurriculo;



    return(
        <>
            <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                <Tipo valor={tipo}/>
                <Curriculo valor={String(codigo_do_curriculo)}/>
                <PeriodoIdeal valor={String(semestre_ideal)}/>
                <CargaHoraria horas={horas_totais} creditos={quantidade_de_creditos}/>
            </Flex>
        </>
    )
  }