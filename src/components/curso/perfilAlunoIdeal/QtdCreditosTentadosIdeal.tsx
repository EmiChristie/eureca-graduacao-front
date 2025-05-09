import { EURECA_COLORS } from "@/util/constants"
import { Flex, Icon, Span,Text } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"
import { QtdProps } from "./TaxaDeSucessoIdeal"

export const QtdCreditosTentadosIdeal = (
  {
    valor
  } : QtdProps
) => {
  return(
        <>
          <Flex ml={6} alignItems={"center"}>
            <Icon><LuArrowRight size={36} /></Icon>
            <Text textAlign={"center"} ml={2} fontSize={"lg"} fontWeight={"normal"}>Matricula-se em <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/35`} p={1} rounded={"xs"}>{valor} créditos</Span> ao longo do curso</Text>
          </Flex>
        </>
  )
}