import { Flex } from "@chakra-ui/react";
import { MertricasProps } from "../PerfilCalculado";
import { TituloMulheres } from "./TituloMulheres";
import { ComparacaoGeralGenero } from "./ComparacaoGeralGenero";
import { DisciplinasQueMaisReprovam } from "../DisciplinasQueMaisReprovam";
import { ComparacaoIngressantesGenero } from "./ComparacaoIngressantesGenero";

export const EstatisticasDeMulheres = (
    {
        metricas,
        curso,
        disciplinasReprovacao
    }:MertricasProps
  ) => {
    
    return(
        <>
            <Flex direction={"column"} gap={4} w={"full"}>
                {
                    /*
                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    
                </Flex>
                    */
                }

                <TituloMulheres/>

                <Flex gap={4} w={"full"}  placeContent={"space-between"} placeItems={"stretch"}>
                    <ComparacaoGeralGenero metricas={metricas} curso={curso}/>
                    <ComparacaoIngressantesGenero metricas={metricas} curso={curso}/>
                </Flex>
            </Flex>
        </>
    )
  }