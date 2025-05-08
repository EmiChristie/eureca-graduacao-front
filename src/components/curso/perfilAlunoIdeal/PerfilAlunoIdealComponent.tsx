import { Box, Flex, Icon} from "@chakra-ui/react"
import { LuPersonStanding } from "react-icons/lu"
import { RequisitosProps } from "../PerfilAlunoIdeal"
import { CRAIdeal } from "./CRAIdeal"
import { PeriodosIdeais } from "./PeriodosIdeais"
import { QtdCreditosFalhadosIdeal } from "./QtdCreditosFalhadosIdeal"
import { QtdCreditosTentadosIdeal } from "./QtdCreditosTentadosIdeal"
import { TaxaDeSucessoIdeal } from "./TaxaDeSucessoIdeal"
import { VelocidadeIdeal } from "./VelocidadeIdeal"

  export const PerfilAlunoIdealComponent = (
      {
        requisitos
      }:RequisitosProps
  ) => {
    const craIdeal = 7;
    const tsIdeal = 1;
    const creditosMatriculadosIdeal = (requisitos.minimo_creditos_disciplinas_obrigatorias+requisitos.minimo_creditos_disciplinas_optativas)
    const creditosFalhadosIdeal = 0;
    const vIdeal = parseFloat((creditosMatriculadosIdeal / requisitos.duracao_minima).toFixed(2));


    
    return(
        <>
            <Flex placeContent={"space-between"}>
                <Flex w={"full"} gap={8} alignItems={"end"} justifyContent={"end"} flexDir={"column"} mb={12}>
                    <PeriodosIdeais qtd={requisitos.duracao_minima}/>
                    <CRAIdeal cra={craIdeal}/>
                    <TaxaDeSucessoIdeal valor={tsIdeal}/>
                </Flex>
                {/* <Image maxW={"20vw"} src="src/assets/student.svg"/> */}
                <Icon mx={-10}><LuPersonStanding size={300}/></Icon>
                <Flex w={"full"} gap={8} justifyContent={"end"} flexDir={"column"} mb={12}>
                    <VelocidadeIdeal valor={vIdeal}/>
                    <QtdCreditosTentadosIdeal valor={creditosMatriculadosIdeal}/>
                    <QtdCreditosFalhadosIdeal valor={creditosFalhadosIdeal}/>
                </Flex>
            </Flex>
        </>
    )
  }