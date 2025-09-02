import { Flex, Icon} from "@chakra-ui/react"
import { LuPersonStanding } from "react-icons/lu"
import { PerfilAlunoMedioProps } from "../PerfilAlunoMedio"
import { PeriodosMedios } from "./PeriodosMedios"
import { QtdCreditosFalhadosMedia } from "./QtdCreditosFalhadosMedia"
import { QtdCreditosTentadosMedia } from "./QtdCreditosTentadosMedia"
import { TaxaDeSucessoMedia } from "./TaxaDeSucessoMedia"
import { VelocidadeMedia } from "./VelocidadeMedia"
import { CRAMedio } from "./CRAMedio"
import { PerfilIdealComparacao } from "./PerfilIdealComparacao"
import { PerfilMedioComparacao } from "./PerfilMedioComparacao"

export const PerfilAlunoMedioComponent = (
    {
        perfil,
        requisitos
    }:PerfilAlunoMedioProps
  ) => {
    return(
        <>
        {
            /*
            <Flex placeContent={"space-between"}>
                <Flex w={"full"} gap={8} alignItems={"end"} justifyContent={"end"} flexDir={"column"} mb={12}>
                    <PeriodosMedios qtd={perfil.quantidade_de_periodos_media}/>
                    <CRAMedio cra={perfil.cra_medio}/>
                    <TaxaDeSucessoMedia valor={perfil.taxa_de_sucesso_media}/>
                </Flex>
                <Icon mx={-10}><LuPersonStanding size={300}/></Icon>
                <Flex w={"full"} gap={8} justifyContent={"end"} flexDir={"column"} mb={12}>
                    <VelocidadeMedia valor={perfil.velocidade_media}/>
                    <QtdCreditosTentadosMedia valor={perfil.creditos_matriculados_media}/>
                    <QtdCreditosFalhadosMedia valor={perfil.creditos_reprovados_media}/>
                </Flex>
            </Flex>
            */
        }
            <Flex placeContent={"space-between"} alignItems={"center"}>
                <PerfilIdealComparacao requisitos={requisitos}/>
                <Icon mx={-10}><LuPersonStanding size={300}/></Icon>
                <PerfilMedioComparacao perfil={perfil}/>

            </Flex>
        </>
    )
  }