import { DesempenhoAlunoResponse } from "@/interfaces/types";
import { CRAFda } from "./CRAFda";
import { TituloMeuDesempenho } from "./TituloMeuDesempenho";
import { Box } from "@chakra-ui/react";

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
            <Box mb={4}>
                <TituloMeuDesempenho/>
            </Box>
            <CRAFda fda={metricas.cra}/>
        </>
    )
}