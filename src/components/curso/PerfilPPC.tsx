import { Box, Center, Flex,Text } from "@chakra-ui/react"
import { CardProps, DuracaoCard } from "./ppcRequisitos/DuracaoCard"
import { AtuacaoCard } from "./ppcRequisitos/AtuacaoCard"
import { CampusCard } from "./ppcRequisitos/CampusCard"
import { CargaHorariaCard } from "./ppcRequisitos/CargaHorariaCard"
import { DisciplinasCard } from "./ppcRequisitos/DisciplinasCard"
import { FormacaoCard } from "./ppcRequisitos/FormacaoCard"
import { TurnoCard } from "./ppcRequisitos/TurnoCard"
import { EURECA_COLORS } from "@/util/constants"
import { LuLightbulb } from "react-icons/lu"
import { CurriculoCard } from "./ppcRequisitos/CurriculoCard"
import { TituloPerfilPPC } from "./ppcRequisitos/TituloPerfilPPC"

  export const PerfilPPC = (
    {
        curso,
        requisitos
    }:CardProps
  ) => {
    const statsW = "max";
    return(
        <>
            <TituloPerfilPPC curso={curso.descricao}/>
            <Flex mt={4} wrap={"wrap"} gap={4} className="text">
            <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <AtuacaoCard curso={curso} requisitos={requisitos} w={statsW}/>
                    <FormacaoCard curso={curso} requisitos={requisitos} w={statsW}/>
                    <CampusCard curso={curso} requisitos={requisitos} w={statsW}/>
                    <TurnoCard curso={curso} requisitos={requisitos} w={statsW}/>
                </Flex>
                <Flex gap={4} w={"full"}  placeContent={"stretch"} placeItems={"stretch"}>
                    <DisciplinasCard curso={curso} requisitos={requisitos} w={statsW}/>
                    <Flex flexDir={"column"} gap={4}>
                    <DuracaoCard curso={curso} requisitos={requisitos} w={statsW}/>
                    <CurriculoCard curso={curso} requisitos={requisitos} w={statsW}/>
                    </Flex>
                    <CargaHorariaCard curso={curso} requisitos={requisitos} w={statsW}/>
                </Flex>
            </Flex>
        </>
    )
  }