import { EURECA_COLORS } from "@/util/constants";
import { Flex,Icon,Span,Text } from "@chakra-ui/react";
import { LuArrowDownLeft, LuArrowLeft, LuArrowUpLeft } from "react-icons/lu";

export interface CraProps {
  cra:number;
}

export const CRAIdeal = (
  {
    cra
  } : CraProps
) => {
  return(
          <>
              <Flex mr={6} alignItems={"center"}>
                <Text textAlign={"center"} mr={2} fontSize={"lg"} fontWeight={"normal"}>Mantém um CRA (média de notas) <Span fontWeight={"normal"} color={EURECA_COLORS.AZUL_MEDIO} bg={`${EURECA_COLORS.AZUL_CLARO}/50`} p={1} rounded={"xs"}>maior ou igual a {cra}</Span></Text>
                <Icon>
                  <LuArrowLeft size={36} />
                </Icon>
              </Flex>
          </>
  )
}