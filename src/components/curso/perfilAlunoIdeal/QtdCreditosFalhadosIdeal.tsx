import { EURECA_COLORS } from "@/util/constants"
import { Flex, Icon, Span,Text } from "@chakra-ui/react"
import { LuArrowDownRight } from "react-icons/lu"
import { QtdProps } from "./TaxaDeSucessoIdeal"

export const QtdCreditosFalhadosIdeal = (
  {
    valor
  } : QtdProps
) => {
  return(
        <>
          <Flex>
            <Icon ><LuArrowDownRight size={36} /></Icon>
            <Text mt={9} fontSize={"lg"} fontWeight={"normal"}><Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/50`} p={1} rounded={"xs"}>Não possui</Span> reprovações</Text>
          </Flex>
        </>
  )
}