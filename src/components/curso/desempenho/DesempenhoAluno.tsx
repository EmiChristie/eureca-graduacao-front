import { DesempenhoAlunoResponse } from "@/interfaces/types";
import { CRAFda } from "./CRAFda";

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
            <CRAFda fda={metricas.cra}/>
        </>
    )
}