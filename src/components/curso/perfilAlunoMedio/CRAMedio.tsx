import { EURECA_COLORS } from "@/util/constants";
import { Flex,Icon,Span,Text } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import { CraProps } from "../perfilAlunoIdeal/CRAIdeal";

export const CRAMedio = (
  {
    cra
  } : CraProps
) => {
  return(
          <>
              <Flex mr={6} alignItems={"center"}>
                <Text textAlign={"center"} mr={2} fontSize={"lg"} fontWeight={"normal"}>Mantém um CRA (média de notas) próximo de <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/35`} p={1} rounded={"xs"}>{cra}</Span></Text>
                <Icon>
                  <LuArrowLeft size={36} />
                </Icon>
              </Flex>
          </>
  )
}