import { DisciplinasReprovacao, MetricasCurso } from "@/interfaces/types";
import { Flex } from "@chakra-ui/react";
import { TituloPerfilCalculado } from "./TituloPerfilCalculado";


export interface MertricasProps {
    metricas: MetricasCurso;
    disciplinasReprovacao: DisciplinasReprovacao[];
}

export const PerfilCalculado = (
    {
        metricas,
        disciplinasReprovacao
    }:MertricasProps
  ) => {
    const statsW = "max";
    return(
        <>
            <TituloPerfilCalculado/>
            <Flex mt={4} wrap={"wrap"} gap={4} className="text">
                {
                    /*
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                
                </Flex>
                <Flex gap={4} w={"full"} placeItems={"stretch"}>
                    
                </Flex>
                    */
                }
            </Flex>
        </>
    )
  }