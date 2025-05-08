import { EURECA_COLORS } from "@/util/constants";
import { Flex,Icon,Span,Text } from "@chakra-ui/react";
import { LuArrowUpLeft, LuUndo } from "react-icons/lu";

export interface PeriodosProps {
  qtd: number;
}

export const PeriodosIdeais = (
    {
      qtd
    } : PeriodosProps
  ) => {
    return(
        <>
          <Flex>
            <Text fontSize={"lg"} fontWeight={"normal"}>Se forma em <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/50`} p={1} rounded={"xs"}>{qtd} períodos</Span></Text>
            <Icon mt={7}><LuArrowUpLeft size={36} /></Icon>
          </Flex>
        </>
    )
}