import { EURECA_COLORS } from "@/util/constants";
import { Flex,Icon,Span,Text } from "@chakra-ui/react";
import { LuArrowDownLeft, LuArrowUpLeft } from "react-icons/lu";

export interface QtdProps {
  valor:number;
}

export const TaxaDeSucessoIdeal = (
  {
    valor
  } : QtdProps
) => {

  const porcentagem = valor*100;

  return(
          <>
            <Flex>
              <Text mt={9} fontSize={"lg"} fontWeight={"normal"}>Possui taxa de sucesso de <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/50`} p={1} rounded={"xs"}>{porcentagem}%</Span></Text>
              <Icon>
                <LuArrowDownLeft size={36} />
              </Icon>
            </Flex>
          </>
  )
}