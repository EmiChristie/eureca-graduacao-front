import { DesempenhoAlunoResponse } from "@/interfaces/types";
import { CRAFda } from "./CRAFda";
import { TituloMeuDesempenho } from "./TituloMeuDesempenho";
import { Box, Flex } from "@chakra-ui/react";
import { ComentarioCRA } from "./ComentarioCRA";

interface DesempenhoAlunoProps {
    metricas: DesempenhoAlunoResponse;
}
export const DesempenhoAluno = (
    {
        metricas,
    }:DesempenhoAlunoProps
) => {
    return(
        <>
            <Box>
                <TituloMeuDesempenho/>
            </Box>
            <Flex mt={4} gap={4} alignItems={"stretch"}>
                <CRAFda fda={metricas.cra}/>
                <ComentarioCRA fda={metricas.cra}/>
            </Flex>
            <Flex mt={4} gap={4} alignItems={"stretch"}>
                <ComentarioCRA fda={metricas.cra}/>
                <CRAFda fda={metricas.cra}/>
            </Flex>
            <Flex mt={4} gap={4} alignItems={"stretch"}>
                <CRAFda fda={metricas.cra}/>
                <ComentarioCRA fda={metricas.cra}/>
            </Flex>
        </>
    )
}