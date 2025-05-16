import { EURECA_COLORS } from "@/util/constants";
import { Flex,Icon,Span,Text } from "@chakra-ui/react";
import { LuArrowUpLeft} from "react-icons/lu";
import { PeriodosProps } from "../perfilAlunoIdeal/PeriodosIdeais";

export interface PeriodosMediosProps{
  qtd:number[];
}
export const PeriodosMedios= (
    {
      qtd
    } : PeriodosMediosProps
  ) => {
    return(
        <>
          {
            qtd.length == 1 ?
            <Flex>
              <Text fontSize={"lg"} fontWeight={"normal"}>Se forma em <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/35`} p={1} rounded={"xs"}>{qtd[0]} períodos</Span></Text>
              <Icon mt={7}><LuArrowUpLeft size={36} /></Icon>
            </Flex>
          :
            <Flex>
              <Text fontSize={"lg"} fontWeight={"normal"}>Se forma entre <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/35`} p={1} rounded={"xs"}>{qtd[0]} e {qtd[1]} períodos</Span></Text>
              <Icon mt={7}><LuArrowUpLeft size={36} /></Icon>
            </Flex>
          }
        </>
    )
}