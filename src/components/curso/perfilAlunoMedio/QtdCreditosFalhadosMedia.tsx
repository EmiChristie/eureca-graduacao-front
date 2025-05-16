import { EURECA_COLORS } from "@/util/constants"
import { Flex, Icon, Span,Text } from "@chakra-ui/react"
import { LuArrowDownRight } from "react-icons/lu"
import { QtdProps } from "../perfilAlunoIdeal/TaxaDeSucessoIdeal"

export const QtdCreditosFalhadosMedia = (
  {
    valor
  } : QtdProps
) => {
  return(
        <>
          <Flex>
            <Icon ><LuArrowDownRight size={36} /></Icon>
            <Text mt={9} fontSize={"lg"} fontWeight={"normal"}>Reprova cerca de <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/35`} p={1} rounded={"xs"}>{valor} créditos</Span> no total</Text>
          </Flex>
        </>
  )
}