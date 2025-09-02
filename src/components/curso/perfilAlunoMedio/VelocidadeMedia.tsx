import { EURECA_COLORS } from "@/util/constants"
import { Flex, Icon, Span,Text } from "@chakra-ui/react"
import { LuArrowUpRight } from "react-icons/lu"
import { QtdProps } from "../perfilAlunoIdeal/TaxaDeSucessoIdeal"

export const VelocidadeMedia = (
  {
    valor
  } : QtdProps
) => {
  return(
      <>
        <Flex>
          <Icon mt={7}><LuArrowUpRight size={36} /></Icon>
          <Text fontSize={"lg"} fontWeight={"normal"}>Mantém velocidade média de <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/35`} p={1} rounded={"xs"}>{valor}</Span> <br></br><Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/35`} p={1} rounded={"xs"}>créditos</Span> bem-sucedidos por período</Text>
        </Flex>
      </>
  )
}