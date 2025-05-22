import { Box, Button, Card, Center, Flex, For, HStack, Icon, Link, Span, Stat, Text, VStack } from "@chakra-ui/react"
import { LuCalendarClock, LuCoffee, LuCopyX, LuDot, LuFileCheck2, LuFileClock, LuNotebookText } from "react-icons/lu"
import { PerfilDisciplinaProps } from "./PerfilDisciplina"
import { EURECA_COLORS, EURECA_GRADUACAO_COLORS } from "@/util/constants"
import { formatarNome } from "@/util/utilities"

  export const PreRequisitos = (
    {
        curso,
        requisitosDisciplina,
    }:PerfilDisciplinaProps
  ) => {

    const {pre_requisitos} = requisitosDisciplina;
    

    return(
        <>
            <Card.Root w={"full"} boxShadow={"sm"} bgColor={`${EURECA_GRADUACAO_COLORS.CINZA_CLARO}/70`}>
                <Card.Body>
                    <Stat.Root >
                    <HStack justify="space-between">
                        <Stat.Label  color={`${EURECA_COLORS.CINZA}/55`}>Pré-requisitos</Stat.Label>
                        <Icon color={`${EURECA_COLORS.CINZA}/55`}>
                        <LuFileClock />
                        </Icon>
                    </HStack>
                    
                    {
                        pre_requisitos.length > 0 ?

                        <Flex mt={4} alignContent={"center"} flexDir={"column"} h={"full"}>
                            <For each={pre_requisitos}>
                                {(p)=><Link mb={1} className="text" href={`/curso/${curso.codigo_do_curso}/disciplina/${p.codigo}`} color={`${EURECA_COLORS.CINZA}/80`} fontWeight={"medium"}><LuDot/>{formatarNome(p.nome)}</Link>}
                            </For>
                        </Flex>
                        :
                        <Center h={"full"}>
                            <VStack>
                            <LuCoffee color={EURECA_COLORS.BRANCO} size={24}/>
                            <Text color={EURECA_COLORS.BRANCO} textAlign={"center"} fontSize="xs" fontWeight="medium">
                                Esta disciplina não possui pré-requisitos.
                            </Text>
                            </VStack>
                        </Center>
                    }
                    </Stat.Root>
                </Card.Body>
            </Card.Root>
        </>
    )
  }